// Game data
const games = {
    mobilelegends: {
        name: 'Mobile Legends Diamonds',
        prices: [
            { amount: '55 💎', price: 'Rs.160' },
            { amount: '86 💎', price: 'Rs.215' },
            { amount: '172 💎', price: 'Rs.400' },
            { amount: '257 💎', price: 'Rs.600' },
            { amount: '344 💎', price: 'Rs.860' },
            { amount: '429 💎', price: 'Rs.1075' },
            { amount: '514 💎', price: 'Rs.1200' },
            { amount: '706 💎', price: 'Rs.1500' },
            { amount: '878 💎', price: 'Rs.2195' },
            { amount: '963 💎', price: 'Rs.2408' },
            { amount: '1050 💎', price: 'Rs.2625' },
            { amount: '1412 💎', price: 'Rs.2950' },
            { amount: 'Weekly Pass', price: 'Rs.215' },
            { amount: 'Monthly Pass', price: 'Rs.645' }
        ]
    },
    roblox: {
        name: 'Roblox Robux',
        prices: [
            { amount: '300 Robux', price: 'Rs.700' },
            { amount: '400 Robux', price: 'Rs.1000' },
            { amount: '500 Robux', price: 'Rs.1250' },
            { amount: '800 Robux', price: 'Rs.2000' },
            { amount: '1000 Robux', price: 'Rs.2500' },
            { amount: '1500 Robux', price: 'Rs.3750' },
            { amount: '2000 Robux', price: 'Rs.5000' },
            { amount: '3000 Robux', price: 'Rs.5500' }
        ]
    },
    freefire: {
        name: 'Free Fire Diamonds',
        prices: [
            { amount: '50 💎', price: 'Rs.65' },
            { amount: '115 💎', price: 'Rs.105' },
            { amount: '240 💎', price: 'Rs.200' },
            { amount: '355 💎', price: 'Rs.300' },
            { amount: '480 💎', price: 'Rs.400' },
            { amount: '610 💎', price: 'Rs.500' },
            { amount: '725 💎', price: 'Rs.610' },
            { amount: '850 💎', price: 'Rs.720' },
            { amount: '965 💎', price: 'Rs.830' },
            { amount: '1090 💎', price: 'Rs.910' },
            { amount: '1240 💎', price: 'Rs.1000' },
            { amount: '1480 💎', price: 'Rs.1220' },
            { amount: '1720 💎', price: 'Rs.1420' },
            { amount: '1850 💎', price: 'Rs.1500' },
            { amount: '2090 💎', price: 'Rs.1710' },
            { amount: '2530 💎', price: 'Rs.2000' },
            { amount: '5060 💎', price: 'Rs.4000' },
            { amount: '10120 💎', price: 'Rs.8000' },
            { amount: 'Monthly', price: 'Rs.995' },
            { amount: 'Elite Weekly', price: 'Rs.75' }
        ]
    },
    pubg: {
        name: 'PUBG UC',
        prices: [
            { amount: '60 UC', price: 'Rs.170' },
            { amount: '120 UC', price: 'Rs.320' },
            { amount: '180 UC', price: 'Rs.480' },
            { amount: '325 UC', price: 'Rs.800' },
            { amount: '660 UC', price: 'Rs.1600' },
            { amount: '1800 UC', price: 'Rs.4000' },
            { amount: '3850 UC', price: 'Rs.8000' },
            { amount: '8100 UC', price: 'Rs.16000' }
        ]
    }
};

// DOM elements
const homepage = document.getElementById('homepage');
const gameSection = document.getElementById('game-section');
const gameTitle = document.getElementById('game-title');
const priceList = document.getElementById('price-list');
const backBtn = document.getElementById('back-btn');
const modal = document.getElementById('buy-modal');
const closeBtn = document.querySelector('.close');
const buyForm = document.getElementById('buy-form');
const feedback = document.getElementById('feedback');
const reviewsContainer = document.querySelector('.reviews-container');
const supportForm = document.getElementById('support-form');
const supportFeedback = document.getElementById('support-feedback');
const loadingScreen = document.getElementById('loading-screen');

// Event listeners
document.querySelectorAll('.game-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.dataset.game === 'netflix') {
            openBuyModal('netflix', 'Monthly Subscription', 'Rs 799');
        } else {
            showGameSection(item.dataset.game);
        }
    });
});

