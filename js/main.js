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
  
  if ('speechSynthesis' in window) { // text-to-speech is supported
    // get the elements
    const form = document.getElementById('form'),
      voice_list = document.getElementById('select-voice'),
      voice_message = document.getElementById('message'),
      submit_button = document.getElementById('submit-button'),
      clear_button = document.getElementById('clear-button'),
      
      slider_volume_value = document.querySelector('#slider-volume-value'),
      input_volume_slider = document.querySelector('#slider-volume'),
      slider_pitch_value = document.querySelector('#slider-pitch-value'),
      input_pitch_slider = document.querySelector('#slider-pitch'),
      slider_rate_value = document.querySelector('#slider-rate-value'),
      input_rate_slider = document.querySelector('#slider-rate');
    
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
      message.volume = +input_volume_slider.value;
      message.pitch = +input_pitch_slider.value;
      message.rate = +input_rate_slider.value;
      
      speechSynthesis.speak(message);
      voice_message.focus();
      return false;
    };
    
    // enable form
    form.onsubmit = speak;
    voice_list.disabled = false;
    voice_message.disabled = false;
    submit_button.disabled = false;
    voice_message.focus();
    
    // add event listener to clear button
    clear_button.addEventListener('click', function (e) {
      
      if (voice_message.value === '') {
        swal('Invalid Entry', 'Message is already empty!', 'error');
      }
      voice_message.innerHTML = '';
      voice_message.focus();
      
    });
  
    //add event listeners to controls
    input_volume_slider.oninput = () => {
      let value = input_volume_slider.value;
      slider_volume_value.textContent = value;
    };
  
    input_pitch_slider.oninput = () => {
      let value = input_pitch_slider.value;
      slider_pitch_value.textContent = value;
    };
  
    input_rate_slider.oninput = () => {
      let value = input_rate_slider.value;
      slider_rate_value.textContent = value;
    };
    
  } else {// text-to-speech is not available in broswer
    swal('Not Supported In Your Browser!', 'Text-to-speech is not supported.', 'error');
    
  }
});














