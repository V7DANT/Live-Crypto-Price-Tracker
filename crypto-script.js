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


function getCryptoIdFromURL() 
{
    const urlParams = new URLSearchParams(window.location.search);
    const cryptoID = urlParams.get('id') || 'bitcoin';
    console.log('Crypto ID:', cryptoID);
    return cryptoID;
    
}

const cryptoID=getCryptoIdFromURL();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updatePageTitle() {
    const capitalizedCryptoID = capitalizeFirstLetter(cryptoID);
    document.title = `${capitalizedCryptoID}`;
}
document.addEventListener('DOMContentLoaded', (event) => {
    updatePageTitle();
});

let name;
let symbol;
const CryptoURL=`https://api.coingecko.com/api/v3/coins/${cryptoID}`;

function fetchCryptoLogo() {
    fetch(CryptoURL)
        .then(response => response.json())
        .then(data => {
            // Set the image
            const imageElement = document.getElementById('crypto-image');
            imageElement.src = data.image.small;
            name = `${cryptoID}`;
            symbol = data.symbol;
            name = capitalizeFirstLetter(name);
            symbol = symbol.toUpperCase();
            
            const cryptoName = document.getElementById('crypto-name-symbol');
            cryptoName.textContent = `${name} (${symbol})`;
        })
        .catch(error => {
            console.error(`Error fetching ${cryptoID} logo:`, error);
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchCryptoLogo();
    
});
          

//1. Crypto Chart (Last 24 hr)

const ctx = document.getElementById('cryptoChart').getContext('2d');
const CryptoChartURL=`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=inr&days=1`;

let chartInstance = null; 

function plot_chart() {
    console.log('Fetching data...');
    fetch(CryptoChartURL)
        .then(response => response.json())
        .then(data => {
            const chartData = data.prices.map(price => ({
                x: price[0],
                y: price[1]
            }));

            const isPositive = chartData[0].y <= chartData[chartData.length - 1].y;

            // Set colors based on trend
            const mainColor = isPositive ? 'rgb(75, 192, 75)' : 'rgb(255, 99, 132)';
            const gradientColor = isPositive ? 'rgba(75, 192, 75, 0.6)' : 'rgba(255, 99, 132, 0.6)';

            // Destroy existing chart if it exists
            if (chartInstance) {
                chartInstance.destroy();
            }

            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, gradientColor);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            // Create new chart instance
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Price (INR)',
                        data: chartData,
                        borderColor: mainColor,
                        backgroundColor: gradient,
                        fill: true,
                        borderWidth: 2,
                        pointBackgroundColor: mainColor,
                        pointBorderColor: mainColor,
                        pointHoverBackgroundColor: 'rgb(255, 255, 255)',
                        pointHoverBorderColor: mainColor,
                        pointRadius: 0,
                        pointHoverRadius: 5,
                        pointHitRadius: 30,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour',
                                stepSize: 3,
                                displayFormats: {
                                    hour: 'HH:00'
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                source: 'data',
                                autoSkip: false,
                                maxRotation: 0,
                                color: 'rgba(255, 255, 255, 0.8)',
                                callback: function(value, index, values) {
                                    const date = new Date(value);
                                    const hours = date.getHours();
                                    if (hours % 3 === 0) {
                                        return hours.toString().padStart(2, '0') + ':00';
                                    }
                                    return '';
                                }
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.8)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: `${cryptoID} Price (Last 24 Hours)`,
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                size: 16
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: mainColor,
                            bodyColor: 'rgb(255, 255, 255)',
                            borderColor: mainColor,
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    },
                    hover: {
                        mode: 'index',
                        intersect: false
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('cryptoChart').innerHTML = 'Error loading chart: ' + error.message;
        });
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    plot_chart(); 
});


//2.Live Price

//₹ (Rupee Symbol)

const livePriceURL=`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${cryptoID}`