backBtn.addEventListener('click', showHomepage);

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

buyForm.addEventListener('submit', handleFormSubmit);

supportForm.addEventListener('submit', handleSupportFormSubmit);

// Loading screen fade out
document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000); // Show loading for 2 seconds

    // Remove any existing review particles
    const existingParticles = document.querySelectorAll('.review-particle');
    existingParticles.forEach(particle => particle.remove());

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Set default theme to light
    body.classList.add('light-theme');

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.textContent = 'Light';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.textContent = 'Dark';
            localStorage.setItem('theme', 'light');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = 'Light';
    } else {
        body.classList.add('light-theme');
        themeToggle.textContent = 'Dark';
    }

    // QR Code download functionality using event delegation
    const modal = document.getElementById('buy-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'download-qr') {
                const qrImage = document.querySelector('.qr-code');
                if (qrImage) {
                    // Open the image in a new tab for manual saving
                    window.open(qrImage.src, '_blank');
                    alert('Image opened in new tab. Right-click (desktop) or long press (mobile) to save the image.');
                }
            }
        });
    }
});

// Create particles
function createParticles() {
    const particleContainer = document.body;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        particleContainer.appendChild(particle);
    }
}



// Array of different review texts
const reviewTexts = [
    "Amazing service! Got my Robux instantly. Highly recommend!",
    "Fast delivery and great prices. Will use again!",
    "Excellent customer support. Helped me right away.",
    "Secure and trustworthy. No issues with my purchase.",
    "Got my diamonds in seconds. Perfect!",
    "Best top-up service I've used. Fast and reliable!",
    "Instant delivery as promised. Very satisfied!",
    "Affordable and quick. Great for gamers on budget.",
    "Outstanding service! Diamonds delivered in seconds.",
    "Very professional and fast delivery. 10/10!",
    "Got my weekly pass instantly. Best prices around!",
    "Trustworthy service. No scams, just pure gaming fun!",
    "Monthly pass delivered in under a minute. Amazing!",
    "Best customer support. Helped me instantly with my order.",
    "Got 1000 Robux instantly. Perfect transaction!",
    "Free Fire diamonds were delivered super fast. Love it!",
    "PUBG UC arrived in seconds. Great service!",
    "Mobile Legends top-up was instant. Highly satisfied!",
    "Fast delivery and great prices. Will use again!",
    "Got my Elite Weekly pass instantly. Perfect!",
    "Trustworthy and reliable. No issues whatsoever.",
    "Diamonds arrived in under 30 seconds. Incredible!",
    "Best gaming top-up service. Fast and secure!",
    "Got 3000 Robux instantly. Very happy with service!",
    "Free Fire top-up was lightning fast. Recommended!",
    "PUBG UC delivered instantly. Great experience!",
    "Mobile Legends diamonds arrived immediately. Perfect!",
    "Fast, reliable, and affordable. 5 stars service!",
    "Got my weekly pass in seconds. Amazing speed!",
    "Secure payment and instant delivery. Love it!",
    "Monthly pass arrived instantly. Best service ever!",
    "Customer support is excellent. Helped me right away.",
    "Got 2000 Robux instantly. Perfect transaction!",
    "Free Fire diamonds delivered super fast. Amazing!",
    "PUBG UC was instant. No waiting at all!",
    "Mobile Legends top-up was lightning fast. Great!",
    "Fast delivery and great prices. Highly recommended!",
    "Got Elite Weekly instantly. Perfect service!",
    "Trustworthy and reliable. No complaints!",
    "Diamonds arrived in seconds. Incredible speed!",
    "Best gaming service. Fast and secure delivery!",
    "Got 1500 Robux instantly. Very satisfied!",
    "Free Fire top-up was instant. Love the service!",
    "PUBG UC delivered immediately. Great job!",
    "Mobile Legends diamonds arrived instantly. Perfect!",
    "Fast, reliable, and affordable. Best choice!",
    "Weekly pass in seconds. Amazing service!",
    "Secure and instant. Highly recommended!",
    "Monthly pass arrived instantly. Perfect!",
    "Excellent support and fast delivery. 5 stars!",
    "Got 800 Robux instantly. Great experience!",
    "Free Fire diamonds super fast. Love it!",
    "PUBG UC instant delivery. Perfect service!",
    "Mobile Legends top-up lightning fast. Amazing!",
    "Fast delivery and best prices. Recommended!",
    "Elite Weekly pass instantly. Great service!",
    "Trustworthy and reliable. No issues!",
    "Diamonds in under 30 seconds. Incredible!",
    "Best gaming top-up. Fast and secure!",
    "Got 500 Robux instantly. Very happy!",
    "Free Fire top-up instant. Recommended!",
    "PUBG UC delivered immediately. Great!",
    "Mobile Legends diamonds instant. Perfect!",
    "Fast, reliable, affordable. Best service!",
    "Weekly pass in seconds. Amazing speed!",
    "Secure payment and instant delivery!",
    "Monthly pass instant. Best ever!",
    "Excellent support and fast. 5 stars!",
    "Got 400 Robux instantly. Perfect!",
    "Free Fire diamonds fast. Love it!",
    "PUBG UC instant. No waiting!",
    "Mobile Legends top-up fast. Great!",
    "Fast delivery best prices. Recommended!",
    "Elite Weekly instantly. Perfect!",
    "Trustworthy reliable. No complaints!",
    "Diamonds in seconds. Incredible!",
    "Best gaming service. Fast secure!",
    "Got 300 Robux instantly. Happy!",
    "Free Fire top-up instant. Love!",
    "PUBG UC immediately. Great job!",
    "Mobile Legends diamonds instant!",
    "Fast reliable affordable. Best!",
    "Weekly pass seconds. Amazing!",
    "Secure instant. Recommended!",
    "Monthly pass instant. Perfect!",
    "Excellent support fast. 5 stars!",
    "Got 1000 Robux instantly. Great!",
    "Free Fire diamonds super fast!",
    "PUBG UC instant delivery!",
    "Mobile Legends top-up fast!",
    "Fast delivery best prices!",
    "Elite Weekly instantly. Great!",
    "Trustworthy reliable. Perfect!",
    "Diamonds under 30 seconds!",
    "Best gaming top-up. Secure!",
    "Got 2500 Robux instantly. Amazing!",
    "Free Fire top-up was perfect. Love it!",
    "PUBG UC delivered instantly. Perfect!",
    "Mobile Legends diamonds arrived fast!",
    "Fast reliable affordable. Excellent!",
    "Weekly pass in seconds. Perfect!",
    "Secure instant delivery. Great!",
    "Monthly pass arrived fast. Love it!",
    "Excellent support fast delivery!",
    "Got 1500 Robux instantly. Perfect!",
    "Free Fire diamonds super fast. Great!",
    "PUBG UC instant. No waiting!",
    "Mobile Legends top-up fast. Perfect!",
    "Fast delivery best prices. Amazing!",
    "Elite Weekly instantly. Excellent!",
    "Trustworthy reliable. Perfect service!",
    "Diamonds in 30 seconds. Incredible!",
    "Best gaming service. Fast secure!",
    "Got 2000 Robux instantly. Happy!",
    "Free Fire top-up instant. Perfect!",
    "PUBG UC delivered immediately!",
    "Mobile Legends diamonds instant!",
    "Fast reliable affordable. Best!",
    "Weekly pass seconds. Amazing!",
    "Secure instant. Highly recommended!",
    "Monthly pass instant. Perfect!",
    "Excellent support fast. 5 stars!",
    "Got 800 Robux instantly. Great!",
    "Free Fire diamonds fast. Love it!",
    "PUBG UC instant delivery!",
    "Mobile Legends top-up fast!",
    "Fast delivery best prices!",
    "Elite Weekly instantly. Great!",
    "Trustworthy reliable. Perfect!",
    "Diamonds under 30 seconds!",
    "Best gaming top-up. Secure!",
    "Got 3000 Robux instantly. Amazing!",
    "Free Fire top-up was perfect!",
    "PUBG UC delivered instantly!",
    "Mobile Legends diamonds fast!",
    "Fast reliable affordable. Excellent!",
    "Weekly pass in seconds. Perfect!",
    "Secure instant delivery. Great!",
    "Monthly pass arrived fast. Love it!",
    "Excellent support fast delivery!",
    "Got 1000 Robux instantly. Perfect!",
    "Free Fire diamonds super fast. Great!",
    "PUBG UC instant. No waiting!",
    "Mobile Legends top-up fast. Perfect!",
    "Fast delivery best prices. Amazing!",
    "Elite Weekly instantly. Excellent!",
    "Trustworthy reliable. Perfect service!",
    "Diamonds in 30 seconds. Incredible!",
    "Best gaming service. Fast secure!",
    "Got 1500 Robux instantly. Happy!",
    "Free Fire top-up instant. Perfect!",
    "PUBG UC delivered immediately!",
    "Mobile Legends diamonds instant!",
    "Fast reliable affordable. Best!",
    "Weekly pass seconds. Amazing!",
    "Secure instant. Highly recommended!",
    "Monthly pass instant. Perfect!",
    "Excellent support fast. 5 stars!",
    "Got 500 Robux instantly. Great!",
    "Free Fire diamonds fast. Love it!",
    "PUBG UC instant delivery!",
    "Mobile Legends top-up fast!",
    "Fast delivery best prices!",
    "Elite Weekly instantly. Great!",
    "Trustworthy reliable. Perfect!",
    "Diamonds under 30 seconds!",
    "Best gaming top-up. Secure!",
    "Got 400 Robux instantly. Amazing!",
    "Free Fire top-up was perfect!",
    "PUBG UC delivered instantly!",
    "Mobile Legends diamonds fast!",
    "Fast reliable affordable. Excellent!",
    "Weekly pass in seconds. Perfect!",
    "Secure instant delivery. Great!",
    "Monthly pass arrived fast. Love it!",
    "Excellent support fast delivery!",
    "Got 2500 Robux instantly. Perfect!",
    "Free Fire diamonds super fast. Great!",
    "PUBG UC instant. No waiting!",
    "Mobile Legends top-up fast. Perfect!",
    "Fast delivery best prices. Amazing!",
    "Elite Weekly instantly. Excellent!",
    "Trustworthy reliable. Perfect service!",
    "Diamonds in 30 seconds. Incredible!",
    "Best gaming service. Fast secure!",
    "Got 1800 Robux instantly. Happy!",
    "Free Fire top-up instant. Perfect!",
    "PUBG UC delivered immediately!",
    "Mobile Legends diamonds instant!",
    "Fast reliable affordable. Best!",
    "Weekly pass seconds. Amazing!",
    "Secure instant. Highly recommended!",
    "Monthly pass instant. Perfect!",
    "Excellent support fast. 5 stars!",
    "Got 1200 Robux instantly. Great!",
    "Free Fire diamonds fast. Love it!",
    "PUBG UC instant delivery!",
    "Mobile Legends top-up fast!",
    "Fast delivery best prices!",
    "Elite Weekly instantly. Great!",
    "Trustworthy reliable. Perfect!",
    "Diamonds under 30 seconds!",
    "Best gaming top-up. Secure!"
];

