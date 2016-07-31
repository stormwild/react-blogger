const urlBase = 'http://localhost:3000/api';

export default {
  get: (suffix, method = 'get', payload) => {
    return new Promise((resolve, reject) => {
      fetch(urlBase + suffix, {method: 'get'})
      .then(response => { return response.json(); })
      .then(json => { resolve(json); })
      .catch(err => { reject(err); });
    });
  },
  post: (suffix, payload) => {
    return new Promise((resolve, reject) => {
      fetch(urlBase + suffix, { method: 'post', headers: {"Content-type": "application/json"}, body: JSON.stringify(payload) })
      .then(response => { return response.json(); })
      .then(json => { resolve(json); })
      .catch(err => { reject(err); });
    });
  },
  put: (suffix, payload) => {
    return new Promise((resolve, reject) => {
      fetch(urlBase + suffix, { method: 'put', headers: {"Content-type": "application/json"}, body: JSON.stringify(payload) })
      .then(response => { return response.json(); })
      .then(json => { resolve(json); })
      .catch(err => { reject(err); });
    });
  },  
  delete: (suffix) => {
    return new Promise((resolve, reject) => {
      fetch(urlBase + suffix, { method: 'delete' })
      .then(response => { resolve(response); })
      .catch(err => { reject(err); });
    });
  }
};
