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
  drawGallery();

})


// Instagram script
// ===============================

function drawGallery() {
  $.getJSON("/recent-photos").done(drawInstagramGallery).fail(drawBackupGallery);
  //drawInstagramGallery=success action & drawBackupGallery=failure action
}

function drawInstagramGallery(posts) {
  _.each(posts, function(post) {
    var template = $($("#template-gallery").html());

    if (post.images &&
        post.images.standard_resolution &&
        post.images.standard_resolution.url){

      //This is the image URL for the gallery
      $("img.image-gallery-content", template).attr("src", post.images.standard_resolution.url);

      // this is the image URL for the lightbox
      $("a.image-url", template).attr("href", post.images.standard_resolution.url);

      //This section (using RegExp) is getting rid of the hashtags & dashes in the comments so it displays a clean sentence.
      //RegExp = Regular Expression and these are for doing stuff with strings
      var regexp = new RegExp('#([^\\s]*)','g');
      post.caption.text = post.caption.text.replace(regexp, '');

      var regexp2 = new RegExp('@([^\\s]*)','g');
      post.caption.text = post.caption.text.replace(regexp2, '');

      //This RegExp \s = white space & ? = maybe so \s? = maybe 0 or 1 whitespace characters & \n = newline
      var regexp3 = new RegExp('\s?-\s?\n','g');
      post.caption.text = post.caption.text.replace(regexp3, '');


      console.log(post.caption.text);
      $("p.image-gallery-caption", template).html(post.caption.text);

    }

    // _NOW_ we add this template to the gallery page
    $("#galleryDogs").append(template);
  });
}

function drawBackupGallery(error) {

  //=================================================================================
  // These are variations on ways to create an array

  //1: in this version, I wrote the array out literally in order to act on it & code will just use the numbers listed in the array
  //var localImages = _.shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);

  //2: in this version, `_.range()` sets a lower and upper bound for the array
  //var localImages = _.range(1,20);
  //localImages = _.shuffle(localImages)

      //2(a): this version of #2 is a little cleaner
      //var localImages = _.shuffle(_.range(1,20));

      //2(b): this is another way to shorten version #2
      //var localImages = _.range(1,20).shuffle();



  //=================================================================================

  //3: In this version; these variables control how many images get shuffled and then used in the gallery
  console.log("hey!");
  var actualLocalImageCount = 21
  var maxLocalImageCount = 20

  //this code creates an array with all the numbers between 1 & the `actualLocalImageCount`
  var localImages = []
  //`_.times` means do this x number of times - it is NOT multiplying anything
  _.times(actualLocalImageCount, function(i) {
    localImages.push(i+1);
  })

  //then act on them by shuffling them and take only the top `maxLocalImageCount` numbers
  localImages = _.shuffle(localImages);
  localImages = _.take(localImages, maxLocalImageCount);
  console.log(localImages);
  //and finally add this number to the template
  _.each(localImages, function(localImage) {
    var template = $($("#template-gallery").html());

    //This is the image URL for the gallery - the number from the code above get put in the correct place here
    $("img.image-gallery-content", template).attr("src", "/img/gallery-back-ups/" + localImage + ".jpg");

    // this is the image URL for the lightbox - the number from the code above get put in the correct place here
    $("a.image-url", template).attr("href", "/img/gallery-back-ups/" + localImage + ".jpg");

    // _NOW_ we add this template to the gallery page
    $("#galleryDogs").append(template);
  });

}




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
  $.getJSON("/events", function(data) {
    var groups = {};

    // Group all the events with common names/tags together
    // TODO: Get tags working
    _.each(data, function(currentEvent) {
      var eventName = currentEvent.name.text;

      // Create the event group if it's needed
      if (typeof groups[eventName] == 'undefined' ||
          groups[eventName] === null ) {
        groups[eventName] = {
          events: [],
          package: null
        };
      }

      // Find all events that are proper classes, then add them to
      // and array of events. We'll use the first to make the tab.
      if ((currentEvent.status == "live" ||
          currentEvent.status == "started") &&
          currentEvent.listed === true) {
        groups[eventName].events.push(currentEvent);

      // Pull out only the "package" events that we'll use to
      // signify that someone is buying a 4-pack of classes
      } else if (currentEvent.online_event === true &&
                 currentEvent.listed === true
                 ) {
        groups[eventName].package = currentEvent;

      } else {
        // Do nothing. This event is unlisted or in the past.
      }
    });

    // Remove empty groups (this is what the mixin is for)
    groups = _.objFilter(groups, function (group) {
      return group.events.length > 0;
    })

    // This is your event group. This should be commented out for
    // production
    console.log(groups);

    _.each(groups, function(group) {
      var template = $($("#template-event").html());

      firstEvent = group.events[0];

      // this is a bunch of attributes I am using for listing events
      $(".tab-title span a", template).text(firstEvent.name.text);
      $(".tab-content .content-title", template).text(firstEvent.name.text);
      $(".tab-content .event-description", template).html(firstEvent.description.html);
      $(".tab-content div .event-location", template).html(firstEvent.name.text);
      $(".tab-content div .event-registration-url a", template).attr("href", firstEvent.url)

      // this is a block of stuff to make the dateTime behave
      if (firstEvent.start && firstEvent.start.local &&
          firstEvent.end   && firstEvent.end.local) {
        var startTime = moment(firstEvent.start.local);
        var endTime = moment(firstEvent.end.local);
        $(".tab-content .event-date-time span.event-start-day", template).text(startTime.format("dddd"));
        $(".tab-content .event-date-time span.event-start-date", template).text(startTime.format("MMMM Do"));
        $(".tab-content .event-date-time span.event-start-year", template).text(startTime.format("YYYY"));
        $(".tab-content .event-date-time span.event-start-time", template).text(startTime.format("h:mm a"));
        $(".tab-content .event-date-time span.event-end-time", template).text(endTime.format("h:mm a"));
      } else {
        // the .hide will make the <li> disappear if any dateTime data is missing instead of breaking the page or leaving random html laying about.
        $('.event-date-time', template).hide();
      }

      // the page will break if there is no photo in the event - so the if/else thingy tells it to use a local image
      if (firstEvent.logo && firstEvent.logo.original && firstEvent.logo.original.url)
      {
        $(".tab-content div .event-image img", template).attr("src", firstEvent.logo.original.url);
      } else {
        $(".tab-content div .event-image img", template).attr("src", "/img/training/training-downtown-small.jpg");
      }

      // Add the button to purchase a package if we were able to
      // find one
      // FIXME: This doesn't work yet because we don't have packages
      // that match events by name
      if (group.package) {
        $("div.package-details .package-registration-url a", template)
          .attr("href", group.package.url)
          .show();
        $("div.package-details .package-registration-description", template)
          .attr("href", group.package.description).html
          .show();
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

// $(window).resize(function(){
//  If($(window).width()<500){
//   $('.fade').removeClass('fade');
//  }
// });