// Array of reviewers
const reviewers = [
    "CYBER NINJA",
    "Ram Sharma",
    "PIXEL WARRIOR",
    "Sita Thapa",
    "DIGITAL DEMON",
    "Krishna Gurung",
    "VIRTUAL VAMPIRE",
    "Laxmi Rai",
    "CODE CRUSADER",
    "Bishnu Tamang",
    "BYTE BUSTER",
    "Gita Lama",
    "GAMING GHOST",
    "Hari Bhattarai",
    "ELECTRONIC ELF",
    "Sunita Adhikari",
    "NETWORK NOMAD",
    "Narayan Joshi",
    "DATA DRAGON",
    "Maya Pandey",
    "CLOUD CRUSHER",
    "Dipak Karki",
    "ALGORITHM ASSASSIN",
    "Anjali Shrestha",
    "FIREWALL FIGHTER",
    "Prakash Magar",
    "BINARY BEAST",
    "Kumari Bhandari",
    "SERVER SLAYER",
    "Suresh Khadka",
    "CACHE CRUSADER",
    "Rekha Poudel",
    "ROUTER RANGER",
    "Mohan Acharya",
    "PACKET PIRATE",
    "Sarita Dhakal",
    "HACKER HERO",
    "Ramesh Thakuri",
    "VIRUS VANQUISHER",
    "Nirmala Basnet",
    "MALWARE MASTER",
    "Bikash Rana",
    "ENCRYPTION EXPERT",
    "Poonam Ghimire",
    "DEBUGGING DEMON",
    "Dinesh Maharjan",
    "SCRIPT SLAYER",
    "Manju Pokharel",
    "KERNEL KNIGHT",
    "Santosh Tiwari",
    "BOOTLOADER BOSS",
    "Kavita Rijal",
    "MEMORY MONSTER",
    "Ganesh Bhatta",
    "GPU GUARDIAN",
    "Shanti Khanal",
    "CPU CRUSADER",
    "Rajendra Shah",
    "RAM RANGER",
    "Indira Sapkota",
    "SSD SLAYER",
    "Umesh Neupane",
    "HDD HERO",
    "Binita Dahal",
    "OVERCLOCK ORACLE",
    "Chandra Paudel",
    "BIOS BEAST",
    "Nisha Gautam",
    "FIRMWARE FIGHTER",
    "Lokendra Thapa",
    "DRIVER DEMON",
    "Sabina Lama",
    "PATCH PIRATE",
    "Yogesh Gurung",
    "UPDATE UNICORN",
    "Anita Rai",
    "BACKUP BOSS",
    "Suman Tamang",
    "RESTORE RANGER",
    "Kiran Bhattarai",
    "SYNC SLAYER",
    "Rina Adhikari",
    "CLOUD CRUSADER",
    "Arjun Joshi",
    "STREAMING STORM",
    "Priya Pandey",
    "DOWNLOAD DEMON",
    "Nabin Karki",
    "UPLOAD UNICORN",
    "Saraswati Shrestha",
    "LATENCY LORD",
    "Madhav Magar",
    "PING PIRATE",
    "Kusum Bhandari",
    "BANDWIDTH BEAST",
    "Hemant Khadka",
    "THROUGHPUT THIEF",
    "Lila Poudel",
    "CONNECTION CRUSADER",
    "Suraj Acharya"
];

