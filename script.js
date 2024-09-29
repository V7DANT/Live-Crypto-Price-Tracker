
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

//Featured Coins:

async function fetchFeaturedCoins() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=4&page=1&sparkline=true';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching featured coins:', error);
        return null;
    }
}



function createFeaturedCoinCards(coinsData) {
    const container = document.getElementById('featured-coins-container');
    container.innerHTML = ''; // Clear existing content

    coinsData.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'price-card';
        card.id = `${coin.id}_card`;

        
        const formattedPrice = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(coin.current_price);

        
        const priceChange = coin.price_change_24h.toFixed(2);
        const priceChangePercentage = coin.price_change_percentage_24h.toFixed(2);
        const isPositive = coin.price_change_percentage_24h >= 0;
        const changeSymbol = isPositive ? '+' : '';
        const arrow = isPositive ? '↑' : '↓';
        const priceChangeClass = isPositive ? 'positive' : 'negative';

        const formattedChange = `${changeSymbol}${Math.abs(priceChange)} (${Math.abs(priceChangePercentage)}%) ${arrow}`;

        card.innerHTML = `
            <div class="price-card-header">
                <img src="${coin.image}" alt="${coin.name} logo" class="coin-logo">
                <div class="price-card-title">${coin.name} (${coin.symbol.toUpperCase()})</div>
            </div>
            <div class="price-card-price">${formattedPrice}</div>
            <div class="price-card-change ${priceChangeClass}">${formattedChange}</div>
            <canvas id="${coin.id}-chart" width="100%" height="60"></canvas>
        `;

        container.appendChild(card);
        
        createMiniChart(coin.id, coin.sparkline_in_7d.price, isPositive);
    });
}


// Create chart here
function createMiniChart(coinId, priceData, isPositive) {
    const ctx = document.getElementById(`${coinId}-chart`).getContext('2d');
    
    console.log(`Creating chart for ${coinId}, isPositive: ${isPositive}`);

    // colors set based on 24h price change
    const color = isPositive ? '#4CAF50' : '#FF0000';
    const gradientColor = isPositive ? 'rgba(76,175,80,0.2)' : 'rgba(255,0,0,0.2)';

    console.log(`Chart color: ${color}`);

    const gradient = ctx.createLinearGradient(0, 0, 0, 60);
    gradient.addColorStop(0, gradientColor);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    if (window.coinCharts && window.coinCharts[coinId]) {
        window.coinCharts[coinId].destroy();
    }

    window.coinCharts = window.coinCharts || {};
    window.coinCharts[coinId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(priceData.length).fill(''),
            datasets: [{
                data: priceData,
                borderColor: color,
                borderWidth: 2,
                pointRadius: 0,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 0
            }
        }
    });
}


async function updateFeaturedCoins() {
    const coinsData = await fetchFeaturedCoins();
    if (coinsData) {
        createFeaturedCoinCards(coinsData);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateFeaturedCoins();
});








//BEST/WORST CRYPTO


const BestCryptoUrl1="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&price_change_percentage=7d"
const BestCryptoUrl2="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=2&price_change_percentage=7d"
const BestCryptoUrl3="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=3&price_change_percentage=7d"
const BestCryptoUrl4="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=4&price_change_percentage=7d"
const BestCryptoUrl5="https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=5&price_change_percentage=7d"


