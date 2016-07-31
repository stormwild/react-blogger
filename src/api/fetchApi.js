export function fetchApi(suffix, method = 'get', payload) {
  const urlBase = 'http://localhost:3000/api';

  // Note: catch block doesn't seem to be working :(
  return new Promise((resolve, reject) => {
    let options = method === 'get' ? { method: method } : 
      { method: method, headers: {"Content-type": "application/json"}, body: JSON.stringify(payload) };

    fetch(urlBase + suffix, options)
    .then(response => {
      return response.json();
    })
    .then(json => {
      resolve(json);
    })
    .catch(err => {
      reject(err);
    });
  });
}