// Generate all 100 reviews
reviewsContainer.innerHTML = '';
for (let i = 0; i < 100; i++) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
        <p>${reviewTexts[i]}</p>
        <span class="reviewer">- ${reviewers[i]}</span>
    `;
    reviewsContainer.appendChild(reviewItem);
}

// Cycle through reviews one by one
let currentReviewIndex = 0;
const reviewItems = reviewsContainer.querySelectorAll('.review-item');

function showNextReview() {
    reviewItems.forEach((item, index) => {
        if (index === currentReviewIndex) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('show'), 10); // Small delay to trigger transition
        } else {
            item.classList.remove('show');
            setTimeout(() => {
                item.style.display = 'none';
            }, 500); // Match transition duration
        }
    });
    currentReviewIndex = (currentReviewIndex + 1) % 100;
}

showNextReview(); // Show first review
setInterval(showNextReview, 1500); // Change review every 1.5 seconds for faster, more attractive cycling



// 3D Tilt Effect for Reviews
function addTiltEffect() {
    const reviewItems = document.querySelectorAll('.review-item');

    reviewItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
}

addTiltEffect();

// Parallax Effect for Background Elements
function addParallaxEffect() {
    const reviewsSection = document.getElementById('reviews');
    const floatingElements = reviewsSection.querySelectorAll('.floating-element');
    const bgEffects = reviewsSection.querySelectorAll('.bg-effect');

    reviewsSection.addEventListener('mousemove', (e) => {
        const rect = reviewsSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / centerX;
        const moveY = (y - centerY) / centerY;

        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });

        bgEffects.forEach((effect, index) => {
            const speed = 0.3 + (index * 0.05);
            effect.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px) scale(1.2)`;
        });
    });

    reviewsSection.addEventListener('mouseleave', () => {
        floatingElements.forEach(element => {
            element.style.transform = '';
        });
        bgEffects.forEach(effect => {
            effect.style.transform = '';
        });
    });
}

