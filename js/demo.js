$(function() {
  
  $(".bg-holder").parallaxScroll({
    friction: 0.5,
    direction: "vertical"
  });
  
});

$('.navTrigger').click(function () {
  $(this).toggleClass('active');
  console.log("Clicked menu");
  $("#mainListDiv").toggleClass("show_list");
  $("#mainListDiv").fadeIn();

});
