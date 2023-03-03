
/* ============================================
            preloader
===============================================*/
$(window).on('load', function () {
  // makes sure that whole site is loaded
  $('#preloader-gif, #preloader').fadeOut(3000, function () {});
});




/* ============================================
            js-text-to-speak
===============================================*/
$(window).on('load', function () {
  
  // text-to-speech is supported
  if ('speechSynthesis' in window) {
    // get the elements
    let form = document.getElementById('form'),
      voice_list = document.getElementById('select-voice'),
/*      vvol = document.getElementById('demo-vol'),
      vpitch = document.getElementById('demo-pitch'),
      vrate = document.getElementById('demo-rate'),*/
      voice_message = document.getElementById('message'),
      submit_button = document.getElementById('submit-button'),
      clear_button = document.getElementById('clear-button');
      

    // populate available voices
    const voices = () => {
      speechSynthesis.getVoices().forEach((voice, i) => {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = voice.name;
        voice_list.appendChild(option);
      });
    };
    voices();
    speechSynthesis.onvoiceschanged = voices;
    
    // speak
    const speak = () => {
      let message = new SpeechSynthesisUtterance();
      message.voice = speechSynthesis.getVoices()[voice_list.value];
      
      if (voice_message.value === '') {
        swal('Invalid Entry', 'Message cannot be empty!', 'error');
      }
      message.text = voice_message.value;
      speechSynthesis.speak(message);
      return false;
    };
    
    // enable form
    form.onsubmit = speak;
    voice_list.disabled = false;
/*    vvol.disabled = false;
    vpitch.disabled = false;
    vrate.disabled = false;*/
    voice_message.disabled = false;
    voice_message.focus();
    submit_button.disabled = false;
    
    clear_button.addEventListener('click', function(e) {
      console.log('clear_button');
      if (voice_message.value === '') {
        swal('Invalid Entry', 'Message is already empty!', 'error');
      }
      voice_message.innerHTML = '';
      voice_message.focus();

    });

  }
  // text-to-speech is not available in broswer
  else {
    /*alert('Text-to-speech is not supported on your browser!');*/
    swal('Not Supported In Your Browser!','Text-to-speech is not supported.', 'error');
  }
});












