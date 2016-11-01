$(document).ready(function() {
  "use strict";

  // Experiment with API call to make photo gallery
  $.getJSON("/descriptions")
    .done(drawEventTab)
    .fail(drawBackupEventTab)
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
          originalTab.addClass("active");
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
  _.each(data, function(category) {
    var $tmplCategory = $($("#template-category").html());

    // Set the title on the tab on the left
    $(".tab-title span a", $tmplCategory).html(category.name);
    // Set the title on the top of the content
    $(".content-title", $tmplCategory).html(category.name)
    // Set the body of the appointment
    $(".description", $tmplCategory).html(category.content);

    // Lists need an extra class in this theme, but there's no easy way
    // to do that in the markdown parser.
    $(".description ul", $tmplCategory).addClass("bullets");

    // Find the first image in the description and detach it
    var $descriptionImage = $tmplCategory.find(".description img").first()
    var $keyImage = $tmplCategory.find("img").first()
    // Replace the upper-right image with the src from the detached image
    $descriptionImage.detach();
    $keyImage.attr("src", $descriptionImage.attr("src"));

    // _NOW_ we add this template to the training page
    $("#eventTabs").append($tmplCategory);
  });

  makeTabs();
}

