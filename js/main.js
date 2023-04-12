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
  
  if ('speechSynthesis' in window) {
    /*=============================================
          text-to-speech is supported in the browser,
          assign variables
    ================================================*/
    
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
    
    //**************** populate available voices ****************//
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
    
    /*=============================================
          add event listeners
    ================================================*/
    submit_button.addEventListener('click', function(e) {
      let speech_utter = new SpeechSynthesisUtterance();
      speech_utter.voice = speechSynthesis.getVoices()[voice_list.value];
  
      if (voice_message.value === '') {
        swal('Invalid Entry', 'Message cannot be empty!', 'error');
        return;
      }
      speech_utter.text = voice_message.value;
      speech_utter.volume = +input_volume_slider.value;
      speech_utter.pitch = +input_pitch_slider.value;
      speech_utter.rate = +input_rate_slider.value;
  
      speechSynthesis.speak(speech_utter);
      voice_message.focus();
      
    });
    
    clear_button.addEventListener('click', function (e) {
      if (voice_message.value === '') {
        swal('Invalid Entry', 'Message is already empty!', 'error');
        return;
      }
      voice_message.innerHTML = '';
      voice_message.focus();
      
    });
    
    input_volume_slider.addEventListener('input', function() {
      let value = input_volume_slider.value;
      slider_volume_value.textContent = value;
    })
    
    input_pitch_slider.addEventListener('input', function(){
      let value = input_pitch_slider.value;
      slider_pitch_value.textContent = value;
      
    });
    
    input_rate_slider.addEventListener('input', function() {
      let value = input_rate_slider.value;
      slider_rate_value.textContent = value;
      
    });
    
  } else {
    //**************** text-to-speech is not availabe in browser ****************//
    swal('Not Supported In Your Browser!', 'Text-to-speech is not supported.', 'info');
    return;
  }
});