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



const TrendingURL="https://api.coingecko.com/api/v3/search/trending"
function fetchTrending() {
    fetch(TrendingURL)
    .then(response => response.json())
    .then(data => {
        let tableBody = document.getElementById('table-body');
        tableBody.innerHTML = '';
        let topTickers = data.coins;
        topTickers.forEach((ticker, index) => {
            const row = document.createElement('tr');
            
            // Sr No.
            const Sr = document.createElement('td');
            Sr.textContent = index + 1;
            row.appendChild(Sr);

            // Image, Name, and Symbol
            const nameCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = ticker.item.small;
            img.alt = ticker.item.name;
            img.style.width = '24px';
            img.style.marginRight = '10px';
            const nameSymbol = document.createTextNode(`${ticker.item.name} (${ticker.item.symbol})`);
            nameCell.appendChild(img);
            nameCell.appendChild(nameSymbol);
            row.appendChild(nameCell);

            // 3. Price
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${ticker.item.data.price.toFixed(5)}`;
            row.appendChild(priceCell);

            // 4. Change Price_24hr
            const changeCell = document.createElement('td');
            changeCell.textContent = ticker.item.data.price_change_percentage_24h.usd.toFixed(2) + '%';
            changeCell.style.color = ticker.item.data.price_change_percentage_24h.usd >= 0 ? 'green' : 'red';
            row.appendChild(changeCell);

            // 5. Market Cap
            const marketCapCell = document.createElement('td');
            marketCapCell.textContent = `${ticker.item.data.market_cap} (${ticker.item.market_cap_rank})`;
            row.appendChild(marketCapCell);

            // 6. Total Volume
            const volumeCell = document.createElement('td');
            volumeCell.textContent = `${ticker.item.data.total_volume.toLocaleString()}`;
            row.appendChild(volumeCell);

            // 7. Sparkling Lines
            const sparklineCell = document.createElement('td');
            const sparklineImg = document.createElement('img');
            sparklineImg.src = ticker.item.data.sparkline;
            sparklineImg.alt = 'Price Sparkline';
            sparklineImg.style.width = '100px';
            sparklineCell.appendChild(sparklineImg);
            row.appendChild(sparklineCell);

            tableBody.appendChild(row);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTrending();
});




