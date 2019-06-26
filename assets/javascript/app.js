let actors = ['Tom Cruise', 'Arnold Schwarzenegger', 'Tom Hanks'];



renderButtons();


function renderButtons() {
  for (var i = 0; i < actors.length; i++) {
    var a = $('<button>');
    a.addClass("actor");
    a.attr("data-name", actors[i]);
    a.text(actors[i]);
    $("#buttons-view").append(a);
  }
}


// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {

  var actor = $(this).attr("data-name");
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${
    actor
   }&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#movies-view").text(JSON.stringify(response));
  });
}
// var queryURL = `https://api.giphy.com/v1/gifs/search?q=${
//     topics[0]
//   }&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;
// Here we construct our URL
//var queryURL = 'https://api.giphy.com?q=dog&apikey=trilogy';
// topics.forEach(topic => {
//   queryURL = `https://api.giphy.com/v1/gifs/search?q=${
//     topics[topic]
//   }&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;
// });

// $.ajax({
//   url: queryURL,
//   method: 'GET'
// }).then(function (response) {
//   console.log(response);
//   var dogs = response.data;

//   dogs.forEach(dog => {
//     var imgURL = dog.images.fixed_height.url;
//     console.log(imgURL);

//     //create a new div
//     var giphyDiv = $("<div class='giphy'>");

//     //create an image tag and define the src
//     var image = $('<img>').attr('src', imgURL);

//     //append the image to the div
//     giphyDiv.append(image);

//     //append the div to the image in the div
//     $('#some_image').prepend(giphyDiv);
//   });
// });

$(document).on("click", ".actor", displayMovieInfo);