/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const data = [
      {
        "user": {
          "name": "Newton",
          "avatars": "https://i.imgur.com/73hZDYK.png",
          "handle": "@SirIsaac"
        },
        "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
        "created_at": 1692056240004
      },
      {
        "user": {
          "name": "Descartes",
          "avatars": "https://i.imgur.com/nlhLi3I.png",
          "handle": "@rd"
        },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1692142640004
      }
  ]
  
  const createTweetElement = function(tweet) {
    let name = tweet.user.name;
    let img = tweet.user.avatars;
    let handle = tweet.user.handle;
    let tweet_content = tweet.content.text;
    let created_at = tweet.created_at;
  
    let $tweet = `
    <article class="tweet">
    <header>
      <div class="photo-username">
        <img src=${img} alt="User photo">
        <p>${name}</p>
      </div>
      <p id="handle">${handle}</p>
    </header>
    <p class="past-tweet-content">${tweet_content}</p>
    <footer>
      <p>${created_at}</p>
      <div class="icons">
        <i class="fa-solid fa-flag fa-2xs"></i>
        <i class="fa-solid fa-retweet fa-2xs"></i>
        <i class="fa-solid fa-heart fa-2xs"></i>
      </div>
    </footer>
  </article>
    `
    return $tweet;
  }
  
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      //loop in the tweets array
      let tweetContent = createTweetElement(tweet);
      $('#tweets-container').append(tweetContent);
      //append $tweet as content to #tweets-container section in index.html
    }
  }

  renderTweets(data);
});

