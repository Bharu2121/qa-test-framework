pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.59.0-noble'
      args '--user root'
    }
  }

  options {
    timestamps()
    disableConcurrentBuilds()
    timeout(time: 45, unit: 'MINUTES')
  }

  parameters {
    booleanParam(
      name: 'RUN_LIVE_REGISTRATION',
      defaultValue: false,
      description: 'Submit one fake lead and verify admin read-back (external record is created)'
    )
  }

  environment {
    ALLOW_LIVE_REGISTRATION = 'false'
    PUBLIC_BASE_URL = 'https://api.jonoconsultancy.com'
    PUBLIC_SITE_URL = 'https://jonoconsultancy.com'
    ADMIN_BASE_URL = 'https://api.jonoconsultancy.com'
    ADMIN_PORTAL_URL = 'https://admin.jonoconsultancy.com'
  }

  stages {
    stage('Install') {
      steps {
        checkout scm
        sh 'node --version'
        sh 'apt-get update && apt-get install -y openjdk-17-jre-headless'
        sh 'npm ci'
      }
    }

    stage('Smoke') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'jono-admin-credentials',
          usernameVariable: 'ADMIN_USER',
          passwordVariable: 'ADMIN_PASS'
        )]) {
          sh 'npm run test:smoke:allure'
        }
      }
    }

    stage('Regression') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'jono-admin-credentials',
          usernameVariable: 'ADMIN_USER',
          passwordVariable: 'ADMIN_PASS'
        )]) {
          sh 'npm run test:regression:allure'
        }
      }
    }

    stage('Live registration E2E') {
      when {
        expression { params.RUN_LIVE_REGISTRATION }
      }
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'jono-admin-credentials',
          usernameVariable: 'ADMIN_USER',
          passwordVariable: 'ADMIN_PASS'
        )]) {
          withEnv([
            'ALLOW_LIVE_REGISTRATION=true',
            'PLAYWRIGHT_HTML_OUTPUT_DIR=reports/live-registration',
            'ALLURE_RESULTS_DIR=reports/allure-results/live-registration'
          ]) {
            sh "npx playwright test --project=api --grep 'A public registration can be cross-checked in the admin API'"
            sh 'npx allure generate reports/allure-results/live-registration --clean --output reports/allure-html/live-registration'
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'reports/smoke/**,reports/regression/**,reports/live-registration/**,reports/allure-results/**,reports/allure-html/**,test-results/**', allowEmptyArchive: true
    }
  }
}
