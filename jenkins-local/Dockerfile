FROM docker:cli AS docker-cli

FROM jenkins/jenkins:lts-jdk17

COPY --from=docker-cli /usr/local/bin/docker /usr/local/bin/docker

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt