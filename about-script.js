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

function createSocialLinks() {
    const container = document.getElementById('social-links');
    if (!container) {
        console.error("Container 'social-links' not found");
        return;
    }

    const githubLink = createSocialLink('GitHub', 'https://github.com/V7DANT');
    const linkedinLink = createSocialLink('LinkedIn', 'https://www.linkedin.com/in/vedant-bothra-4335441b8/');

    container.appendChild(githubLink);
    container.appendChild(linkedinLink);
}

function createSocialLink(platform, url) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'social-link';

    const div = document.createElement('div');
    div.className = `social-button ${platform.toLowerCase()}`;

    const logo = document.createElement('img');
    logo.src = `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${platform.toLowerCase()}.svg`;
    logo.alt = `${platform} logo`;

    div.appendChild(logo);
    div.appendChild(document.createTextNode(platform));

    link.appendChild(div);
    return link;
}


document.addEventListener('DOMContentLoaded', () => {
    createSocialLinks();
});
