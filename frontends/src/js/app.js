// =========================================
// GLOBAL CONFIG
// =========================================

const CONFIG = {
    API_BASE_URL:
        "https://globalearn-nfmm.onrender.com",

    DASHBOARD_URL:
        "dashboard/dashboard.html"
};

// =========================================
// DOM READY
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initBackendStatus();

        initSmoothScroll();

        initNavbarEffects();

        initMobileMenu();

        initCTAButtons();

        initTierButtons();

        initCurrencySwitcher();

        initLanguageSwitcher();

        console.log(
            "🚀 GlobalEarn Premium Loaded"
        );
    }
);

// =========================================
// BACKEND CONNECTION STATUS
// =========================================

async function initBackendStatus() {

    const statusBox =
        document.getElementById(
            "server-status"
        );

    if (!statusBox) return;

    try {

        const response =
            await fetch(
                `${CONFIG.API_BASE_URL}/api/health`
            );

        const data =
            await response.json();

        statusBox.innerHTML =
            `
            🟢 Backend Connected
            `;

        console.log(
            "Backend:",
            data
        );

    }

    catch (error) {

        statusBox.innerHTML =
            `
            🔴 Backend Offline
            `;

        console.error(error);
    }
}

// =========================================
// PREMIUM NAVBAR EFFECT
// =========================================

function initNavbarEffects() {

    const navbar =
        document.querySelector(
            ".navbar"
        );

    if (!navbar) return;

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 40
            ) {

                navbar.style.background =
                    "rgba(5,14,30,.95)";

                navbar.style.backdropFilter =
                    "blur(20px)";

                navbar.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,.35)";
            }

            else {

                navbar.style.background =
                    "rgba(2,15,45,.92)";

                navbar.style.boxShadow =
                    "none";
            }
        }
    );
}

// =========================================
// MOBILE MENU TOGGLE
// =========================================

function initMobileMenu() {

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const mobileMenu =
        document.querySelector(
            ".mobile-menu"
        );

    if (
        !menuToggle ||
        !mobileMenu
    ) return;

    menuToggle.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );

            menuToggle.innerHTML =
                mobileMenu.classList.contains(
                    "active"
                )
                    ? "✕"
                    : "☰";
        }
    );

    // auto close when link clicked

    const links =
        mobileMenu.querySelectorAll(
            "a"
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

                menuToggle.innerHTML =
                    "☰";
            }
        );
    });
}

// =========================================
// SMOOTH SCROLL
// =========================================

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                const targetId =
                    this.getAttribute(
                        "href"
                    );

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });
                }
            }
        );
    });
}

// =========================================
// PREMIUM CTA BUTTONS
// =========================================

function initCTAButtons() {

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .cta-primary-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                window.location.href =
                    CONFIG.DASHBOARD_URL;
            }
        );
    });

    const secondaryButtons =
        document.querySelectorAll(
            ".secondary-btn, .cta-secondary-btn"
        );

    secondaryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:
                        document.body.scrollHeight,

                    behavior:
                        "smooth"
                });
            }
        );
    });
}

// =========================================
// TRADING TIER BUTTONS
// =========================================

function initTierButtons() {

    const tierButtons =
        document.querySelectorAll(
            ".tier-btn"
        );

    tierButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                alert(
                    "Opening Trading Dashboard..."
                );

                window.location.href =
                    CONFIG.DASHBOARD_URL;
            }
        );
    });
}

// =========================================
// PREMIUM CURRENCY SWITCHER
// =========================================

function initCurrencySwitcher() {

    const switcher =
        document.getElementById(
            "currencySwitcher"
        );

    if (!switcher) return;

    switcher.addEventListener(
        "change",
        function () {

            const currency =
                this.value;

            const prices =
                document.querySelectorAll(
                    ".tier-price"
                );

            prices.forEach(price => {

                const usd =
                    Number(
                        price.dataset.usd
                    );

                if (!usd) return;

                let converted =
                    usd;

                let symbol =
                    "$";

                switch (currency) {

                    case "EUR":

                        converted =
                            usd * 0.92;

                        symbol = "€";

                        break;

                    case "GBP":

                        converted =
                            usd * 0.79;

                        symbol = "£";

                        break;

                    case "INR":

                        converted =
                            usd * 83;

                        symbol = "₹";

                        break;

                    case "AED":

                        converted =
                            usd * 3.67;

                        symbol =
                            "AED ";

                        break;
                }

                price.textContent =
                    symbol +
                    Math.round(
                        converted
                    ).toLocaleString();
            });
        }
    );
}

// =========================================
// LANGUAGE SWITCHER
// =========================================

