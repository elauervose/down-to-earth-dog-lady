// LEAVE ME HERE! https://gist.github.com/eethann/3430971
// I am a mixin that allows _.filter to work with Objects.
_.mixin({
  // ### _.objMap
  // _.map for objects, keeps key/value associations
  objMap: function (input, mapper, context) {
    return _.reduce(input, function (obj, v, k) {
             obj[k] = mapper.call(context, v, k, input);
             return obj;
           }, {}, context);
  },
  // ### _.objFilter
  // _.filter for objects, keeps key/value associations
  // but only includes the properties that pass test().
  objFilter: function (input, test, context) {
    return _.reduce(input, function (obj, v, k) {
             if (test.call(context, v, k, input)) {
               obj[k] = v;
             }
             return obj;
           }, {}, context);
  },
  // ### _.objReject
  //
  // _.reject for objects, keeps key/value associations
  // but does not include the properties that pass test().
  objReject: function (input, test, context) {
    return _.reduce(input, function (obj, v, k) {
             if (!test.call(context, v, k, input)) {
               obj[k] = v;
             }
             return obj;
           }, {}, context);
  }
});
// END OF MIXIN

$(document).ready(function() {
  "use strict";

  // Making first tab in classes tabs active
  $("#class-description ul li:first-child").addClass("active")

  // Experiment with API call to make photo gallery
  drawEventTab();

})






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

function drawEventTab() {
  $.getJSON("/appointments").done( function(data) {
    var groups = {};

    // Group all the events with common names/tags together
    _.each(data, function(currentEvent) {
      var eventCategory = currentEvent.category;

      // Create the event group if it's needed
      if (typeof groups[eventCategory] == 'undefined' ||
          groups[eventCategory] === null ) {
        groups[eventCategory] = {
          events: [],
          package: null
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
    // console.log(groups);

    _.each(groups, function(group) {
      var template = $($("#template-appointment").html());

      firstAppointment = group.events[0];

      // this is a bunch of attributes I am using for listing events
      $(".tab-title span a", template).html(firstAppointment.name);

      $(".tab-content .content-title", template).html(firstAppointment.name);
      $(".tab-content .event-description", template).html(firstAppointment.description);
      $(".tab-content div .event-location", template).html(firstAppointment.name);


      $(".tab-content div .event-registration-url a", template).attr("href", 'https://app.acuityscheduling.com/schedule.php?owner=12855510&appointmentType=category:' + firstAppointment.category);

      // this is a block of stuff to make the dateTime behave
      if (firstAppointment.time) {
        // var startTime = moment(firstAppointment.time);
        // var endTime = moment(firstAppointment.time + firstAppointment.duration);

        // $(".tab-content .event-date-time span.event-start-day", template).text(startTime.format("dddd"));
        // $(".tab-content .event-date-time span.event-start-date", template).text(startTime.format("MMMM Do"));
        // $(".tab-content .event-date-time span.event-start-year", template).text(startTime.format("YYYY"));
        // $(".tab-content .event-date-time span.event-start-time", template).text(startTime.format("h:mm a"));
        // $(".tab-content .event-date-time span.event-end-time", template).text(endTime.format("h:mm a"));
      } else {
        // the .hide will make the <li> disappear if any dateTime data is missing instead of breaking the page or leaving random html laying about.
        $('.event-date-time', template).hide();
      }

      // the page will break if there is no photo in the event - so the if/else thingy tells it to use a local image
      if (firstAppointment.logo && firstAppointment.logo.original && firstAppointment.logo.original.url)
      {
        // $(".tab-content div .event-image img", template).attr("src", firstAppointment.logo.original.url);
      } else {
        $(".tab-content div .event-image img", template).attr("src", "/img/training/training-downtown-small.jpg");
      }

      // // Add the button to purchase a package if we were able to
      // // find one
      // // FIXME: This doesn't work yet because we don't have packages
      // // that match events by name
      // if (group.package) {
      //   $("div.package-details .package-registration-url a", template)
      //     .attr("href", group.package.url)
      //     .show();
      //   $("div.package-details .package-registration-description", template)
      //     .attr("href", group.package.description).html
      //     .show();
      // }

      // _NOW_ we add this template to the training page
      $("#eventTabs").append(template);
    });
    makeTabs();
  });
}




