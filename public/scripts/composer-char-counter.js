$(document).ready(function() {
  //ensure the DOM is ready to be manipulated with jQuery, not try to access HTML elements first
  $("#tweet-text").on('input', function() {
    const words = $(this).val();
    //get the value of the textarea
    const wordlength = words.length;
    const charLeft = 140 - wordlength;

    //  console.log(charLeft); 

    $('#counter').text(charLeft);
    //added counter id in output, change the output value as charLeft

    if (charLeft < 0) {
      $('#counter').css("color", "red");
      //set a CSS property in jQuery
    } else {
      $('#counter').css("color", "rgb(84, 81, 73, 0.8)");
      //when words go back to less than 140, change back to black
    }

  });
});