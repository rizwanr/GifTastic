let topics = ['Tom Cruise', 'Arnold Schwarzenegger', 'Tom Hanks', "Chris Hemsworth", "Chris Pratt", "Dwayne Johnson", "Will Smith", "Vin Diesel"];


//initial call of the function to render the buttons on screen
renderButtons();



function renderButtons() {
  $("#buttons-view").empty()
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button>');
    a.addClass("actor btn btn-info");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
}


// Function for dumping the JSON content for each button into the div
function displayActorInfo() {

  var actor = $(this).attr("data-name");
  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${
    actor
   }&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $('#actors-view').empty();

    console.log(response)

    var actors = response.data
    //for each of the JSON data
    actors.forEach(actor => {
      //grab the images.fixed_height.url
      var imgURL = actor.images.downsized.url;
      //grab the rating
      var rating = actor.rating;
      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);
      //create a new div
      var giphyDiv = $("<div class='giphy'>");
      //append the p element to the giphyDiv
      giphyDiv.append(pOne);
      //create an image tag and define the src
      var image = $('<img>').attr('src', imgURL);
      //append the image to the div
      giphyDiv.append(image);
      //append the div to the image in the div
      $('#actors-view').prepend(giphyDiv);
    });
  })
}

// This function handles events where one button is clicked
$("#add-actor").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var actor = $("#actor-input").val().trim();
  //If there are text in thhe textbox then push it to the topics array
  if (actor) {
    topics.push(actor);
    console.log(topics);
  }
  //empty the value in the text-box
  $('#actor-input').val(" ");

  //call the function to re-render the buttons in the screen after the update
  renderButtons();

});

// Function for displaying the actors info
// Using $(document).on instead of $(".actor").on to add event listeners to dynamically generated elements
$(document).on("click", ".actor", displayActorInfo);