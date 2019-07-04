let actors = [
  'Toy Story',
  'The Incredibles',
  'Ratatouille',
  'Spirited Away',
  'Finding Nemo',
  'How to Train your Dragon',
  'The Lego Movie',
  'Shrek',
  'Beauty and the Beast',
  'Cinderella',
  'Snow White'
];

let favGiphys = [];

var imd = '';
var count = '';
var lastActorButtonCLicked = '';

$(document).ready(function () {
  const favGiphyJSON = localStorage.getItem('favGiphys');
  if (favGiphyJSON !== null) {
    favGiphy = JSON.parse(favGiphyJSON);
    console.log(favGiphy);
  }

  if (favGiphyJSON) {
    for (var i = 0; i <= favGiphy.length; i++) {
      var queryURL = `https://api.giphy.com/v1/gifs/${
        favGiphy[i]
      }?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function (response) {
        var favouriteActors = response.data;
        console.log(favouriteActors);

        var result = response.data;

        var favGifDiv = $(
          "<div class='card float-left fav-gif-card my-3 mx-3'>"
        );
        var favGifRating = $("<small class='text-center'>").text(
          'Rating: ' + result.rating
        );
        var favGifImg = $('<img>');
        favGifImg.attr({
          src: result.images.original_still.url,
          'data-still': result.images.original_still.url,
          'data-animated': result.images.original.url,
          'data-state': 'still',
          class: 'gif',
          'giphy-id': result.id
        });

        favGifDiv.append(favGifImg);
        favGifDiv.append('<br>');
        favGifDiv.append(favGifRating);
        favGifDiv.append('<br>');

        $('.favourites-section').prepend(favGifDiv);
      });
    }
  }
});

//initial call of the function to render the buttons on screen


function renderButtons() {
  $('#buttons-view').empty();
  for (var i = 0; i < actors.length; i++) {
    var a = $('<button>');
    a.addClass('actor btn btn-info');
    a.attr('data-name', actors[i]);
    a.attr('id', actors[i]);
    a.text(actors[i]);
    $('#buttons-view').append(a);
  }
}

function giphyAjaxCall(queryURL, imd) {
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);

    var actors = response.data;
    if (imd) {
      $('#actors-view').empty();
    }

    //for each of the JSON data
    actors.forEach(actor => {
      //grab the images.fixed_height.url

      //grab the images.fixed_height.url
      var imgURL = actor.images.downsized.url;
      //grab the rating
      var rating = actor.rating;
      var title = actor.title;

      // Creating an element to have the rating displayed
      pRating = $('<p>').text('Rating: ' + rating);
      pTitle = $('<p>').text('Title: ' + title.substring(0, 40));

      //create a new div
      giphyDiv = $("<div class='giphy'>");
      giphyDetails = $("<div class='giphy-details'>");

      var gifFavourite = $('<button class="fav-gif">');
      gifFavourite.addClass('btn btn-light btn-sm');
      gifFavourite.append('<i class="fa fa-heart-o"></i>');
      gifFavourite.attr({
        'giphy-id': actor.id
      });
      //append the p element to the giphyDiv
      giphyDiv.append(pRating, pTitle, gifFavourite);
      //create an image tag and define the src
      //image = $('<img>').attr('src', imgURL);
      //image.attr('class', 'img');
      //append the image to the div


      var image = $('<img>');
      image.attr({
        src: actor.images.original_still.url,
        'data-still': actor.images.original_still.url,
        'data-animated': actor.images.original.url,
        'data-state': 'still',
        class: 'gif',
        'giphy-id': actor.id
      });
      giphyDiv.prepend(image);
      giphyDetails.append(giphyDiv);

      //append the div to the image in the div
      $('#actors-view').prepend(giphyDetails);
    });
  });
}

function displayMoviesInfo() {
  $('.actor').on('click', function () {
    var movie = $(this).attr('data-name');

    var queryURL = `https://api.themoviedb.org/3/search/movie?api_key=ef99ccdee28605c6430d12d9af5feea6&language=en-US&query=${movie}&page=1&include_adult=false`;

    $('#movies-view').empty();

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function (response) {
      console.log(response);

      var result = response.results[0];

      var title = result.title;
      var overview = result.overview;
      var poster = `http://image.tmdb.org/t/p/w185/${result.poster_path}`;
      var realeaseDate = result.release_date;

      movieDiv = $("<div class ='movie'>");
      movieDetails = $("<div class ='movie-details'>");
      pTitle = $('<p>').text('Title: ' + title);
      pOverview = $('<p>').text('Overview: ' + overview);
      pReleaseDate = $('<p>').text('Release: ' + realeaseDate);
      Poster = $('<img>').attr('src', poster);
      movieDetails.append(pTitle, pOverview, pReleaseDate);
      movieDiv.append(Poster);
      movieDiv.append(movieDetails);
      $('#movies-view').append(movieDiv);
    });
  });
}

