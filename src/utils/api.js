const API_URL = 'http://localhost:3000';

function headers() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
}

function parseResponse(response) {
  return response.json().then(json => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}

function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  fetch(path, params = {}) {
    return fetch(`${API_URL}${path}${queryString(params)}`, {
      method: 'GET',
      headers: headers()
    }).then(parseResponse);
  },

  post(path, data) {
    const body = JSON.stringify(data);
    return fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: headers(),
      body
    }).then(parseResponse);
  },

  patch(path, data) {
    const body = JSON.stringify(data);

    return fetch(`${API_URL}${path}`, {
      method: 'PATCH',
      headers: headers(),
      body
    }).then(parseResponse);
  },

  delete(path) {
    return fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: headers()
    }).then(parseResponse);
  }
};
