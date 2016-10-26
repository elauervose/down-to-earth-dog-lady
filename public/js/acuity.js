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
    var defaultDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sagittis felis ut risus rhoncus, sit amet rhoncus massa fringilla. Sed dictum libero ex, id posuere sapien laoreet sed. Mauris sit amet tellus leo. Quisque vehicula vel lorem a cursus. Quisque tempor facilisis neque a bibendum. Morbi euismod libero augue, et blandit nisl hendrerit laoreet. Phasellus feugiat arcu id placerat venenatis. Nunc ullamcorper sagittis dui in suscipit."

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
    // console.log(groups);

    // Iterate over all the groups making a tab for each one
    // Within that tab, render a title/description/link for each event
    _.each(groups, function(group) {
      var tmplCategory = $($("#template-category").html());

      // Set the title on the tab on the left
      $(".tab-title span a", tmplCategory).html(group.events[0].category);
      // Set the title on the top of the content
      $(".content-title", tmplCategory).html(group.events[0].category);

      // Iterate over the events and add them to tmplCategory
      _.each(group.events, function (appointment) {
        // Create a new appointment template
        var tmplAppointment = $($("#template-appointment").html());

        // Fill in the template with the details from the API
        $(".title", tmplAppointment).html(appointment.name);
        $(".description", tmplAppointment).html(appointment.description || defaultDescription);
        $(".registration-url a", tmplAppointment).attr("href", 'https://app.acuityscheduling.com/schedule.php?owner=12855510&appointmentType=category:' + appointment.category);

        // Add the appointment details to the tab content
        $(".tab-content .details", tmplCategory).append(tmplAppointment);
      })

      // _NOW_ we add this template to the training page
      $("#eventTabs").append(tmplCategory);
    });
    makeTabs();
  });
}




