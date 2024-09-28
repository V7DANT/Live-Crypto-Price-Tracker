//logo
const logo=document.getElementById('website-logo')
logo.onclick = function() {
    window.location.href = 'index.html';
};
logo.style.cursor = 'pointer';

    
// Handle search form submission

    const searchForm = document.getElementById('search-form');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const searchInput = document.getElementById('search-input');
        const searchTerm = searchInput.value.trim().toLowerCase();
        console.log("clicked");
        searchCrypto(searchTerm);
    });

    function searchCrypto(searchTerm) {
        const searchUrl = `https://api.coingecko.com/api/v3/search?query=${searchTerm}`;

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                if (data.coins && data.coins.length > 0) {
                    const cryptoId = data.coins[0].id;
                    window.location.href = `crypto.html?id=${cryptoId}`;
                } else {
                    alert('Cryptocurrency not found. Please try another search term.');
                }
            })
            .catch(error => {
                console.error('Error searching for cryptocurrency:', error);
                alert('An error occurred while searching. Please try again.');
            });
    }
//Home Tab
const home=document.getElementById('home-tab');
home.onclick = function() {
    window.location.href = 'index.html';
};

//Trending Tab

const trending=document.getElementById('trending-tab');
trending.onclick = function() {
    window.location.href = 'trending.html';
};  

//News Tab

const news=document.getElementById('news-tab');
news.onclick = function() {
    window.location.href = 'news.html';
};

//About Tab

const about=document.getElementById('about-tab');
about.onclick = function() {
    window.location.href = 'about.html';
};

//Watchlist Tab

const watchlist=document.getElementById('watchlist-tab');
watchlist.onclick = function() {
    window.location.href = 'watchlist.html';
};


document.addEventListener('DOMContentLoaded', function() {
    const gifContainer = document.getElementById('gif-container');
    
    const gifEmbedCode = `
        <div class="gif-wrapper">
            <iframe src="https://giphy.com/embed/aoRY9UfK4Cherc7qtH" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        <p class="gif-attribution"><a href="https://giphy.com/gifs/isomat-working-progress-workinprogress-aoRY9UfK4Cherc7qtH">via GIPHY</a></p>
    `;
    
    gifContainer.innerHTML = gifEmbedCode;
});