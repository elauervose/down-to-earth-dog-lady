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


  $('#training-page .tabs li').each(function() {
      var originalTab = $(this),
          activeClass = "";
      if (originalTab.is('.tabs>li:first-child')) {
          activeClass = ' class="active"';
      }
      var tabContent = originalTab.find('.tab-content').detach().wrap('<li' + activeClass + '></li>').parent();
      originalTab.closest('.tabbed-content').find('.content').append(tabContent);
  });

  $('#training-page .tabs li').click(function() {
      $(this).closest('.tabs').find('li').removeClass('active');
      $(this).addClass('active');
      var liIndex = $(this).index() + 1;
      $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
      $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
  });
}

function drawEventTab() {
  $.getJSON("http://localhost:9393/events", function(data) {
    // this is making it so only live AND listed events show up on the web page
    data = _.filter(data, function(currentEvent) {
      return currentEvent.status == "live" &&
        currentEvent.listed === true
    } )
    data.forEach(function (event) {
      var template = $($("#template-event").html());

      // this is a bunch of attributes I am using for listing events
      $(".tab-title span a", template).text(event.name.text);
      $(".tab-content .content-title", template).text(event.name.text);
      $(".tab-content .event-description", template).html(event.description.html);
      $(".tab-content div .event-location", template).html(event.name.text);
      $(".tab-content div .event-registration-url a", template).attr("href", event.url)

      // this is a block of stuff to make the dateTime behave
      if (event.start && event.start.local &&
          event.end   && event.end.local) {
        var startTime = moment(event.start.local);
        var endTime = moment(event.end.local);
        $(".tab-content .event-date-time span.event-start-date", template).text(startTime.format("MMMM Do YYYY"));
        $(".tab-content .event-date-time span.event-start-time", template).text(startTime.format("h:mm a"));
        $(".tab-content .event-date-time span.event-end-time", template).text(endTime.format("h:mm a"));
      } else {
        // the .hide will make the <li> disappear if any dateTime data is missing instead of breaking the page or leaving random html laying about.
        $('.event-date-time', template).hide();
      }

      // the page will break if there is no photo in the event - so the if/else thingy tells it to use a local image
      if (event.logo && event.logo.original && event.logo.original.url)
      {
        $(".tab-content div .event-image img", template).attr("src", event.logo.original.url);
      } else {
        $(".tab-content div .event-image img", template).attr("src", "/img/training/training-downtown-small.jpg");
      }

      // _NOW_ we add this template to the training page
      $("#eventTabs").append(template);
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