function fetchLivePrice() {
    const livePriceURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=${cryptoID}`;

    fetch(livePriceURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                const cryptoData = data[0];
                let livePrice = cryptoData.current_price;
                let priceChange24h = cryptoData.price_change_percentage_24h;
                
                const priceElement = document.getElementById('price');
                const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(livePrice);
                const arrow = priceChange24h >= 0 ? '▲' : '▼';
                const color = priceChange24h >= 0 ? 'green' : 'red';
                
                priceElement.innerHTML = `
                    <span style="color: ${color}">
                        Live Price :
                        ${formattedPrice} 
                        (${priceChange24h.toFixed(2)}% ${arrow})
                    </span>
                `;
            } else {
                throw new Error('No data received for the cryptocurrency');
            }
        })
        .catch(error => {
            console.error("Error fetching live price:", error);
            const priceElement = document.getElementById('price');
            priceElement.textContent = "Error fetching live prices. Please try again later.";
            
            
            // if (error.message.includes('429')) {
            //     console.log("Rate limit reached. Waiting before retrying...");
            //     setTimeout(fetchLivePrice, 60000); 
            // }
        });
}


document.addEventListener('DOMContentLoaded', (event) => {
    
    fetchLivePrice()
});

//3. Real Time Parameters:

const globalMarketCapURL = 'https://api.coingecko.com/api/v3/global';

function fetchRealTimeParameters() {
    console.log('Fetching real-time parameters...');
    console.log('Crypto URL:', CryptoURL);

    fetch(CryptoURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Received data:', data);

        const realTimeContainer = document.getElementById('real-time');
        if (!realTimeContainer) {
            console.error("Element with id 'real-time-data' not found");
            return;
        }
        realTimeContainer.innerHTML = ''; 

        if (!data.market_data) {
            throw new Error('Unexpected data structure: market_data not found');
        }

        const parameters = [
            { label: 'Market Cap', value: formatCurrency(data.market_data.market_cap.inr) },
            { label: 'Fully Diluted Value', value: formatCurrency(data.market_data.fully_diluted_valuation.inr) },
            { label: '24hr Volume', value: formatCurrency(data.market_data.total_volume.inr) },
            { label: 'Circulating Supply', value: formatSupply(data.market_data.circulating_supply, data.symbol) }
        ];

        parameters.forEach(param => {
            const div_row = createDataRow(param.label, param.value);
            realTimeContainer.appendChild(div_row);
        });

        console.log('Real-time parameters updated successfully.');
    })
    .catch(error => {
        console.error('Error fetching real-time parameters:', error);
        const realTimeContainer = document.getElementById('real-time-data');
        if (realTimeContainer) {
            realTimeContainer.innerHTML = '<p class="error-message">Failed to fetch real-time data. Please try again later.</p>';
        }
    });
}

// Helper functions
function formatCurrency(value) {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
}

function formatSupply(value, symbol) {
    if (value === null || value === undefined) return 'N/A';
    return `${new Intl.NumberFormat('en-IN').format(value)} ${symbol.toUpperCase()}`;
}

function createDataRow(label, value) {
    const div_row = document.createElement('div');
    div_row.className = 'crypto-row';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'crypto-row-label';
    labelSpan.textContent = label;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'crypto-row-value';
    valueSpan.textContent = value;

    div_row.appendChild(labelSpan);
    div_row.appendChild(valueSpan);
    return div_row;
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchRealTimeParameters();
});



//4. Historical Data:


console.log('Crypto ID:', cryptoID);

const yrURL = `https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=inr&days=365`;
const cryptoURL = `https://api.coingecko.com/api/v3/coins/${cryptoID}`;
const monthPrice = `https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=inr&days=30`;

function getCryptoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function fetchHistoricalData() {
    console.log('Fetching historical data...');
    console.log('Year URL:', yrURL);
    console.log('Crypto URL:', cryptoURL);
    console.log('Month Price URL:', monthPrice);

    Promise.all([
        fetch(yrURL).then(response => response.json()),
        fetch(cryptoURL).then(response => response.json()),
        fetch(monthPrice).then(response => response.json())
    ])
    .then(([yearData, historicalData, monthData]) => {
        console.log('Year Data:', yearData);
        console.log('Historical Data:', historicalData);
        console.log('Month Data:', monthData);

        if (yearData && yearData.prices && 
            historicalData && historicalData.market_data && 
            monthData && monthData.prices) {
            
            const firstPriceEntry = yearData.prices[0][1];
            const livePrice = historicalData.market_data.current_price.inr;
            const cagr = ((livePrice / firstPriceEntry) ** (365 / yearData.prices.length) - 1) * 100;

            let highestPrice = Math.max(...monthData.prices.map(price => price[1]));
            let lowestPrice = Math.min(...monthData.prices.map(price => price[1]));

            const formattedHighestPrice = formatCurrency(highestPrice);
            const formattedLowestPrice = formatCurrency(lowestPrice);

            const lowestMonthLakh = lowestPrice / 100000;
            const highestMonthLakh = highestPrice / 100000;

            const parameters = [
                { label: 'Market Cap Rank', value: historicalData.market_cap_rank },
                { label: '24h Price Change', value: `${historicalData.market_data.price_change_percentage_24h.toFixed(2)}%` },
                { label: 'All Time High', value: formattedHighestPrice },
                { label: 'All Time Low', value: formattedLowestPrice },
                { label: 'CAGR (1 yr)', value: `${cagr.toFixed(2)}%` },
                { label: '30d Price Range', value: `${lowestMonthLakh.toFixed(2)} L - ${highestMonthLakh.toFixed(2)} L` },
                { label: 'Total Supply', value: formatSupply(historicalData.market_data.total_supply, historicalData.symbol) }
            ];

            const historical_container = document.getElementById('historical-data');
            historical_container.innerHTML = ''; 

            parameters.forEach(param => {
                const div_row = createDataRow(param.label, param.value);
                historical_container.appendChild(div_row);
            });

            console.log('Historical data updated successfully.');
        } else {
            console.error('Missing or incomplete data in one or more of the fetched datasets.');
            console.error('Year Data structure:', yearData ? Object.keys(yearData) : 'undefined');
            console.error('Historical Data structure:', historicalData ? Object.keys(historicalData) : 'undefined');
            console.error('Month Data structure:', monthData ? Object.keys(monthData) : 'undefined');
            throw new Error('Incomplete data fetched');
        }
    })
    .catch(error => {
        console.error('Error fetching historical data:', error);
        const historical_container = document.getElementById('historical-data');
        if (historical_container) {
            historical_container.innerHTML = '<p class="error-message">Failed to fetch historical data. Please try again later.</p>';
        }
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
}

function formatSupply(value, symbol) {
    return value ? `${new Intl.NumberFormat('en-IN').format(value)} ${symbol.toUpperCase()}` : 'N/A';
}

function createDataRow(label, value) {
    const div_row = document.createElement('div');
    div_row.className = 'crypto-row';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'crypto-row-label';
    labelSpan.textContent = label;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'crypto-row-value';
    valueSpan.textContent = value;

    div_row.appendChild(labelSpan);
    div_row.appendChild(valueSpan);
    return div_row;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchHistoricalData();
});


//Info:


function fetchInfo()
{
    fetch(cryptoURL)
    .then(response=>response.json())
    .then(data=>
    {

        const info_container = document.getElementById('info-data');
        info_container.innerHTML = ''; // Clear existing content

        const website_button=document.createElement('button')
        website_button.className='crypto-row-value'
        website_button.id='website-button'
        website_button.textContent="Link"

        const website=data.links.homepage[0]

        website_button.addEventListener('click',function(e){
            window.open(website, '_blank');
        })

        const div_row = document.createElement('div');
        div_row.className = 'crypto-row';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'crypto-row-label';
        labelSpan.textContent = "Official Website";

        div_row.appendChild(labelSpan);
        div_row.appendChild(website_button);
        info_container.appendChild(div_row);


        const paper_button=document.createElement('button')
        paper_button.className='crypto-row-value'
        paper_button.id='paper-button'
        paper_button.textContent="Link"

        const paper=data.links.whitepaper;

        paper_button.addEventListener('click',function(e){
            window.open(paper, '_blank');
        })

        const div_row_2 = document.createElement('div');
        div_row_2.className = 'crypto-row';

        const labelSpan_2 = document.createElement('span');
        labelSpan_2.className = 'crypto-row-label';
        labelSpan_2.textContent = "White Paper";

        div_row_2.appendChild(labelSpan_2);
        div_row_2.appendChild(paper_button);
        info_container.appendChild(div_row_2);


        const code_button=document.createElement('button')
        code_button.className='crypto-row-value'
        code_button.id='code-button'
        code_button.textContent="Link"

        const code=data.links.repos_url.github[0];

        code_button.addEventListener('click',function(e){
            window.open(code, '_blank');
        })

        const div_row_3 = document.createElement('div');
        div_row_3.className = 'crypto-row';

        const labelSpan_3 = document.createElement('span');
        labelSpan_3.className = 'crypto-row-label';
        labelSpan_3.textContent = "Source Code";

        div_row_3.appendChild(labelSpan_3);
        div_row_3.appendChild(code_button);
        info_container.appendChild(div_row_3);


        const forum_button=document.createElement('button')
        forum_button.className='crypto-row-value'
        forum_button.id='forum-button'
        forum_button.textContent="Link"

        const forum=data.links.official_forum_url[0];

        forum_button.addEventListener('click',function(e){
            window.open(forum, '_blank');
        })

        const div_row_4 = document.createElement('div');
        div_row_4.className = 'crypto-row';

        const labelSpan_4 = document.createElement('span');
        labelSpan_4.className = 'crypto-row-label';
        labelSpan_4.textContent = "Official Forum";

        div_row_4.appendChild(labelSpan_4);
        div_row_4.appendChild(forum_button);
        info_container.appendChild(div_row_4);

        //Date:

        const div_row_5 = document.createElement('div');
        div_row_5.className = 'crypto-row';

        const labelSpan_5 = document.createElement('span');
        labelSpan_5.className = 'crypto-row-label';
        labelSpan_5.textContent = "Genesis Date";

        const date=data.genesis_date
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

        const valueSpan = document.createElement('span');
        valueSpan.className = 'crypto-row-value';
        valueSpan.textContent = formattedDate
    
        div_row_5.appendChild(labelSpan_5);
        div_row_5.appendChild(valueSpan);
        info_container.appendChild(div_row_5);


    })
}

document.addEventListener('DOMContentLoaded', () => {
    fetchInfo();
});


// 6.Table

const tickersURL=`https://api.coingecko.com/api/v3/coins/${cryptoID}/tickers`;

let index=0;
function fetchRows()
{
    fetch(tickersURL)
    .then(response=>response.json())
    .then(data=>{
        let tableBody=document.getElementById('table-body');
        tableBody.innerHTML='';
        let topTickers;
        if(data.tickers.length <15)
        {
            topTickers = data.tickers;
        }
        else
        {
            topTickers = data.tickers.slice(0, 15);
        }
        topTickers.forEach((ticker, index) => {
            const row = document.createElement('tr');
            
            // Sr No.
            const Sr = document.createElement('td');
            Sr.textContent = index + 1;
            row.appendChild(Sr);

            // Target
            const targetCell = document.createElement('td');
            targetCell.textContent = ticker.target;
            row.appendChild(targetCell);

            // Market
            const marketCell = document.createElement('td');
            const market_button = document.createElement('button');
            market_button.className = 'table-trade-button';
            market_button.textContent = ticker.market.name;
            market_button.addEventListener('click', function(e) {
                window.open(ticker.trade_url, '_blank');
            });
            marketCell.appendChild(market_button);
            row.appendChild(marketCell);

            // Price
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${ticker.converted_last.usd.toFixed(2)}`;
            row.appendChild(priceCell);

            // Volume
            const volumeCell = document.createElement('td');
            volumeCell.textContent = `$${ticker.converted_volume.usd.toFixed(2)}`;
            row.appendChild(volumeCell);

            // Spread
            const spreadCell = document.createElement('td');
            spreadCell.textContent = `${ticker.bid_ask_spread_percentage.toFixed(3)}%`;
            row.appendChild(spreadCell);

            // Trust Score
            const trustCell = document.createElement('td');
            trustCell.style.backgroundColor = ticker.trust_score === "green" ? "green" : "red";
            row.appendChild(trustCell);

            // Timestamp
            const timeCell = document.createElement('td');
            const date = new Date(ticker.last_traded_at || ticker.timestamp);
            timeCell.textContent = date.toLocaleString();
            row.appendChild(timeCell);

            // Trade Incentive
            const incentiveCell = document.createElement('td');
            incentiveCell.textContent = ticker.market.has_trading_incentive ? 'Yes' : 'No';
            row.appendChild(incentiveCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching tickers:', error);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchRows();
});




//6. News Slider

// const apikey='' 
const newsUrl = `https://gnews.io/api/v4/search?q=${cryptoID}&lang=en&country=us&max=10&apikey=${apikey}`;
const fallBackUrl = `https://gnews.io/api/v4/search?q=crypto&lang=en&country=us&max=10&apikey=${apikey}`;

function fetchNews() {
    fetch(newsUrl)
    .then(response => response.json())
    .then(data => {
        const newsBox = document.getElementById('news-box');
        newsBox.innerHTML = '';
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
            newsBox.appendChild(newsArticle);
        });
        
        // Add an invisible 11th div
        const invisibleDiv = document.createElement('div');
        invisibleDiv.className = 'news-article invisible-article';
        invisibleDiv.style.height = '550px';
        newsBox.appendChild(invisibleDiv);
        
        initializeNewsSlider();
    })
    .catch(error => {
        fetch(fallBackUrl)
        .then(response => response.json())
    .then(data => {
        const newsBox = document.getElementById('news-box');
        newsBox.innerHTML = '';
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
            newsBox.appendChild(newsArticle);
        });
        
        // Add an invisible 11th div
        const invisibleDiv = document.createElement('div');
        invisibleDiv.className = 'news-article invisible-article';
        invisibleDiv.style.height = '550px';
        newsBox.appendChild(invisibleDiv);
        
        initializeNewsSlider();
    })
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
    const newsSlider = document.querySelector('.news-slider');
    const newsContainer = document.querySelector('.news-container');
    const newsArticles = document.querySelector('.news-articles');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentPosition = 0;
    const totalArticles = document.querySelectorAll('.news-article:not(.invisible-article)').length;
    let articlesPerView = 3;

    function updateArticlesPerView() {
        articlesPerView = window.innerWidth <= 1200 ? 2 : 3;
        const articleWidth = newsContainer.offsetWidth / articlesPerView;
        document.querySelectorAll('.news-article').forEach(article => {
            article.style.flex = `0 0 ${articleWidth}px`;
        });
    }

    function updateArticleVisibility() {
        const articles = document.querySelectorAll('.news-article:not(.invisible-article)');
        articles.forEach((article, index) => {
            const position = index * (newsContainer.offsetWidth / articlesPerView) - currentPosition;
            if (position < -newsContainer.offsetWidth || position > newsContainer.offsetWidth * 2) {
                article.classList.add('hidden');
            } else {
                article.classList.remove('hidden');
            }
        });
    }

    function slideNews(direction) {
        const articleWidth = newsContainer.offsetWidth / articlesPerView;
        const maxPosition = (totalArticles - articlesPerView + 1) * articleWidth;
        
        if (direction === 'left') {
            currentPosition = Math.max(0, currentPosition - articleWidth);
        } else if (direction === 'right') {
            currentPosition = Math.min(maxPosition, currentPosition + articleWidth);
        }

        newsArticles.style.transform = `translateX(-${currentPosition}px)`;

        // Update arrow visibility
        leftArrow.style.visibility = currentPosition > 0 ? 'visible' : 'hidden';
        rightArrow.style.visibility = currentPosition < maxPosition ? 'visible' : 'hidden';

        updateArticleVisibility();
    }

    leftArrow.addEventListener('click', () => slideNews('left'));
    rightArrow.addEventListener('click', () => slideNews('right'));

    window.addEventListener('resize', () => {
        updateArticlesPerView();
        slideNews('left'); 
    });
    updateArticlesPerView();
    slideNews('left'); 
}



document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    fetchNews();
});

// 7.About

function fetchAbout()
{
    fetch(cryptoURL)
    .then(response=>response.json())
    .then(data=>{
        const description=data.description.en;
        const descriptionElement = document.getElementById('crypto-description');
        descriptionElement.innerHTML= description;
    })
}
document.addEventListener('DOMContentLoaded', () => {
    fetchAbout();
});





