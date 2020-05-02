
class Message {
  constructor (bool, string, time) {
    this.authorId = bool; 
    this.content = string;
    this.timeStamp = new Date(time); 
  }

  format () {
    const seconds = this.timeStamp.getSeconds();
    const minutes = this.timeStamp.getMinutes();
    const hours = this.timeStamp.getHours();
    const time = `[${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}] `;

    return time + this.content;
  }
}

// function jsonpCallback (data) {
//   addMessageToChatArea(data.quote, false);
// }

$(() => {

  // Creates new Message object, adds to DOM. (Supports either user type).  

  function fetchRandomUserMessage () {
    // Generate random time interval here ... between 0 and N milliseconds/seconds.localStorage
    const maxInterval = 10000; // millis
    let interval = getRandomInterval();
    setTimeout( () => { 
      // console.log('INFO: TEMP: Will get random (quote) message after =' + (interval/1000) + ' seconds');
      getUserMessage();
      fetchRandomUserMessage();
    }, interval);

    function getRandomInterval () {
      return Math.random() * maxInterval;
    }
  }

  function addMessageToChatArea (messageText, userType) {// Parameters: message, userType (boolean: true=me false=other),
    const userTypeClass = (userType) ? 'col-user user' : 'col-others other-users';
    const messageObj = new Message(userType, messageText, Date.now());
    const $messageDiv = $('<div>')
      .addClass(userTypeClass)
      .html(messageObj.format()); // Change to messageObj.format() when format is finish.
  
    $('#chat-area').append($messageDiv);
  
    $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
  }
    

  function getUserMessage () {
    // Ajax Method

    $.ajax({ 
      url: 'http://quotes.stormconsultancy.co.uk/random.json',
      success: function (data) {
        // console.log(data);
        addMessageToChatArea(data.quote, false);
      }
    });  
    

    // JSONP Method
    // const script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src = 'http://quotes.stormconsultancy.co.uk/quotes/' + Math.ceil(Math.random() * 40) + '.json?callback=jsonpCallback';

    // $('html').append(script);
  }

  $('#input-form').on('submit', function (event) {  
    event.preventDefault();
    
    const $input = $(this).find('[name=message]');
    const input = $input.val();
    document.getElementById('input-form').reset(); 
    if (input) {
      addMessageToChatArea(input, true);
    }
  });

  // Format header image
  $('#head-image').css('height', 0.15 * $(window).innerHeight());


  // Formats #chat-area
  $('#chat-area').css('max-height', 0.75 * window.innerHeight);

  // Starts random messages from other users when page is ready.
  fetchRandomUserMessage();
});