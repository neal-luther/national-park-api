'use strict';

const apiKey = '9CNAGmZrAU2GuBqeGvFeX4kS0oe6YokfL4cEmGz6'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getParkData(query, maxResults=10) {
  const params = {
    q: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString + '&api_key=' + apiKey;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayParkData(responseJson))
    .catch(err => {
      $('.error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayParkData(responseJson){
    console.log(responseJson);
    let placeHolder = [];
for (let i=0; i<responseJson.data.length; i++) {
    placeHolder.push(`
    <h1>${responseJson.data[i].fullName}</h1>
    <h3>${responseJson.data[i].description}</h3>
    <h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>`)
    $('.js-results-list').html(placeHolder);
    $('.js-results-list').removeClass('hidden');
}
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkData(searchTerm, maxResults);
  });
}

$(watchForm);