function fetchBestCrypto()
{
    Promise.all([
                fetch(BestCryptoUrl1).then(response => response.json()),
                fetch(BestCryptoUrl2).then(response => response.json()),
                fetch(BestCryptoUrl3).then(response => response.json()),
                fetch(BestCryptoUrl4).then(response => response.json()),
                fetch(BestCryptoUrl5).then(response => response.json())
            ])
            .then(([data1, data2,data3,data4,data5]) => {
                        
                        const combinedData = [...data1, ...data2,...data3,...data4,...data5];
                        
                        cryptoArray = combinedData.map(crypto => ({
                            id: crypto.id,
                            name: crypto.name,
                            symbol: crypto.symbol,
                            image: crypto.image,
                            current_price:crypto.current_price,
                            price_change_24h: crypto.price_change_24h,
                            price_change_percentage_week: crypto.price_change_percentage_7d_in_currency
        
                        }));
                        
                        // Initializing an array to hold the top 5 cryptocurrencies
                        let topFiveCryptos = [];
                        
                        for (let i = 0; i < cryptoArray.length; i++) 
                        {
                            if (topFiveCryptos.length < 5) 
                            {
                                // If we haven't found 5 cryptos yet, add this one
                                topFiveCryptos.push(cryptoArray[i]);
                                // Sort the array in descending order of price change percentage
                                topFiveCryptos.sort((a, b) => b.price_change_percentage_week - a.price_change_percentage_week);
                            } 
                            else if (cryptoArray[i].price_change_percentage_week > topFiveCryptos[4].price_change_percentage_week) 
                            {
                                // If this crypto performs better than the 5th in our list, replace it
                                topFiveCryptos[4] = cryptoArray[i];
                                // Re-sort the array
                                topFiveCryptos.sort((a, b) => b.price_change_percentage_week - a.price_change_percentage_week);
                            }
                        }
                                console.log("Top 5 performing cryptocurrencies in the last week:");
                                topFiveCryptos.forEach((crypto, index) => 
                                {
                                console.log(`${index + 1}. ${crypto.name} (${crypto.symbol}): ${crypto.price_change_percentage_week.toFixed(2)}%`);
                                })
                        let bottomFiveCryptos = [];

                        for (let i = 0; i < cryptoArray.length; i++) 
                        {
                            if (bottomFiveCryptos.length < 5) 
                            {
                                // If we haven't found 5 cryptos yet, add this one
                                bottomFiveCryptos.push(cryptoArray[i]);
                                // Sort the array in ascending order of price change percentage
                                bottomFiveCryptos.sort((a, b) => a.price_change_percentage_week - b.price_change_percentage_week);
                            } 
                            else if (cryptoArray[i].price_change_percentage_week < bottomFiveCryptos[4].price_change_percentage_week) 
                            {
                                // If this crypto performs worse than the 5th in our list, replace it
                                bottomFiveCryptos[4] = cryptoArray[i];
                                // Re-sort the array
                                bottomFiveCryptos.sort((a, b) => a.price_change_percentage_week - b.price_change_percentage_week);
                            }
                        }

                        console.log("Bottom 5 performing cryptocurrencies in the last week:");
                        bottomFiveCryptos.forEach((crypto, index) => {
                            console.log(`${index + 1}. ${crypto.name} (${crypto.symbol}): ${crypto.price_change_percentage_week.toFixed(2)}%`);
                        });
    

                        const topCryptoContainer = document.getElementById('top-crypto-container');
                        topCryptoContainer.innerHTML = '';
                        topFiveCryptos.forEach((crypto, index) => {
                            const cryptoRow = createCryptoRow(crypto, index + 1, true);
                            topCryptoContainer.appendChild(cryptoRow);
                        });
             
                     // Create divs for bottom 5
                     const bottomCryptoContainer = document.getElementById('bottom-crypto-container');
                     bottomCryptoContainer.innerHTML = '';
                     bottomFiveCryptos.forEach((crypto, index) => {
                         const cryptoRow = createCryptoRow(crypto, index + 1, false);
                         bottomCryptoContainer.appendChild(cryptoRow);
                     });
                })
             .catch(error => 
                {
                     console.error('Error fetching crypto data:', error);
                 });

                 function createCryptoRow(crypto, rank, isTop) {
                    const row = document.createElement('tr');
                    const changeColor = crypto.price_change_percentage_week >= 0 ? 'green' : 'red';
                    
                    const priceChange7d = crypto.current_price * (crypto.price_change_percentage_week / 100);

                    const priceChangeFormatted = priceChange7d.toFixed(2);
    const percentageChangeFormatted = crypto.price_change_percentage_week.toFixed(2);
                    
    row.innerHTML = `
    <td class="rank-col">#${rank}</td>
    <td class="name-col">
        <img src="${crypto.image}" alt="${crypto.name} logo" class="crypto-icon">
        <span class="crypto-name">${crypto.name}</span>
        <span class="crypto-symbol">${crypto.symbol}</span>
    </td>
    <td class="price-col">₹${crypto.current_price ? crypto.current_price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 'N/A'}</td>
    <td class="change-col" style="color: ${changeColor};">
        ${priceChangeFormatted} (${percentageChangeFormatted}%)
    </td>
`;
return row;
                }
}

document.addEventListener('DOMContentLoaded', () => {
   fetchBestCrypto();
});


//6. News Slider
// const apikey='' 
const newsUrl = `https://gnews.io/api/v4/search?q=crypto&lang=en&country=us&max=10&apikey=${apikey}`;
const fallBackUrl = `https://gnews.io/api/v4/search?q=finance&lang=en&country=us&max=10&apikey=${apikey}`;