addParallaxEffect();

// Functions
function showGameSection(gameKey) {
    const game = games[gameKey];
    gameTitle.textContent = game.name;
    priceList.innerHTML = '';

    game.prices.forEach(price => {
        const priceItem = document.createElement('div');
        priceItem.className = 'price-item';
        priceItem.innerHTML = `
            <div class="details">
                <strong>${price.amount}</strong> - ${price.price}
            </div>
            <button class="buy-btn" data-amount="${price.amount}" data-price="${price.price}">Buy</button>
        `;
        priceList.appendChild(priceItem);
    });

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => openBuyModal(gameKey, e.target.dataset.amount, e.target.dataset.price));
    });

    homepage.classList.add('hidden');
    reviewsContainer.closest('#reviews').classList.add('hidden');
    document.getElementById('support-care').classList.add('hidden');
    document.querySelector('footer').classList.add('hidden');
    gameSection.classList.remove('hidden');

    // Scroll to the top of the price list to show from first price
    priceList.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showDiamondList() {
    gameTitle.textContent = 'Diamond Packages';
    priceList.innerHTML = '';

    // Collect all diamond-related prices from all games
    const diamondPrices = [];
    Object.keys(games).forEach(gameKey => {
        const game = games[gameKey];
        game.prices.forEach(price => {
            if (price.amount.includes('Diamond') || price.amount.includes('💎') || gameKey === 'mobilelegends' || gameKey === 'freefire') {
                diamondPrices.push({
                    ...price,
                    gameName: game.name,
                    gameKey: gameKey
                });
            }
        });
    });

    diamondPrices.forEach(price => {
        const priceItem = document.createElement('div');
        priceItem.className = 'price-item';
        priceItem.innerHTML = `
            <div class="details">
                <strong>${price.gameName} - ${price.amount}</strong> - ${price.price}
            </div>
            <button class="buy-btn" data-game="${price.gameKey}" data-amount="${price.amount}" data-price="${price.price}">Buy</button>
        `;
        priceList.appendChild(priceItem);
    });

    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => openBuyModal(e.target.dataset.game, e.target.dataset.amount, e.target.dataset.price));
    });

    homepage.classList.add('hidden');
    reviewsContainer.closest('#reviews').classList.add('hidden');
    document.getElementById('support-care').classList.add('hidden');
    gameSection.classList.remove('hidden');
}

