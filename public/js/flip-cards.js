$(document).ready(function() {
  "use strict";

  // Experiment with API call to make photo gallery
  $.getJSON("/api/examples/flipcards.json")
    .done(drawFlipCard)
});

// Flip Cards Content from Json Script
// ====================================

function drawFlipCard(cards) {

  _.each(cards, function(card) {

    var $tmplFlipCard = $($("#templateFlipCard").html());

    // Set the name of the card for Google Analytics
    $("#data-cardname", $tmplFlipCard).html(card.name);

    // Set the question for the front of the card
    $(".question", $tmplFlipCard).html(card.question)

    // Set the back content of the card
    $(".back1", $tmplFlipCard).html(card.back1);
    $(".back2", $tmplFlipCard).html(card.back2);
    $(".back3", $tmplFlipCard).html(card.back3);
    $(".back4", $tmplFlipCard).html(card.back4);
    $(".back5", $tmplFlipCard).html(card.back5);

    // $keyImage.attr("src", $descriptionImage.attr("src"));

    // _NOW_ we add this template to the training page
    $("#flipCardList").append($tmplFlipCard);

  });

  // Flip Cards Flipping Script
  // ====================================
  $('.flip').on('click', function(event) {
    $(event.target).parents('.card').toggleClass('flipped');
  });

}