function initLanguageSwitcher() {

    const switcher =
        document.getElementById(
            "languageSwitcher"
        );

    const heroTitle =
        document.getElementById(
            "heroTitle"
        );

    const heroText =
        document.getElementById(
            "heroText"
        );

    if (
        !switcher ||
        !heroTitle ||
        !heroText
    ) return;

    switcher.addEventListener(
        "change",
        function () {

            const lang =
                this.value;

            switch (lang) {

                case "fr":

                    heroTitle.textContent =
                        "Tradez Crypto, Forex et Actions";

                    heroText.textContent =
                        "Accédez à une plateforme professionnelle de trading mondiale.";

                    break;

                case "es":

                    heroTitle.textContent =
                        "Opera Cripto, Forex y Acciones";

                    heroText.textContent =
                        "Accede a una plataforma profesional de trading.";

                    break;

                case "ar":

                    heroTitle.textContent =
                        "تداول العملات الرقمية والفوركس والأسهم";

                    heroText.textContent =
                        "منصة تداول عالمية احترافية";

                    break;

                default:

                    heroTitle.textContent =
                        "Trade Crypto, Forex, Stocks & Global Markets";

                    heroText.textContent =
                        "Access premium trading tools, live market insights, advanced portfolio tracking and professional investment opportunities.";
            }
        }
    );
}
// =========================================
// PREMIUM LIVE TRADE POPUP
// =========================================

function initTradingPopup() {

    const traders = [

        "James from United Kingdom",
        "Michael from Canada",
        "Sophia from Germany",
        "David from Australia",
        "Emma from France",
        "John from USA",
        "Daniel from India",
        "Oliver from Spain",
        "Ethan from Italy",
        "Noah from UAE",
        "Lucas from Singapore",
        "Benjamin from South Africa"

    ];

    const trades = [

        "Earned $2,450 trading BTC/USD",
        "Earned $4,120 trading Gold",
        "Earned $1,950 trading EUR/USD",
        "Earned $8,240 trading ETH/USD",
        "Earned $3,870 trading Nasdaq",
        "Earned $6,430 trading Oil",
        "Earned $2,100 trading XRP/USD",
        "Earned $5,940 trading Stocks",
        "Earned $7,600 trading Bitcoin",
        "Earned $9,230 trading Forex",
        "Earned $3,180 trading S&P 500",
        "Earned $5,720 trading SOL/USD"

    ];

    let popup =
        document.querySelector(
            ".live-trade-popup"
        );

    // create popup if missing

    if (!popup) {

        popup =
            document.createElement(
                "div"
            );

        popup.className =
            "live-trade-popup";

        document.body.appendChild(
            popup
        );
    }

    function showPopup() {

        const user =
            traders[
                Math.floor(
                    Math.random() *
                    traders.length
                )
            ];

        const trade =
            trades[
                Math.floor(
                    Math.random() *
                    trades.length
                )
            ];

        popup.innerHTML = `

            <div class="popup-content">

                <div class="popup-dot"></div>

                <div>

                    <strong>
                        Live Trade Activity
                    </strong>

                    <p>
                        ${user}
                    </p>

                    <p>
                        ${trade}
                    </p>

                </div>

            </div>

        `;

        popup.classList.add(
            "show-popup"
        );

        setTimeout(() => {

            popup.classList.remove(
                "show-popup"
            );

        }, 4000);
    }

    // first popup

    setTimeout(
        showPopup,
        2500
    );

    // repeat popup

    setInterval(
        showPopup,
        7000
    );
}

// =========================================
// FAQ ACCORDION
// =========================================

function initFAQ() {

    const items =
        document.querySelectorAll(
            ".faq-wrapper details"
        );

    if (!items.length) return;

    items.forEach(item => {

        item.addEventListener(
            "toggle",
            function () {

                if (this.open) {

                    items.forEach(
                        detail => {

                            if (
                                detail !==
                                this
                            ) {

                                detail.open =
                                    false;
                            }
                        }
                    );
                }
            }
        );
    });
}

// =========================================
// PREMIUM REVEAL ANIMATION
// =========================================

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(
            `
            .product-card,
            .tier-card,
            .why-card,
            .story-card,
            .testimonial-card,
            .stat-card,
            .video-card,
            .legal-card
            `
        );

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show-element"
                            );
                        }
                    }
                );
            },

            {
                threshold: 0.15
            }
        );

    elements.forEach(el => {

        el.classList.add(
            "hidden-element"
        );

        observer.observe(el);
    });
}

// =========================================
// MARKET TICKER INTERACTION
// =========================================