function showHomepage() {
    gameSection.classList.add('hidden');
    reviewsContainer.closest('#reviews').classList.remove('hidden');
    document.getElementById('support-care').classList.remove('hidden');
    homepage.classList.remove('hidden');
}

function openBuyModal(gameKey, amount, price) {
    const game = games[gameKey];
    document.getElementById('game-name').value = game ? game.name : 'Netflix';

    // Handle Netflix subscription
    if (gameKey === 'netflix') {
        // Change label to Type:
        document.querySelector('label[for="game-name"]').textContent = 'Type:';
        // Hide game-specific fields
        document.querySelector('label[for="price"]').style.display = 'none';
        document.getElementById('price').style.display = 'none';
        document.querySelector('label[for="uid"]').style.display = 'none';
        document.getElementById('uid').style.display = 'none';
        document.querySelector('label[for="screenshot"]').style.display = 'none';
        document.getElementById('screenshot').style.display = 'none';

        // Add package field for Netflix
        let packageLabel = document.querySelector('label[for="package"]');
        let packageInput = document.getElementById('package');
        if (!packageLabel) {
            packageLabel = document.createElement('label');
            packageLabel.setAttribute('for', 'package');
            packageLabel.textContent = 'Package:';
            packageInput = document.createElement('input');
            packageInput.type = 'text';
            packageInput.id = 'package';
            packageInput.name = 'package';
            packageInput.readOnly = true;
            packageInput.style.fontWeight = 'bold';
            packageInput.style.color = '#00ffff';
            packageInput.style.backgroundColor = '#f0f0f0';

            const gmailLabel = document.querySelector('label[for="gmail"]');
            gmailLabel.parentNode.insertBefore(packageLabel, gmailLabel);
            gmailLabel.parentNode.insertBefore(packageInput, gmailLabel);
        }
        packageInput.value = 'Rs 799 for single month';
        packageLabel.style.display = 'block';
        packageInput.style.display = 'block';

        // Add name field for Netflix
        let nameLabel = document.querySelector('label[for="name"]');
        let nameInput = document.getElementById('name');
        if (!nameLabel) {
            nameLabel = document.createElement('label');
            nameLabel.setAttribute('for', 'name');
            nameLabel.textContent = 'Name:';
            nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.id = 'name';
            nameInput.name = 'name';
            nameInput.required = true;
            nameInput.placeholder = 'Enter your name';

            const gmailLabel = document.querySelector('label[for="gmail"]');
            gmailLabel.parentNode.insertBefore(nameLabel, gmailLabel);
            gmailLabel.parentNode.insertBefore(nameInput, gmailLabel);
        }
        nameLabel.style.display = 'block';
        nameInput.style.display = 'block';

        // Add phone field for Netflix
        let phoneLabel = document.querySelector('label[for="phone"]');
        let phoneInput = document.getElementById('phone');
        if (!phoneLabel) {
            phoneLabel = document.createElement('label');
            phoneLabel.setAttribute('for', 'phone');
            phoneLabel.textContent = 'Phone Number:';
            phoneInput = document.createElement('input');
            phoneInput.type = 'tel';
            phoneInput.id = 'phone';
            phoneInput.name = 'phone';
            phoneInput.required = true;
            phoneInput.placeholder = 'Enter your phone number';

            const gmailLabel = document.querySelector('label[for="gmail"]');
            gmailLabel.parentNode.insertBefore(phoneLabel, gmailLabel);
            gmailLabel.parentNode.insertBefore(phoneInput, gmailLabel);
        }
        phoneLabel.style.display = 'block';
        phoneInput.style.display = 'block';

        // Hide QR section for Netflix
        document.querySelector('.qr-section').style.display = 'none';

        // Make screenshot not required for Netflix
        document.getElementById('screenshot').required = false;

        // Make UID not required for Netflix
        document.getElementById('uid').required = false;

        // Change modal title
        document.querySelector('#buy-modal h3').textContent = 'Get Netflix Subscription';
    } else {
        // Show game-specific fields
        document.querySelector('label[for="package"]').style.display = 'block';
        document.getElementById('package').style.display = 'block';
        document.querySelector('label[for="price"]').style.display = 'block';
        document.getElementById('price').style.display = 'block';
        document.querySelector('label[for="screenshot"]').style.display = 'block';
        document.getElementById('screenshot').style.display = 'block';

        // Hide name field if exists
        const nameLabel = document.querySelector('label[for="name"]');
        const nameInput = document.getElementById('name');
        if (nameLabel) {
            nameLabel.style.display = 'none';
            nameInput.style.display = 'none';
        }

        // Show QR section
        document.querySelector('.qr-section').style.display = 'block';

        // Change modal title back
        document.querySelector('#buy-modal h3').textContent = 'Complete Your Purchase';

        document.getElementById('package').value = amount;
        document.getElementById('price').value = price;

        // Hide UID for Roblox
        const uidLabel = document.querySelector('label[for="uid"]');
        const uidInput = document.getElementById('uid');
        if (gameKey === 'roblox') {
            uidLabel.style.display = 'none';
            uidInput.style.display = 'none';
            uidInput.required = false;
        } else {
            uidLabel.style.display = 'block';
            uidInput.style.display = 'block';
            uidInput.required = true;
        }
    }

    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Add QR download functionality when modal opens (only for games, not Netflix)
    if (gameKey !== 'netflix') {
        const downloadQrBtn = document.getElementById('download-qr');
        if (downloadQrBtn) {
            downloadQrBtn.addEventListener('click', () => {
                const qrImage = document.querySelector('.qr-code');
                if (qrImage) {
                    // Open the image in a new tab for manual saving
                    window.open(qrImage.src, '_blank');
                    alert('Image opened in new tab. Right-click (desktop) or long press (mobile) to save the image.');
                }
            });
        }
    }
}

