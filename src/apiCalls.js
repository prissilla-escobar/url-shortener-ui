export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      .catch(error => console.log(error))
}

// export const postURLs = (urlEntered) => {
//   return fetch('http://localhost:3001/api/v1/urls', {
//     method: 'POST',
//     body: JSON.stringify(urlEntered),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then(data => addURL(data))
// }