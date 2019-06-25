let topics = ['Tom Cruise'];

// Here we construct our URL
//var queryURL = 'https://api.giphy.com?q=dog&apikey=trilogy';

var queryURL =
  'https://api.giphy.com/v1/gifs/search?q=dog&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9';

$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function(response) {
  console.log(response);

  var imgURL = response.data[0].images.fixed_height.url;
  console.log(imgURL);

  document.getElementById('my_image').src = imgURL;

  //$('#movie-view').text(JSON.stringify(response));
});
