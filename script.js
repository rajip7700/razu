// Game data
const games = {
    mobilelegends: {
        name: 'Mobile Legends Diamonds',
        prices: [
            { amount: '55💎', price: 'Rs.160' },
            { amount: '86💎', price: 'Rs.215' },
            { amount: '172💎', price: 'Rs.400' },
            { amount: '257💎', price: 'Rs.600' },
            { amount: '344💎', price: 'Rs.860' },
            { amount: '429💎', price: 'Rs.1075' },
            { amount: '514💎', price: 'Rs.1200' },
            { amount: '706💎', price: 'Rs.1500' },
            { amount: '878💎', price: 'Rs.2195' },
            { amount: '963💎', price: 'Rs.2408' },
            { amount: '1050💎', price: 'Rs.2625' },
            { amount: '1412💎', price: 'Rs.2950' },
            { amount: 'Weekly Pass', price: 'Rs.215' },
            { amount: 'Monthly Pass', price: 'Rs.645' }
        ]
    },
    roblox: {
        name: 'Roblox Robux',
        prices: [
            { amount: '300⟐', price: 'Rs.700' },
            { amount: '400⟐', price: 'Rs.1000' },
            { amount: '500⟐', price: 'Rs.1250' },
            { amount: '800⟐', price: 'Rs.2000' },
            { amount: '1000⟐', price: 'Rs.2500' },
            { amount: '1500⟐', price: 'Rs.3750' },
            { amount: '2000⟐', price: 'Rs.5000' },
            { amount: '3000⟐', price: 'Rs.5500' }
        ]
    },
    freefire: {
        name: 'Free Fire Diamonds',
        prices: [
            { amount: '50💎', price: 'Rs.65' },
            { amount: '115💎', price: 'Rs.105' },
            { amount: '240💎', price: 'Rs.200' },
            { amount: '355💎', price: 'Rs.300' },
            { amount: '480💎', price: 'Rs.400' },
            { amount: '610💎', price: 'Rs.500' },
            { amount: '725💎', price: 'Rs.610' },
            { amount: '850💎', price: 'Rs.720' },
            { amount: '965💎', price: 'Rs.830' },
            { amount: '1090💎', price: 'Rs.910' },
            { amount: '1240💎', price: 'Rs.1000' },
            { amount: '1480💎', price: 'Rs.1220' },
            { amount: '1720💎', price: 'Rs.1420' },
            { amount: '1850💎', price: 'Rs.1500' },
            { amount: '2090💎', price: 'Rs.1710' },
            { amount: '2530💎', price: 'Rs.2000' },
            { amount: '5060💎', price: 'Rs.4000' },
            { amount: '10120💎', price: 'Rs.8000' },
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
    item.addEventListener('click', () => showGameSection(item.dataset.game));
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
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 100); // Show loading for 0.1 seconds

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Set default theme to light
    body.classList.add('light-theme');

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.textContent = '☀️ Light';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.textContent = '🌙 Dark';
            localStorage.setItem('theme', 'light');
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ Light';
    } else {
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙 Dark';
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

createParticles();

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
    "PANEL USER",
    "GAME MASTER",
    "PRO PLAYER",
    "MOBILE GAMER",
    "NIGHT OWL",
    "GAMING PRO",
    "ROBLOX FAN",
    "FF PLAYER",
    "BATTLE ROYAL",
    "MOBILE LEGEND",
    "GAMING ADDICT",
    "WEEKLY GAMER",
    "SAFE PLAYER",
    "MONTHLY SUB",
    "SUPPORTED USER",
    "ROBUX BUYER",
    "DIAMOND HUNTER",
    "UC BUYER",
    "ML PLAYER",
    "REGULAR CUSTOMER",
    "ELITE GAMER",
    "TRUSTED USER",
    "SPEED USER",
    "GAMING EXPERT",
    "ROBLOX PRO",
    "FF EXPERT",
    "PUBG PLAYER",
    "LEGEND PLAYER",
    "HAPPY GAMER",
    "WEEKLY BUYER",
    "SECURE USER",
    "MONTHLY GAMER",
    "SUPPORT FAN",
    "ROBUX FAN",
    "DIAMOND FAN",
    "UC FAN",
    "ML FAN",
    "REGULAR FAN",
    "ELITE FAN",
    "TRUST FAN",
    "SPEED FAN",
    "EXPERT FAN",
    "ROBLOX FAN 2",
    "FF FAN 2",
    "PUBG FAN 2",
    "LEGEND FAN 2",
    "HAPPY FAN 2",
    "WEEKLY FAN 2",
    "SECURE FAN 2",
    "MONTHLY FAN 2",
    "SUPPORT FAN 2",
    "ROBUX FAN 2",
    "DIAMOND FAN 2",
    "UC FAN 2",
    "ML FAN 2",
    "REGULAR FAN 2",
    "ELITE FAN 2",
    "TRUST FAN 2",
    "SPEED FAN 2",
    "EXPERT FAN 2",
    "ROBLOX FAN 3",
    "FF FAN 3",
    "PUBG FAN 3",
    "LEGEND FAN 3",
    "HAPPY FAN 3",
    "WEEKLY FAN 3",
    "SECURE FAN 3",
    "MONTHLY FAN 3",
    "SUPPORT FAN 3",
    "ROBUX FAN 3",
    "DIAMOND FAN 3",
    "UC FAN 3",
    "ML FAN 3",
    "REGULAR FAN 3",
    "ELITE FAN 3",
    "TRUST FAN 3",
    "SPEED FAN 3",
    "EXPERT FAN 3",
    "ROBLOX FAN 4",
    "FF FAN 4",
    "PUBG FAN 4",
    "LEGEND FAN 4",
    "HAPPY FAN 4",
    "WEEKLY FAN 4",
    "SECURE FAN 4",
    "MONTHLY FAN 4",
    "SUPPORT FAN 4",
    "ROBUX FAN 4",
    "DIAMOND FAN 4",
    "UC FAN 4",
    "ML FAN 4",
    "REGULAR FAN 4",
    "ELITE FAN 4",
    "TRUST FAN 4",
    "SPEED FAN 4",
    "EXPERT FAN 4",
    "ROBUX FAN 5",
    "FF FAN 5",
    "PUBG FAN 5",
    "LEGEND FAN 5",
    "HAPPY FAN 5",
    "WEEKLY FAN 5",
    "SECURE FAN 5",
    "MONTHLY FAN 5",
    "SUPPORT FAN 5",
    "ROBUX FAN 6",
    "DIAMOND FAN 5",
    "UC FAN 5",
    "ML FAN 5",
    "REGULAR FAN 5",
    "ELITE FAN 5",
    "TRUST FAN 5",
    "SPEED FAN 5",
    "EXPERT FAN 5",
    "ROBUX FAN 7",
    "FF FAN 6",
    "PUBG FAN 6",
    "LEGEND FAN 6",
    "HAPPY FAN 6",
    "WEEKLY FAN 6",
    "SECURE FAN 6",
    "MONTHLY FAN 6",
    "SUPPORT FAN 6",
    "ROBUX FAN 8",
    "DIAMOND FAN 6",
    "UC FAN 6",
    "ML FAN 6",
    "REGULAR FAN 6",
    "ELITE FAN 6",
    "TRUST FAN 6",
    "SPEED FAN 6",
    "EXPERT FAN 6",
    "ROBUX FAN 9",
    "FF FAN 7",
    "PUBG FAN 7",
    "LEGEND FAN 7",
    "HAPPY FAN 7",
    "WEEKLY FAN 7",
    "SECURE FAN 7",
    "MONTHLY FAN 7",
    "SUPPORT FAN 7",
    "ROBUX FAN 10",
    "DIAMOND FAN 7",
    "UC FAN 7",
    "ML FAN 7",
    "REGULAR FAN 7",
    "ELITE FAN 7",
    "TRUST FAN 7",
    "SPEED FAN 7",
    "EXPERT FAN 7",
    "ROBUX FAN 11",
    "FF FAN 8",
    "PUBG FAN 8",
    "LEGEND FAN 8",
    "HAPPY FAN 8",
    "WEEKLY FAN 8",
    "SECURE FAN 8",
    "MONTHLY FAN 8",
    "SUPPORT FAN 8",
    "ROBUX FAN 12",
    "DIAMOND FAN 8",
    "UC FAN 8",
    "ML FAN 8",
    "REGULAR FAN 8",
    "ELITE FAN 8",
    "TRUST FAN 8",
    "SPEED FAN 8",
    "EXPERT FAN 8",
    "ROBUX FAN 13",
    "FF FAN 9",
    "PUBG FAN 9",
    "LEGEND FAN 9",
    "HAPPY FAN 9",
    "WEEKLY FAN 9",
    "SECURE FAN 9",
    "MONTHLY FAN 9",
    "SUPPORT FAN 9",
    "ROBUX FAN 14",
    "DIAMOND FAN 9",
    "UC FAN 9",
    "ML FAN 9",
    "REGULAR FAN 9",
    "ELITE FAN 9",
    "TRUST FAN 9",
    "SPEED FAN 9",
    "EXPERT FAN 9",
    "ROBUX FAN 15",
    "FF FAN 10",
    "PUBG FAN 10",
    "LEGEND FAN 10",
    "HAPPY FAN 10",
    "WEEKLY FAN 10",
    "SECURE FAN 10",
    "MONTHLY FAN 10",
    "SUPPORT FAN 10",
    "ROBUX FAN 16",
    "DIAMOND FAN 10",
    "UC FAN 10",
    "ML FAN 10",
    "REGULAR FAN 10",
    "ELITE FAN 10",
    "TRUST FAN 10",
    "SPEED FAN 10",
    "EXPERT FAN 10"
];

// Generate all 100 reviews
reviewsContainer.innerHTML = '';
for (let i = 0; i < 100; i++) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    const stars = '★★★★★'.split('').map(star => `<span class="star">${star}</span>`).join('');
    reviewItem.innerHTML = `
        <div class="review-stars">${stars}</div>
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
    document.getElementById('game-name').value = game.name;
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

    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    buyForm.reset();
    feedback.textContent = '';
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(buyForm);
    const data = {
        gameName: formData.get('game-name'),
        package: formData.get('package'),
        price: formData.get('price'),
        uid: formData.get('uid'),
        gmail: formData.get('gmail'),
        screenshot: formData.get('screenshot')
    };

    // Basic validation
    if (!data.gmail || !data.screenshot) {
        feedback.textContent = 'Please fill in all required fields.';
        feedback.style.color = 'red';
        return;
    }

    // Send to Discord webhook for diamond topup
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
            title: 'New Support Message 💖',
            fields: [
                { name: 'Phone Number 📱', value: data.phone, inline: true },
                { name: 'Gmail 📧', value: data.gmail, inline: true },
                { name: 'Message 💌', value: data.message, inline: false }
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
            supportFeedback.textContent = 'Message sent successfully! We\'ll get back to you soon. 🌸';
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

 
 
