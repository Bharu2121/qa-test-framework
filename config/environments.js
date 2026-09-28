import 'dotenv/config';

export function getPublicBaseUrl() {
  return process.env.PUBLIC_BASE_URL || 'https://api.jonoconsultancy.com';
}

export function getAdminBaseUrl() {
  return process.env.ADMIN_BASE_URL || 'https://api.jonoconsultancy.com';
}

export function getPublicApiToken() {
  return process.env.PUBLIC_API_TOKEN || '';
}