function closeModal() {
    modal.classList.add('hidden');
    buyForm.reset();
    feedback.textContent = '';
    document.body.classList.remove('modal-open');
}

async function handleFormSubmit(e) {
    e.preventDefault();
    console.log('handleFormSubmit called');

    const formData = new FormData(buyForm);
    const gameName = formData.get('game-name');
    console.log('Game name:', gameName);

    if (gameName === 'Netflix') {
        alert('Form is being submitted Now after a minutes you will get id and password of netflix account via email THANK YOU😍👍 .');
        console.log('Processing Netflix form');
        // Handle Netflix subscription
        const data = {
            name: formData.get('name'),
            gmail: formData.get('gmail'),
            phone: formData.get('phone')
        };

        console.log('Submitting Netflix form with data:', data);

        // Basic validation for Netflix
        if (!data.name || !data.gmail || !data.phone) {
            feedback.textContent = 'Please fill in all required fields.';
            feedback.style.color = 'red';
            return;
        }

        // Send to Discord webhook for Netflix subscription
        const webhookURL = 'https://discord.com/api/webhooks/1463162639835205632/xmQOHPkRchi0PXeoaBF1NSVbXRSoqksFElQ5mJLblaieuvjYySTsEGY-5QL3I-XgnS1W';

        const embed = {
            embeds: [{
                title: 'New Netflix Subscription Request',
                fields: [
                    { name: 'Name', value: data.name, inline: true },
                    { name: 'Gmail', value: data.gmail, inline: true },
                    { name: 'Phone Number', value: data.phone, inline: true },
                    { name: 'Category', value: 'Netflix', inline: true },
                    { name: 'Price', value: 'Rs 799 for single month', inline: true }
                ],
                color: 0xe50914
            }]
        };

        try {
            console.log('Sending to webhook:', webhookURL);
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(embed)
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            if (response.ok) {
                feedback.textContent = 'Thank you for your order. We will contact you soon.';
                feedback.style.color = 'green';
                buyForm.reset();
                setTimeout(closeModal, 3000);
            } else {
                console.error('Webhook response not ok:', response.status, response.statusText);
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Error submitting Netflix form:', error);
            feedback.textContent = 'Failed to submit request. Please try again.';
            feedback.style.color = 'red';
        }
    } else {
        // Handle game top-up
        const data = {
            gameName: gameName,
            package: formData.get('package'),
            price: formData.get('price'),
            uid: formData.get('uid'),
            gmail: formData.get('gmail'),
            screenshot: formData.get('screenshot')
        };

        // Basic validation for games
        if (!data.gmail || !data.screenshot) {
            feedback.textContent = 'Please fill in all required fields.';
            feedback.style.color = 'red';
            return;
        }

        // Send to Discord webhook for game topup
        const webhookURL = 'https://discord.com/api/webhooks/1461093992807534774/h-yy7Y1WyNdy1IaQe-Ka0LYag9QEheeW0PIqDkZnvByjvAUxTxz_HV1l5K9bcxKtyi1e';

        const embed = {
            embeds: [{
                title: 'New Top-Up Order',
                fields: [
                    { name: 'Game', value: data.gameName, inline: true },
                    { name: 'Package', value: data.package, inline: true },
                    { name: 'Price', value: data.price, inline: true },
                    { name: 'UID', value: data.uid || 'N/A', inline: true },
                    { name: 'Gmail', value: data.gmail, inline: true }
                ],
                color: 0x00ff00
            }]
        };

        // Prepare FormData for webhook with file attachment
        const webhookData = new FormData();
        webhookData.append('payload_json', JSON.stringify(embed));
        webhookData.append('file', data.screenshot, 'payment_screenshot.png'); // Attach the file

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                body: webhookData
            });

            if (response.ok) {
                feedback.textContent = 'Order submitted successfully! We will process it shortly.';
                feedback.style.color = 'green';
                buyForm.reset();
                setTimeout(closeModal, 3000);
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            feedback.textContent = 'Failed to submit order. Please try again.';
            feedback.style.color = 'red';
        }
    }
}

