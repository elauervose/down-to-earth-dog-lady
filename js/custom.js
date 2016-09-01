

$(document).ready(function() {
  "use strict";

  // Making first tab in classes tabs active
  $("#class-description ul li:first-child").addClass("active")

  // Experiment with API call to make photo gallery
  drawAstronauts();


})

function drawAstronauts() {
  $.getJSON("http://api.open-notify.org/astros.json?callback=?", function(data) {
    data["people"].forEach(function (person) {
      var template = $($("#template-gallery").html());
      $(".insert-caption", template).text(person.name);
      $(".dogs").append(template);
      //animateDiv($(template));
    });
  });
}






//Erica's Guesswork
//======================

function loadImage() {
    // Remove the loading spinner in the photo gallery.
    $(#spinner).ready(function() {
      // Handler for .ready() called.
      $('.form-loading').removeClass('.spinner');
    });
}





