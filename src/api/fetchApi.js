export function fetchApi(suffix) {
  const urlBase = 'http://localhost:3000/api';

  // Note: catch block doesn't seem to be working :(
  return new Promise((resolve, reject) => {
    fetch(urlBase + suffix)
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
