$(document).ready(function() {
  "use strict";

  // Making first tab in classes tabs active
  $("#class-description ul li:first-child").addClass("active")

  // Experiment with API call to make photo gallery
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


      // console.log(post.caption.text);
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
  // console.log("hey!");
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
  // console.log(localImages);
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