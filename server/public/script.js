
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

    this.content = time + this.content;
  }
}

function addMessageToChatArea (message) {// Parameters: message, userType (boolean: true=me false=other),
  const userTypeClass = (message.authorId) ? 'col-user user' : 'col-others other-users';
  const $messageDiv = $('<div>')
    .addClass(userTypeClass)
    .html(message.content);

  $('#chat-area').append($messageDiv);

  $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
}
  

function getMessages () {
  $.get('/message', (data) => {
    data.forEach(message => addMessageToChatArea(message));
  });
}


function postMessage (message) {
  $.ajax({
    url: '/message',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(message),
  });
}


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



function getUserMessage () {
  // Ajax Method

  $.ajax({ 
    url: 'http://quotes.stormconsultancy.co.uk/random.json',
    success: function (data) {
      // console.log(data);
      const message = new Message(false, data.quote, Date.now());
      message.format();
      postMessage(message);

      addMessageToChatArea(message);
    }
  });  
}

$(() => {
  getMessages();
  $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);


  $('#input-form').on('submit', function (event) {  
    event.preventDefault();
    
    const $input = $(this).find('[name=message]');
    const input = $input.val();
    document.getElementById('input-form').reset(); 
    if (input) {
      const message = new Message(true, input, Date.now());
      message.format();
      postMessage(message);

      addMessageToChatArea(message);
    }
  });

  // Format header image
  $('#head-image').css('height', 0.15 * $(window).innerHeight());


  // Formats #chat-area
  $('#chat-area').css('max-height', 0.75 * window.innerHeight);

  // Starts random messages from other users when page is ready.
  fetchRandomUserMessage();
});