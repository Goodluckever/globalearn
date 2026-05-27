// =========================================
// CONFIG
// =========================================

const API_URL =
"https://globalearn-n1bu.onrender.com";

// =========================================
// BACKEND STATUS CHECK
// =========================================

const backendStatus =
document.getElementById("backend-status");

async function checkBackend() {

    if (!backendStatus) return;

    try {

        backendStatus.innerHTML =
        `
        <div class="server-online">
            Connecting to server...
        </div>
        `;

        const response =
        await fetch(API_URL);

        if (response.ok) {

            backendStatus.innerHTML =
            `
            <div class="server-online">
                🟢 Backend Connected
            </div>
            `;

        } else {

            backendStatus.innerHTML =
            `
            <div class="server-offline">
                🔴 Backend Offline
            </div>
            `;
        }

    } catch (error) {

        backendStatus.innerHTML =
        `
        <div class="server-offline">
            🔴 Server Unavailable
        </div>
        `;
    }
}

checkBackend();

// =========================================
// LANGUAGE SWITCHER
// =========================================

const languageSwitcher =
document.getElementById("languageSwitcher");

const heroTitle =
document.getElementById("heroTitle");

const heroText =
document.getElementById("heroText");

if (languageSwitcher) {

    languageSwitcher.addEventListener(
        "change",
        (e) => {

            const lang = e.target.value;

            if (lang === "fr") {

                heroTitle.innerText =
                "Tradez Crypto, Forex et Actions";

                heroText.innerText =
                "Accédez aux marchés mondiaux avec des outils premium.";

            }

            else if (lang === "es") {

                heroTitle.innerText =
                "Opera Cripto, Forex y Acciones";

                heroText.innerText =
                "Acceda a los mercados globales con herramientas premium.";

            }

            else if (lang === "ar") {

                heroTitle.innerText =
                "تداول العملات والأسهم والفوركس";

                heroText.innerText =
                "الوصول إلى الأسواق العالمية بأدوات احترافية.";

            }

            else {

                heroTitle.innerText =
                "Trade Crypto, Forex, Stocks & Global Markets";

                heroText.innerText =
                "Access premium trading tools, real-time market insights, educational resources, and advanced portfolio tracking through GlobalEarn Premium Brokerage.";
            }

        }
    );
}

// =========================================
// CURRENCY SWITCHER
// =========================================

const currencySwitcher =
document.getElementById(
"currencySwitcher"
);

if (currencySwitcher) {

    currencySwitcher.addEventListener(
        "change",
        () => {

            const selectedCurrency =
            currencySwitcher.value;

            localStorage.setItem(
                "currency",
                selectedCurrency
            );

            showNotification(
                `Currency changed to ${selectedCurrency}`
            );
        }
    );
}

// =========================================
// CTA BUTTONS
// =========================================

const openButtons =
document.querySelectorAll(
".primary-btn, .cta-btn, .plan-btn"
);

openButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            showNotification(
                "Redirecting to Dashboard..."
            );

            setTimeout(() => {

                window.location.href =
                "dashboard/dashboard.html";

            }, 1200);

        }
    );
});

// =========================================
// LIVE POPUP NOTIFICATIONS
// =========================================

const tradeActivities = [

"Michael from Canada opened a Gold trade",

"Sarah from UK monitored BTC market",

"David from Germany explored Forex market",

"Investor upgraded to Premium Plan",

"Trader monitored NASDAQ market",

"Client explored Stock Portfolio",

"Portfolio updated successfully",

"VIP trader explored Crypto markets",

"Trader accessed TradingView chart",

"Investor reviewed market insights"

];

function createTradePopup() {

    const popup =
    document.createElement("div");

    popup.className =
    "trade-popup";

    popup.innerHTML =
    `
    <strong>Live Activity</strong>
    <p>
    ${
        tradeActivities[
        Math.floor(
        Math.random()
        * tradeActivities.length
        )]
    }
    </p>
    `;

    document.body.appendChild(
        popup
    );

    setTimeout(() => {

        popup.classList.add(
            "show-popup"
        );

    }, 200);

    setTimeout(() => {

        popup.remove();

    }, 5000);
}

setInterval(
    createTradePopup,
    7000
);

// =========================================
// NOTIFICATION SYSTEM
// =========================================

function showNotification(message){

    const notification =
    document.createElement("div");

    notification.className =
    "notification-box";

    notification.innerText =
    message;

    document.body.appendChild(
        notification
    );

    setTimeout(() => {

        notification.classList.add(
            "show-notification"
        );

    }, 100);

    setTimeout(() => {

        notification.remove();

    }, 3500);
}

// =========================================
// FAQ AUTO CLOSE
// =========================================

const faqs =
document.querySelectorAll(
"details"
);

faqs.forEach((faq) => {

    faq.addEventListener(
        "toggle",
        () => {

            if (faq.open) {

                faqs.forEach((item) => {

                    if (
                        item !== faq
                    ) {
                        item.removeAttribute(
                            "open"
                        );
                    }

                });

            }

        }
    );
});

// =========================================
// MARKET TICKER PAUSE
// =========================================

const ticker =
document.querySelector(
".ticker-track"
);

if (ticker) {

    ticker.addEventListener(
        "mouseenter",
        () => {

            ticker.style.animationPlayState =
            "paused";
        }
    );

    ticker.addEventListener(
        "mouseleave",
        () => {

            ticker.style.animationPlayState =
            "running";
        }
    );
}

// =========================================
// MOBILE NAV TOGGLE
// =========================================

const navbar =
document.querySelector(
".navbar"
);

const navLinks =
document.querySelector(
".nav-links"
);

const mobileButton =
document.createElement(
"button"
);

mobileButton.innerHTML =
"☰";

mobileButton.className =
"mobile-menu";

if (navbar) {

    navbar.prepend(
        mobileButton
    );

    mobileButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show-menu"
            );

        }
    );
}
