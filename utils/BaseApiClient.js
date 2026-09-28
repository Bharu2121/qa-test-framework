export class BaseApiClient {
  constructor({ baseUrl, request }) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.request = request;
  }

  async get(path, { params, headers } = {}) {
    return this.send('GET', path, { params, headers });
  }

  async post(path, { data, headers } = {}) {
    return this.send('POST', path, { data, headers });
  }

  async put(path, { data, headers } = {}) {
    return this.send('PUT', path, { data, headers });
  }

  async delete(path, { headers } = {}) {
    return this.send('DELETE', path, { headers });
  }

  async send(method, path, options) {
    const url = new URL(path.replace(/^\//, ''), `${this.baseUrl}/`).toString();
    const response = await this.request.fetch(url, { method, ...options });
    console.info(`${method} ${url} ${response.status()}`);
    return response;
  }
}