async function handleSupportFormSubmit(e) {
    e.preventDefault();
    console.log('Support form submitted');

    const formData = new FormData(supportForm);
    const data = {
        phone: formData.get('support-phone'),
        gmail: formData.get('support-gmail'),
        message: formData.get('support-message')
    };
    console.log('Form data:', data);

    // Basic validation
    if (!data.phone || !data.gmail || !data.message) {
        supportFeedback.textContent = 'Please fill in all fields.';
        supportFeedback.style.color = 'red';
        return;
    }

    // Send to Discord webhook for support care
    const webhookURL = 'https://discord.com/api/webhooks/1463162639835205632/xmQOHPkRchi0PXeoaBF1NSVbXRSoqksFElQ5mJLblaieuvjYySTsEGY-5QL3I-XgnS1W';

    const embed = {
        embeds: [{
            title: 'New Support Message',
            fields: [
                { name: 'Phone Number', value: data.phone, inline: true },
                { name: 'Gmail', value: data.gmail, inline: true },
                { name: 'Message', value: data.message, inline: false }
            ],
            color: 0xff69b4
        }]
    };

    try {
        console.log('Sending to webhook:', webhookURL);
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(embed)
        });
        console.log('Response status:', response.status);

        if (response.ok) {
            supportFeedback.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            supportFeedback.style.color = 'green';
            supportForm.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        console.error('Error:', error);
        supportFeedback.textContent = 'Failed to send message. Please try again.';
        supportFeedback.style.color = 'red';
    }
}

 
  
 
