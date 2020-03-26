$(document).ready(function() {
  //as user types we want to change counter

  //Step 1: how many char they've typed so far
  //Step 2: how many char they have left based on step 1
  //Step 3: update the counter based on new number in step 2
  //$(event.target) = this

  $("#tweet-text").on("keyup", (event) => {
    const stringTyped = $(event.target).val().length;
    const remain = 140 - stringTyped;
    $(".counter").text(remain);

    if (remain < 0) {
      $(".counter").addClass("error-counter");
    } else {
      $(".counter").removeClass("error-counter");
    }
  });
});
