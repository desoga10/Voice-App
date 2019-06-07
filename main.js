//Init SpeechSynth Api
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Initialise Voice Array

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  //Loop Through Voices And Also Create An Option For Each One
  console.log(voices);
  voices.forEach(voice => {
    //Create Option Element
    const option = document.createElement('option');
    //Fill The Option With Language And Voice
    option.textContent = voice.name + '(' + voice.lang + ')';

    //Set Neede Option Attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {
  //Check If Speaking
  if (synth.speaking) {
    console.log('Already Speaking');
    return;
  }
  if (textInput.value !== '') {
    //Add Background Animation
    body.style.background = '#141414 url(img/giphy.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    //Get Speak Text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //Speech Ends
    speakText.onend = e => {
      console.log('Done Speaking...');
      body.style.background = 'black';
    };

    //Speech Error
    speakText.onerror = e => {
      console.log('Something Went Wrong');
    };

    //Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    //Loop Through Voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    //Set Pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    //Speak
    synth.speak(speakText);
  }
};

//EVENT LISTENERS

//Text Form Submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//Rate Value Change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

//Pitch Value Change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

//Voice Select  Change
voiceSelect.addEventListener('change', e => speak());