function displayGiphyInfo() {
  var actor = $(this).attr('data-name');

  if ($('#actors-view').is(':empty') || actor !== lastActorButtonCLicked) {
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${actor}&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;

    imd = true;

    giphyAjaxCall(queryURL, imd);
  } else {
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${actor}&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10`;
    imd = false;
    giphyAjaxCall(queryURL, imd);
  }
}

// This function handles events where one button is clicked
$('#add-actor').on('click', function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var actor = $('#actor-input')
    .val()
    .trim();
  //If there are text in thhe textbox then push it to the topics array
  if (actor) {
    topics.push(actor);
  }
  //empty the value in the text-box
  $('#actor-input').val(' ');

  //call the function to re-render the buttons in the screen after the update
  renderButtons();
});

$(document).ready(function () {
  $('button').click(function () {
    if (
      $(this)
      .parent()
      .data('lastClicked')
    ) {
      lastActorButtonCLicked = $(this)
        .parent()
        .data('lastClicked');
    }
    $(this)
      .parent()
      .data('lastClicked', this.id);
  });
});

//localStorage

// function saveFavouriteGiphytoLocalStorage() {
//   //get any giphy stored in localStorage
//   const favGiphyJSON = localStorage.getItem('favGiphy');

//   // if giphy exist, then parse the giphyJSON
//   if (favGiphyJSON !== null) {
//     favGiphy = JSON.parse(favGiphyJSON)
//   }

//   $('.fav-gif').on('click', function () {
//     favGiphys.push({
//       Rating: 'rizwan',
//       Title: 'rere',
//       src:''
//     })
//     localStorage.setItem('favGiphy', JSON.stringify(favGiphys))
//   })

// }
//

function favouriteGiphy() {
  $(document).on('click', '.fav-gif', function () {
    $('.favourites-section').empty();

    var giphyId = $(this).attr('giphy-id');

    if (favGiphys.indexOf(giphyId) === -1) {
      favGiphys.push(giphyId);
    }

    console.log(localStorage.setItem('favGiphys', JSON.stringify(favGiphys)));

    console.log(favGiphys);

    for (var i = 0; i <= favGiphys.length; i++) {
      var queryURL = `https://api.giphy.com/v1/gifs/${
        favGiphys[i]
      }?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function (response) {
        var favouriteActors = response.data;
        console.log(favouriteActors);

        var result = response.data;

        var favGifDiv = $(
          "<div class='card float-left fav-gif-card my-3 mx-3'>"
        );
        var favGifRating = $("<small class='text-center'>").text(
          'Rating: ' + result.rating
        );
        var favGifImg = $('<img>');
        favGifImg.attr({
          src: result.images.original_still.url,
          'data-still': result.images.original_still.url,
          'data-animated': result.images.original.url,
          'data-state': 'still',
          class: 'gif',
          'giphy-id': result.id
        });

        favGifDiv.append(favGifImg);
        favGifDiv.append('<br>');
        favGifDiv.append(favGifRating);
        favGifDiv.append('<br>');

        $('.favourites-section').prepend(favGifDiv);
      });
    }
  });
}

function changeState() {
  var state = $(this).attr("data-state");
  var animateImage = $(this).attr("data-animated");
  var stillImage = $(this).attr("data-still");

  if (state == "still") {
    $(this).attr("src", animateImage);
    $(this).attr("data-state", "animate");
  } else if (state == "animate") {
    $(this).attr("src", stillImage);
    $(this).attr("data-state", "still");
  }
}

renderButtons();
displayMoviesInfo();
favouriteGiphy();

// Function for displaying the actors info
// Using $(document).on instead of $(".actor").on to add event listeners to dynamically generated elements
$(document).on('click', '.actor', displayGiphyInfo)
$(document).on("click", ".gif", changeState);