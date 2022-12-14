// -------------------------------
// VARIABLES
// -------------------------------

// --- DOM ELEMENTS ---
const
    jokeButton = document.getElementById('joke-button'),
    audioElement = document.getElementById('audio'),
    languageButtons = document.querySelectorAll('.language-button'),
    languageBackground = document.querySelector('.language-background'),
    loader = document.querySelector('.loading-zone')

    
// --- 4 API WORK ---
let language = 'english'

const _0x47ad18=_0x5b0a;function _0x5b0a(_0x15a7cf,_0x3ad20f){const _0x4e6aa6=_0x4e6a();return _0x5b0a=function(_0x5b0aa,_0xd5b1f){_0x5b0aa=_0x5b0aa-0x143;let _0x54e15b=_0x4e6aa6[_0x5b0aa];return _0x54e15b;},_0x5b0a(_0x15a7cf,_0x3ad20f);}(function(_0x3521ce,_0x253441){const _0x2afe01=_0x5b0a,_0x3794c6=_0x3521ce();while(!![]){try{const _0x190dc6=-parseInt(_0x2afe01(0x14d))/0x1+-parseInt(_0x2afe01(0x147))/0x2+parseInt(_0x2afe01(0x14a))/0x3*(parseInt(_0x2afe01(0x146))/0x4)+-parseInt(_0x2afe01(0x14c))/0x5*(-parseInt(_0x2afe01(0x149))/0x6)+parseInt(_0x2afe01(0x145))/0x7+parseInt(_0x2afe01(0x14b))/0x8*(parseInt(_0x2afe01(0x148))/0x9)+-parseInt(_0x2afe01(0x144))/0xa;if(_0x190dc6===_0x253441)break;else _0x3794c6['push'](_0x3794c6['shift']());}catch(_0x21cb47){_0x3794c6['push'](_0x3794c6['shift']());}}}(_0x4e6a,0x928bd));function _0x4e6a(){const _0x1cdb4d=['2220568cazTYm','4ijnZaK','126210RrQaxR','16839DSBweU','36504CumiXG','1322694IYmSvz','1184XaIXdv','920jdGMuI','748541xyxErK','2103539ce790422c8defd40aa4b58413','7425870yNEYSA'];_0x4e6a=function(){return _0x1cdb4d;};return _0x4e6a();}const apiKey=_0x47ad18(0x143);



// -------------------------------
// CALLBACK FUNCTIONS
// -------------------------------

// => show the loader
const showLoader = ()=>{
    loader.style.display = 'flex'
}

// => hide the loader
const hideLoader = ()=>{
    loader.style.display = 'none'
}

// => speak out the fetched joke
const tellAJoke = (joke)=>{
    // => delete whitespace on the start and end of the joke , encode whitespace for the voice api
    const jokeString = joke.trim().replace(/ /g, '%20')

    // => hide the loader
    hideLoader()

    // => let`s speak out / call the voice api
    language === 'english'
    ? VoiceRSS.speech({
        key: apiKey,
        src: jokeString,
        hl: 'en-us',
        r: -1,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    })
    : VoiceRSS.speech({
        key: apiKey,
        src: jokeString,
        hl: 'de-de',
        r: -1,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
    })
    
}

// => disable the button till the joke is finished
function toggleButton() {
    jokeButton.disabled = !jokeButton.disabled;
  }



// -------------------------------
// FETCHING
// -------------------------------

const getAJoke = async()=>{
    // => show the loader till the joke is gone to the Voice API
    showLoader()

    const apiUrl = 
        language === 'english'
        ? 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit'
        : 'https://v2.jokeapi.dev/joke/Any?lang=de&blacklistFlags=nsfw,religious,racist,sexist,explicit' 

    let joke = ''

    try{
        const response = await fetch(apiUrl)
        const data = await response.json()

        // => handle the two possible types of jokes
        data.setup
        ? joke = `${data.setup} ... ${data.delivery}`
        : joke = data.joke

        // => pass the joke to the VoiceRSS API
        tellAJoke(joke)

        // => disable the joke button till the joke is finished
        toggleButton()
        
    } catch (err) {
        alert('SOMETHING GOING WRONG => \n' + err)
    }

}



// -------------------------------
// EVENT LISTENERS 
// -------------------------------

// => hide the spinner when content is loaded
window.addEventListener('DOMContentLoaded', ()=>{
    hideLoader()
})

// => tell a joke
jokeButton.addEventListener('click', getAJoke)

// => change language
languageButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        if(button.innerHTML === 'Deutsch'){
            language = 'german'
            jokeButton.innerHTML = 'Erzähl mir einen Witz'

            // => if the background of the language buttons has not the class xxx-right, add them
            languageBackground.classList.contains('language-background-right') || 
                languageBackground.classList.add('language-background-right')
       
        }
        else{
            language = 'english'
            jokeButton.innerHTML = 'Tell Me A Joke'

            // => if the background of the language buttons has the class xxx-right, remove them
            languageBackground.classList.contains('language-background-right') &&
                languageBackground.classList.remove('language-background-right')
        }
    })
  
})

// => when the joke is finished, enable the joke button
audioElement.addEventListener('ended', toggleButton);