function initTickerInteraction() {

    const ticker =
        document.querySelector(
            ".ticker-track"
        );

    if (!ticker) return;

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
// PREMIUM CARD HOVER EFFECT
// =========================================

function initPremiumHoverEffects() {

    const cards =
        document.querySelectorAll(

            `
            .product-card,
            .tier-card,
            .why-card,
            .story-card,
            .testimonial-card,
            .stat-card
            `
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                card.style.background =

                    `
                    radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(45,126,255,.14),
                    rgba(8,20,45,.98)
                    )
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";
            }
        );
    });
}

// =========================================
// PAGE FADE ANIMATION
// =========================================

function initPageTransition() {

    document.body.style.opacity =
        "0";

    document.body.style.transition =
        "opacity .6s ease";

    setTimeout(() => {

        document.body.style.opacity =
            "1";

    }, 150);
}

// =========================================
// LAZY LOAD IFRAMES
// =========================================

function lazyLoadIframes() {

    const iframes =
        document.querySelectorAll(
            "iframe"
        );

    iframes.forEach(frame => {

        frame.setAttribute(
            "loading",
            "lazy"
        );
    });
}

// =========================================
// AUTO INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTradingPopup();

        initFAQ();

        initRevealAnimation();

        initTickerInteraction();

        initPremiumHoverEffects();

        initPageTransition();

        lazyLoadIframes();
    }
);
// =========================================
// LIVE MARKET TICKER UPDATE
// =========================================

async function initMarketTicker() {

    const ticker =
        document.querySelector(
            ".ticker-track"
        );

    if (!ticker) return;

    try {

        const response =
            await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,cardano&vs_currencies=usd"
            );

        const data =
            await response.json();

        ticker.innerHTML = `

        <span>
        BTC/USD:
        $${data.bitcoin.usd}
        ▲
        </span>

        <span>
        ETH/USD:
        $${data.ethereum.usd}
        ▲
        </span>

        <span>
        SOL/USD:
        $${data.solana.usd}
        ▲
        </span>

        <span>
        XRP/USD:
        $${data.ripple.usd}
        ▲
        </span>

        <span>
        ADA/USD:
        $${data.cardano.usd}
        ▲
        </span>

        <span>
        GOLD:
        $3340 ▲
        </span>

        <span>
        NASDAQ:
        21,980 ▲
        </span>

        `;
    }

    catch (error) {

        console.error(
            "Ticker failed:",
            error
        );
    }
}

// auto refresh ticker

setInterval(
    initMarketTicker,
    30000
);

// =========================================
// TRADINGVIEW CHART AUTO LOAD
// =========================================

function initTradingView() {

    const chart =
        document.getElementById(
            "tradingview_chart"
        );

    if (!chart) return;

    if (
        window.TradingView
    ) {

        new TradingView.widget({

            width: "100%",
            height: 620,

            symbol:
                "BINANCE:BTCUSDT",

            interval: "30",

            timezone:
                "Etc/UTC",

            theme: "dark",

            style: "1",

            locale: "en",

            enable_publishing:
                false,

            hide_top_toolbar:
                false,

            allow_symbol_change:
                true,

            container_id:
                "tradingview_chart"
        });
    }
}

// =========================================
// BACKEND HEALTH REFRESH
// =========================================

function refreshBackendStatus() {

    setInterval(
        async () => {

            const status =
                document.getElementById(
                    "server-status"
                );

            if (!status) return;

            try {

                await fetch(
                    `${CONFIG.API_BASE_URL}/api/health`
                );

                status.innerHTML =
                    `
                    🟢 Backend Connected
                    `;

            }

            catch {

                status.innerHTML =
                    `
                    🔴 Backend Offline
                    `;
            }

        },

        20000
    );
}

// =========================================
// PREMIUM COUNTER ANIMATION
// =========================================

function animateCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.counter
            );

        let current = 0;

        const speed =
            target / 100;

        function update() {

            current += speed;

            if (
                current < target
            ) {

                counter.innerText =
                    Math.floor(
                        current
                    ).toLocaleString();

                requestAnimationFrame(
                    update
                );
            }

            else {

                counter.innerText =
                    target.toLocaleString();
            }
        }

        update();
    });
}

// =========================================
// CTA STATS AUTO COUNT
// =========================================

function initCTAStats() {

    const stats =
        document.querySelectorAll(
            ".cta-stat h3"
        );

    stats.forEach(stat => {

        const number =
            parseInt(
                stat.innerText
                    .replace(/\D/g, "")
            );

        if (!number) return;

        let count = 0;

        const speed =
            number / 80;

        function update() {

            count += speed;

            if (
                count < number
            ) {

                stat.innerText =
                    Math.floor(
                        count
                    ) + "+";

                requestAnimationFrame(
                    update
                );
            }

            else {

                stat.innerText =
                    number + "+";
            }
        }

        update();
    });
}

// =========================================
// MOBILE OPTIMIZATION
// =========================================

function mobileFixes() {

    const menu =
        document.querySelector(
            ".mobile-menu"
        );

    if (
        window.innerWidth <
        768
    ) {

        document.body.style
            .overflowX =
            "hidden";

        if (menu) {

            menu.style.top =
                "115px";
        }
    }
}

// =========================================
// WINDOW RESIZE FIX
// =========================================

function resizeFix() {

    window.addEventListener(
        "resize",
        () => {

            mobileFixes();
        }
    );
}

// =========================================
// FINAL APP OPTIMIZATION
// =========================================

function initFinalPolish() {

    console.log(
        "✅ GlobalEarn Premium Binance Style Ready"
    );

    document.body.classList.add(
        "app-loaded"
    );
}

// =========================================
// FINAL INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initMarketTicker();

        initTradingView();

        refreshBackendStatus();

        animateCounters();

        initCTAStats();

        mobileFixes();

        resizeFix();

        initFinalPolish();
    }
);
