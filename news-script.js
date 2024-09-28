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


function createNewsItem(article) {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    
    // Format the date
    const publishedDate = new Date(article.publishedAt);
    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    newsItem.innerHTML = `
        <img src="${article.image}" alt="${article.title}" class="news-image">
        <div class="news-content">
            <h2 class="news-title">${article.title}</h2>
            <p class="news-description">${article.description}</p>
            <div class="news-meta">By ${article.source.name}</div>
            <div class="news-date">${formattedDate}</div>
            <a href="${article.url}" class="news-link" target="_blank">Read more</a>
        </div>
    `;
    return newsItem;
}
// const apikey='' 
const businessURL = `https://gnews.io/api/v4/top-headlines?category=business&lang=en&country=us&max=10&apikey=${apikey}`;
const financeURL = `https://gnews.io/api/v4/search?q=finance&lang=en&country=us&max=10&apikey=${apikey}`;
const cryptoURL = `https://gnews.io/api/v4/search?q=crypto&lang=en&country=us&max=10&apikey=${apikey}`;


function fetchNewsForCategory(url, containerId) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById(containerId);
            if (newsContainer) {
                newsContainer.innerHTML = ''; // Clear existing content
                console.log(`Fetched ${data.articles.length} articles for ${containerId}`);
                data.articles.forEach(article => {
                    const newsItem = createNewsItem(article);
                    newsContainer.appendChild(newsItem);
                });
            } else {
                console.error(`News container ${containerId} not found`);
            }
        })
        .catch(error => console.error(`Error fetching news for ${containerId}:`, error));
}

function fetchAllNews() {
    fetchNewsForCategory(businessURL, 'business-news-container');
    fetchNewsForCategory(financeURL, 'finance-news-container');
    fetchNewsForCategory(cryptoURL, 'crypto-news-container');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllNews()
});
