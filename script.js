
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twButton = document.getElementById('tw');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuote = [];

//show loading
function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function completeLoading() {
    if (!loader.hidden) {        
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//get quote api 
async function getQuote() {
    showLoading();
    proxyUrl = `https://nameless-stream-30379.herokuapp.com/`;
    apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json`;
    try {
         const response = await fetch(proxyUrl + apiUrl);
         const data = await response.json();
         if (data.quoteAuthor === '') {
             authorText.innerText = 'Unknown';
         }else{
             authorText.innerText = data.quoteAuthor;
         }
         // reduce font size if it is long quote
         if (data.quoteText.length > 100) {
             quoteText.classList.add('long-quote');
         }else {
            quoteText.classList.remove('long-quote');
         }
         quoteText.innerText = data.quoteText;
       //stop loader show quote  
        completeLoading(); 
   }catch (error) {
        //catch error here
        getQuote();
    }
}

//tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const  twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//add eventlistener
newQuotebtn.addEventListener('click',getQuote);
twButton.addEventListener('click',tweetQuote);

//on load   
getQuote();

