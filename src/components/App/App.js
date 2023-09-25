import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls()
    .then(data => {console.log('fetch', data.urls)
      setUrls(data.urls)})
  }, [])

  const addUrl = (newURL) => {
    setUrls([...urls, newURL])
  }

  const postURLs = (urlEntered) => {

    const body = {
      long_url: urlEntered.urlToShorten,
      title: urlEntered.title
    }

    return fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => addUrl(data))
  }

  // const removeURL = (id) => {
  //   const filteredURLs = urls.filter(url => url.id !== id)
  //   setUrls(filteredURLs)
  // }
// console.log('urls36', urls)
  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm postURLs={postURLs} />
      </header>
      <UrlContainer urls={urls} />
    </main>
  );
}

export default App;
