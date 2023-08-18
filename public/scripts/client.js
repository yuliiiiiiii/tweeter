/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // const data = [
  //     {
  //       "user": {
  //         "name": "Newton",
  //         "avatars": "https://i.imgur.com/73hZDYK.png",
  //         "handle": "@SirIsaac"
  //       },
  //       "content": {
  //         "text": "If I have seen further it is by standing on the shoulders of giants"
  //       },
  //       "created_at": 1692056240004
  //     },
  //     {
  //       "user": {
  //         "name": "Descartes",
  //         "avatars": "https://i.imgur.com/nlhLi3I.png",
  //         "handle": "@rd"
  //       },
  //       "content": {
  //         "text": "Je pense , donc je suis"
  //       },
  //       "created_at": 1692142640004
  //     }
  // ]

  const escape = function(str) {
    //a function to encode string so that HTML tags like <script> will be converted into special characters, so when the input is rendered, the browser doesn't run the input function but just display as special characters
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    //.createTextNode(data) => creates a new text node using parameter data (a string)
    //.appendChild(element) => adds a node to the end of the list of chidren of a specified parent node
    return div.innerHTML;

  };

  const createTweetElement = function(tweet) {
    let name = tweet.user.name;
    let img = tweet.user.avatars;
    let handle = tweet.user.handle;
    let tweet_content = tweet.content.text;
    let created_at = timeago.format(tweet.created_at); //use timeago.format(js-time-string) to show how many days ago

    let $tweet = `
    <article class="tweet">
    <header>
      <div class="photo-username">
        <img src=${img} alt="User photo">
        <p>${name}</p>
      </div>
      <p id="handle">${handle}</p>
    </header>
    <p class="past-tweet-content">${escape(tweet_content)}</p>
    <footer>
      <p>${created_at}</p>

      <div class="icons">
        <i class="fa-solid fa-flag fa-2xs"></i>
        <i class="fa-solid fa-retweet fa-2xs"></i>
        <i class="fa-solid fa-heart fa-2xs"></i>
      </div>
    </footer>
  </article>
    `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      //loop in the tweets array
      let tweetContent = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetContent);
      //prepend $tweet as content to the beginning of #tweets-container section in index.html
    }
  };

  // renderTweets(data);

  $('#send-tweet').on('submit', function(event) {
    event.preventDefault();
    //stop the default form submission behaviour of sending the post request and reloading the page.

    $('#errorBox').hide();
    //Upon submission and before validation, hide the errorBox

    const tweetText = $("#tweet-text").val();
    //val() gets the value of form elements
    // console.log("tweetText:", tweetText);

    if (tweetText.length === 0) {

      $('#error').text("You can't submit an empty tweet.");
      //insert the error message text into the error element
      $('#errorBox').slideDown("fast",);
      //Display the matched elements with a sliding motion. The element in CSS is set to display:none
      return;
    }

    if (tweetText.length > 140) {
      $('#error').text("Your tweet is too long!");
      $('#errorBox').slideDown("fast");
      return;
    }

    const tweetStr = $(this).serialize();
    // .serialize() function turns a set of form data into a query string
    $.ajax('http://localhost:8080/tweets', {
      type: 'POST', //Use ajax to make a post request
      data: tweetStr, //data to submit
      success: function() {
        console.log("success:", tweetStr);
        loadTweets(); //get request can only happen after the post request
        $('#tweet-text').val('');
        //empty the textarea after submission
        $('#counter').val(140);
        //reset count back to 140
      }
    });
  });

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' }) //Use ajax to make a get request
      .then(function(tweetsArray) {
        renderTweets(tweetsArray);
        //get the array of tweets from get response, and send it to renderTweets, in order to load new tweets on browser
      });
  };
  
  loadTweets();
  //to load the page once open

});

