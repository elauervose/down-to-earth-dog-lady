$(document).ready(function() {
  "use strict";

  // Making first tab in classes tabs active
  $("#class-description ul li:first-child").addClass("active")

  // Experiment with API call to make photo gallery
  $.getJSON("/appointments")
    .done(drawEventTab)
    .fail(drawBackupEventTab)

  //drawPackageDetails();
});

// Acuity script
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

function drawBackupEventTab() {
  var tmplBackupEvents = $($('#template-backup').html());
  $("#page-training").html(tmplBackupEvents);
}

function drawEventTab(data) {
  var groups = {};

  var descriptions = {}
  $.getJSON("/descriptions").done(function (data) {
    _.each(data, function (category) {
      console.log("Category text to match: " + category.name)

      // Find the tab body that has the same title as the filename from the markdown file.
      var $tabContent = $(".content-title:contains(" + category.name + ")").parent()

      // Replace the description with the one from the markdown file
      $tabContent.find(".description").first().html(category.content);

      // Find the first image in the description and remove it
      var $detachedImage = $tabContent.find(".description img").first().detach();

      // Replace the upper-left image with the src from the detached image
      $tabContent.find("img").first().attr("src", $detachedImage.attr("src"));
    });
  })

  // Group all the events with common names/tags together
  _.each(data, function(currentEvent) {
    var eventCategory = currentEvent.category;

    // Create the event group if it's needed
    if (typeof groups[eventCategory] == 'undefined' ||
        groups[eventCategory] === null ) {
      groups[eventCategory] = {
        events: [],
        category: eventCategory
      };
    }

    // Find all events that are proper classes, then add them to
    // and array of events. We'll use the first to make the tab.
    if (currentEvent.calendarIDs &&
        currentEvent.calendarIDs.length > 0 &&
        currentEvent.private === false) {
      groups[eventCategory].events.push(currentEvent);
    } else {
      // Do nothing. This event is unlisted or not available
    }
  });

  // This is your event group. This should be commented out for
  // production
  console.log(groups);

  // Iterate over all the groups making a tab for each one
  // Within that tab, render a title/description/link for each event
  _.each(groups, function(group) {
    var tmplCategory = $($("#template-category").html());

    // Set the title on the tab on the left
    $(".tab-title span a", tmplCategory).html(group.category);
    // Set the title on the top of the content
    $(".content-title", tmplCategory).html(group.category)

    $(".title", tmplCategory).html(group.name);

    // Iterate over the events and add them to tmplCategory
    _.each(group.events, function (appointment) {
      // Create a new appointment template
      var tmplAppointment = $($("#template-appointment").html());

      // Fill in the template with the details from the API
      $(".title", tmplAppointment).html(appointment.name);
      $(".description", tmplAppointment).html(appointment.description);

      $("div.appointment-price span.cost", tmplAppointment).html(appointment.price);
      //$("div.appointment-price span.name", tmplAppointment).html(appointment.category);

      // _.each(appointment, function (dateTimeList) {
      //   var tmplDateTime = $($("#template-dateTimeList").html());

      //   //For each appointment.id, make a dateTime API request using the id in appointments.json `https://acuityscheduling.com/api/v1/availability/times?date=2016-11&appointmentTypeID=1991475`

      //   // this is a block of stuff to make the dateTime behave
      //   if (appointment.time) {
      //     var startTime = moment(appointment.time);
      //     var endTime = moment(startTime + appointment.duration);

      //   $(".tab-content div.appointment-date-time ul.date-time-list li", template).text(startTime.format("dddd"));
      //   $(".tab-content div.appointment-date-time ul.date-time-list li", template).text(startTime.format("MMMM Do"));
      //   $(".tab-content div.appointment-date-time ul.date-time-list li", template).text(startTime.format("YYYY"));
      //   $(".tab-content div.appointment-date-time ul.date-time-list li", template).text(startTime.format("h:mm a"));
      //   $(".tab-content div.appointment-date-time ul.date-time-list li", template).text(endTime.format("h:mm a"));

      // } else {
      //   // the .hide will make the <li> disappear if any dateTime data is missing instead of breaking the page or leaving random html laying about.
      //   $('.event-date-time', template).hide();
      // }


      $(".registration-url a", tmplAppointment).attr("href", 'https://app.acuityscheduling.com/schedule.php?owner=12855510&appointmentType=' + appointment.id);

      $(".registration-url a span.regBtnType", tmplAppointment).html(appointment.name);

      // Add the appointment details to the tab content
      $(".tab-content .details", tmplCategory).append(tmplAppointment);
    });

    // _NOW_ we add this template to the training page
    $("#eventTabs").append(tmplCategory);
  });

  makeTabs();
}

// function drawPackageDetails() {
//   $.getJSON("/packages").done( function(data) {

//     //Make pkgIds into an array
//     var pkgIds = {};

//     // Fill the array "pkgIds" with the package "appointmentTypeIDs" list from packages.json
//     var pkgIds = packages.appointmentTypeIDs;

//     // Use some stack function or RegExp to compare the package #s in the "appointmentTypeIDs" array to the "id" numbers in each category
//     var ??

//     //if there is a match, then fill the template with content & apply it to the tab content
//     if (pkgIds == function(appointment.id)){

//       // Create a new appointment template
//       var tmplPackage = $($("#template-package").html());


//       // Fill in the template with the details from the API
//       $(".title", tmplPackage).html(package.name);
//       $(".description", tmplPackage).html(package.description || defaultDescription2);
//       $(".registration-url a", tmplPackage).attr("href", 'https://app.acuityscheduling.com/schedule.php?owner=12855510&appointmentType=' + package.id);

//       // Add the package details to the tab content
//       $(".tab-content div.package-details", tmplCategory).append(tmplPackage);

//       } else {
//         // Do nothing. There is no package
//       }
//     });
//   });
// };

// Todo
//   Dates ajax

