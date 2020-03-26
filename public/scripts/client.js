/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //Create HTML template for article object
  const createTweetElement = function(tweetObj) {
    const $tweet = $("<article>").addClass("tweet");

    const $header = $("<header>").addClass("tweet-header");

    const $paragraph = $("<p>")
      .addClass("past-tweet-comment")
      .text(tweetObj.content.text);

    const $span = $("<span>")
      .attr("id", "tweet-firstname")
      .text(tweetObj.user.name)
      .appendTo($header);

    $("<img>")
      .addClass("tweet-img")
      .attr("src", tweetObj.user.avatars)
      .prependTo($span);

    $("<span>")
      .attr("id", "tweet-username")
      .text(tweetObj.user.handle)
      .appendTo($header);

    const $footer = $("<footer>").addClass("tweet-footer");

    $("<span>")
      .text(moment(tweetObj.created_at).fromNow())
      .prependTo($footer);

    const $secondFooterSpan = $("<span>");

    const $footerIcon1 = $("<a>").attr("href", "#");
    const $footerIcon2 = $("<a>").attr("href", "#");
    const $footerIcon3 = $("<a>").attr("href", "#");

    $secondFooterSpan.append($footerIcon1);
    $secondFooterSpan.append($footerIcon2);
    $secondFooterSpan.append($footerIcon3);
    $footer.append($secondFooterSpan);

    $("<i>")
      .addClass("fas fa-flag")
      .appendTo($footerIcon1);
    $("<i>")
      .addClass("fas fa-retweet")
      .appendTo($footerIcon2);
    $("<i>")
      .addClass("fas fa-heart")
      .appendTo($footerIcon3);

    $tweet.append($header);
    $tweet.append($paragraph);
    $tweet.append($footer);

    return $tweet;
  };

  const renderTweets = function(tweets) {
    //Loops through tweets
    //Calls createTweetElement for each tweet
    //Takes return value and appends it to the tweets container
    $.each(tweets, function(index, tweetData) {
      $("#tweet-form-container").append(createTweetElement(tweetData));
    });
  };

  const requestPosts = () => {
    //Create GET request for Tweeter home page

    $.ajax({
      method: "GET",
      url: "/tweets"
    })
      .done(function(response) {
        // Success in getting the response from the request
        renderTweets(response);
      })
      .fail(function(error) {
        // Problem with the request
        console.log(`Error with the request: ${error.message}`);
      });
  };

  const requestOneTweet = () => {
    //To show only recent tweets at a time when created

    $.ajax({
      method: "GET",
      url: "/tweets"
    })
      .done(function(response) {
        //Success in getting the response from the request
        renderTweets([response.pop()]);
      })
      .fail(function(error) {
        //Problem with the request
        console.log(`Error with the request: ${error.message}`);
      });
  };

  //Event listener for "submit" on the tweet button
  $(".tweet-form").on("submit", function(event) {
    //Remove defaut the default behavior of the button
    event.preventDefault();
    //Text area validations with relevant alert messages based on error type
    if ($("#tweet-text").val().length > 140) {
      $(".first-warning").slideDown("slow", function() {
        $(".first-warning").addClass("first-warning-show");
        $(".tweet-form").on("click", function(event) {
          $(".first-warning").hide();
        });
      });
    } else if (
      $("#tweet-text").val() === "" ||
      $("#tweet-text").val() === null
    ) {
      $(".second-warning").slideDown("slow", function() {
        $(".second-warning").addClass("second-warning-show");
        $(".tweet-form").on("click", function(event) {
          $(".second-warning").hide();
        });
      });
    } else {
      const serializeData = $(this).serialize();
      //Issue POST request with jQuery Ajax
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serializeData
      })
        .done(function(response) {
          // Success in getting the response from the request
          requestOneTweet();
          $("#tweet-text").val("");
        })
        .fail(function(error) {
          // Problem with the request
          console.log(`Error with the request: ${error.message}`);
        });
    }
  });
  requestPosts();
});