function fetchNews() {
    console.log('Fetching news...');
    fetch(newsUrl)
    .then(response => response.json())
    .then(data => {
        console.log('News data received:', data);
        const newsArticles = document.querySelector('.news-articles');
        if (!newsArticles) {
            console.error('News articles container not found');
            return;
        }
        newsArticles.innerHTML = '';
        if (!data.articles || data.articles.length === 0) {
            console.warn('No articles found in the news data');
            return;
        }
        data.articles.forEach((article, index) => {
            const newsArticle = document.createElement('div');
            newsArticle.className = 'news-article';
            const publishedTime = new Date(article.publishedAt);
            const timeAgo = getTimeAgo(publishedTime);
            newsArticle.innerHTML = `
                <img src="${article.image}" alt="${article.title}" class="news-image">
                <div class="news-content">
                    <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                    <p class="news-publisher">${article.source.name}</p>
                    <p class="news-time">${timeAgo}</p>
                </div>
            `;
            newsArticles.appendChild(newsArticle);
        });
        
        // Add three invisible divs
        for (let i = 0; i < 3; i++) {
            const invisibleDiv = document.createElement('div');
            invisibleDiv.className = 'news-article invisible-article';
            invisibleDiv.style.height = '550px';
            invisibleDiv.style.opacity = '0';
            invisibleDiv.style.pointerEvents = 'none';
            newsArticles.appendChild(invisibleDiv);
        }
        
        console.log('News articles added to the DOM');
        initializeNewsSlider();
    })
    .catch(error => {
        console.error('Error fetching news:', error);
        return fetch(fallBackUrl);
    })
    .then(response => response.json())
    .then(data => {
        const newsArticles = document.querySelector('.news-articles');
        if (!newsArticles) {
            console.error('News articles container not found');
            return;
        }
        newsArticles.innerHTML = '';
        if (!data.articles || data.articles.length === 0) {
            console.warn('No articles found in the fallback news data');
            return;
        }
        data.articles.forEach((article, index) => {
            const newsArticle = document.createElement('div');
            newsArticle.className = 'news-article';
            const publishedTime = new Date(article.publishedAt);
            const timeAgo = getTimeAgo(publishedTime);
            newsArticle.innerHTML = `
                <img src="${article.image}" alt="${article.title}" class="news-image">
                <div class="news-content">
                    <a href="${article.url}" target="_blank" class="news-title">${article.title}</a>
                    <p class="news-publisher">${article.source.name}</p>
                    <p class="news-time">${timeAgo}</p>
                </div>
            `;
            newsArticles.appendChild(newsArticle);
        });

        // Add three invisible divs
        for (let i = 0; i < 3; i++) {
            const invisibleDiv = document.createElement('div');
            invisibleDiv.className = 'news-article invisible-article';
            invisibleDiv.style.height = '550px';
            invisibleDiv.style.opacity = '0';
            invisibleDiv.style.pointerEvents = 'none';
            newsArticles.appendChild(invisibleDiv);
        }

        console.log('Fallback news articles added to the DOM');
        initializeNewsSlider();
    })
    .catch(error => {
        console.error('Error fetching fallback news:', error);
    });
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}


function initializeNewsSlider() {
    console.log('Initializing news slider...');
    const newsSlider = document.querySelector('.news-slider');
    const newsContainer = document.querySelector('.news-container');
    const newsArticles = document.querySelector('.news-articles');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (!newsSlider || !newsContainer || !newsArticles || !leftArrow || !rightArrow) {
        console.error('One or more required elements for the news slider are missing');
        return;
    }

    let currentPosition = 0;
    const visibleArticles = document.querySelectorAll('.news-article:not(.invisible-article)');
    const totalArticles = visibleArticles.length + 2; // Add 2 to account for extra slides
    let articlesPerView = window.innerWidth <= 1200 ? 2 : 3;

    function updateArticlesPerView() {
        articlesPerView = window.innerWidth <= 1200 ? 2 : 3;
        const articleWidth = newsContainer.offsetWidth / articlesPerView;
        visibleArticles.forEach(article => {
            article.style.flex = `0 0 ${articleWidth}px`;
        });
    }

    function slideNews(direction) {
        const articleWidth = newsContainer.offsetWidth / articlesPerView;
        const maxPosition = (totalArticles - articlesPerView) * articleWidth;
        
        if (direction === 'left') {
            currentPosition = Math.max(0, currentPosition - articleWidth);
        } else if (direction === 'right') {
            currentPosition = Math.min(maxPosition, currentPosition + articleWidth);
        }

        newsArticles.style.transform = `translateX(-${currentPosition}px)`;

        
        leftArrow.style.visibility = currentPosition > 0 ? 'visible' : 'hidden';
        rightArrow.style.visibility = currentPosition < maxPosition ? 'visible' : 'hidden';
    }

    leftArrow.addEventListener('click', () => slideNews('left'));
    rightArrow.addEventListener('click', () => slideNews('right'));

    window.addEventListener('resize', () => {
        updateArticlesPerView();
        currentPosition = 0; // Reset to the first slide
        slideNews('left');
    });

    updateArticlesPerView();
    slideNews('left'); // Initialize arrow visibility
    console.log('News slider initialized');
}


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchNews();
});