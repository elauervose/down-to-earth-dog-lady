$(document).ready(function() {
  "use strict";

  // Making first tab in classes tabs active
  $("#class-description ul li:first-child").addClass("active")

  // Experiment with API call to make photo gallery
  drawEventTab();


})


// Eventbrite script
// ===============================

function makeTabs(){
  // Tabbed Content

  $('.tabbed-content').each(function() {
      $(this).append('<ul class="content"></ul>');
  });

  $('.tabs li').each(function() {
      var originalTab = $(this),
          activeClass = "";
      if (originalTab.is('.tabs>li:first-child')) {
          activeClass = ' class="active"';
      }
      var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
      originalTab.closest('.tabbed-content').find('.content').append(tabContent);
  });

  $('.tabs li').click(function() {
      $(this).closest('.tabs').find('li').removeClass('active');
      $(this).addClass('active');
      var liIndex = $(this).index() + 1;
      $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
      $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
  });
}

function drawEventTab() {
  $.getJSON("http://localhost:9393/events", function(data) {
    data.forEach(function (event) {
      var template = $($("#template-event").html());
      $(".tab-title span a", template).text(event.name.text);
      $(".tab-content .content-title", template).text(event.name.text);
      $(".tab-content .event-description", template).html(event.description.html);
      $(".tab-content div .event-location", template).html(event.name.text + " >>Need New API Query for Location Data<<");
      $("#eventTabs").append(template);
      $(".tab-content .event-date-time span.event-start-date", template).text(event.start.local);
      $(".tab-content .event-date-time span.event-start-time", template).text(event.start.local);
      $(".tab-content .event-date-time span.event-end-time", template).text(event.end.local);
      $(".tab-content div .event-registration-url", template).html('<a class="btn btn-filled btn-lg mb16 event-registration-url" style="color: white; font-size: .9em;" href="' + event.url + '">Register for a Lesson</a>');
      // $(".tab-content div .event-image", template).html('<img class="featurette-image img-responsive center-block" href="' + event.logo.original.url + '" alt="Generic placeholder image">');
    });
    makeTabs();
  });
}

// ===================================

// This will be edited to show instagram photos
// function drawEventTab() {
//   $.getJSON("http://localhost:9393/events", function(data) {
//     debugger
//     // data["people"].forEach(function (person) {
//       var template = $($("#template-gallery").html());
//       $(".insert-caption", template).text(person.name);
//       $(".dogs").append(template);
//       //animateDiv($(template));
//     // });
//   });
// }



//Erica's Guesswork
//======================

// function loadImage() {
//     // Remove the loading spinner in the photo gallery.
//     $("#spinner").ready(function() {
//       // Handler for .ready() called.
//       $('.form-loading').removeClass('.spinner');
//     });
// }





