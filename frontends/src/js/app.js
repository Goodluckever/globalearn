// =========================================
// GLOBAL CONFIG
// =========================================

const API_BASE_URL = "https://globalearn-nfmm.onrender.com";

// =========================================
// BACKEND CONNECTION STATUS
// =========================================

const API_BASE_URL = "https://globalearn-nfmm.onrender.com";

async function checkServerConnection() {
  const statusBox = document.getElementById("server-status");

  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();

    statusBox.innerHTML = "🟢 Backend Connected";
    console.log("Backend:", data);
  } catch (error) {
    statusBox.innerHTML = "🔴 Backend Offline";
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkServerConnection();
});

// =========================================
// LANGUAGE SWITCHER
// =========================================

function initLanguageSwitcher() {

    const languageSwitcher =
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
        !languageSwitcher ||
        !heroTitle ||
        !heroText
    ) return;

    languageSwitcher.addEventListener(
        "change",
        function () {

            const value = this.value;

            if (value === "fr") {

                heroTitle.textContent =
                    "Tradez Crypto, Forex, Actions et Marchés Mondiaux";

                heroText.textContent =
                    "Accédez aux outils de trading premium, analyses de marché et portefeuille avancé.";

            }

            else if (value === "es") {

                heroTitle.textContent =
                    "Opera Cripto, Forex, Acciones y Mercados Globales";

                heroText.textContent =
                    "Acceda a herramientas premium, educación financiera y monitoreo del mercado.";

            }

            else if (value === "ar") {

                heroTitle.textContent =
                    "تداول العملات الرقمية والفوركس والأسهم";

                heroText.textContent =
                    "منصة تداول احترافية مع أدوات سوق وتعليم وتحليلات متقدمة";

            }

            else {

                heroTitle.textContent =
                    "Trade Crypto, Forex, Stocks & Global Markets";

                heroText.textContent =
                    "Access premium trading tools, real-time market insights, educational resources, and advanced portfolio tracking through GlobalEarn Premium Brokerage.";
            }
        }
    );
}

// =========================================
// CURRENCY SWITCHER
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

                const raw =
                    parseInt(
                        price.dataset.usd
                    );

                if (!raw) return;

                let converted =
                    raw;

                let symbol =
                    "$";

                switch (currency) {

                    case "EUR":
                        converted =
                            raw * 0.92;
                        symbol = "€";
                        break;

                    case "GBP":
                        converted =
                            raw * 0.79;
                        symbol = "£";
                        break;

                    case "INR":
                        converted =
                            raw * 83;
                        symbol = "₹";
                        break;

                    case "AED":
                        converted =
                            raw * 3.67;
                        symbol = "AED ";
                        break;

                    default:
                        converted =
                            raw;
                        symbol = "$";
                }

                price.textContent =
                    symbol +
                    Math.round(converted)
                        .toLocaleString();
            });
        }
    );
}

// =========================================
// CTA BUTTONS
// =========================================

function initCTAButtons() {

    const primaryButtons =
        document.querySelectorAll(
            ".primary-btn"
        );

    const tierButtons =
        document.querySelectorAll(
            ".tier-btn"
        );

    primaryButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                window.location.href =
                    "dashboard/dashboard.html";
            }
        );
    });

    tierButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                alert(
                    "Redirecting to dashboard..."
                );

                window.location.href =
                    "dashboard/dashboard.html";
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
                    this.getAttribute("href");

                const target =
                    document.querySelector(
                        targetId
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    });
}

// =========================================
// INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkBackendStatus();

        initLanguageSwitcher();

        initCurrencySwitcher();

        initCTAButtons();

        initSmoothScroll();
    }
);
// =========================================
// LIVE TRADING POPUP NOTIFICATIONS
// =========================================

function initTradingPopup() {

    const traders = [

        "James from Canada opened BTC trade",
        "Sophia from Germany bought Gold",
        "Daniel from UAE opened Forex position",
        "Michael from UK invested in Nasdaq",
        "Emma from France opened ETH trade",
        "William from Australia bought Stocks",
        "Olivia from Singapore opened BTC trade",
        "Liam from USA opened Forex position",
        "Noah from South Africa invested in Gold",
        "Ava from Nigeria opened Crypto trade"

    ];

    const popup =
        document.createElement("div");

    popup.className =
        "live-trade-popup";

    document.body.appendChild(
        popup
    );

    function showPopup() {

        const randomTrade =
            traders[
                Math.floor(
                    Math.random() *
                    traders.length
                )
            ];

        popup.innerHTML = `
            <div class="popup-content">

                <div class="popup-dot"></div>

                <div>

                    <strong>
                        Live Market Activity
                    </strong>

                    <p>
                        ${randomTrade}
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

    showPopup();

    setInterval(
        showPopup,
        7000
    );
}

// =========================================
// FAQ IMPROVEMENTS
// =========================================

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-wrapper details"
        );

    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            function () {

                if (this.open) {

                    faqItems.forEach(
                        detail => {

                        if (
                            detail !== this
                        ) {

                            detail.open =
                                false;
                        }
                    });
                }
            }
        );
    });
}

// =========================================
// NAVBAR SCROLL EFFECT
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
                window.scrollY > 50
            ) {

                navbar.style.background =
                    "rgba(4,10,22,.95)";

                navbar.style.boxShadow =
                    "0 12px 35px rgba(0,0,0,.35)";
            }

            else {

                navbar.style.background =
                    "rgba(5,13,29,.75)";

                navbar.style.boxShadow =
                    "none";
            }
        }
    );
}

// =========================================
// PREMIUM SCROLL ANIMATIONS
// =========================================

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(
            ".product-card, .why-card, .tier-card, .testimonial-card, .story-card, .video-card, .stat-card"
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
                });

            },
            {
                threshold:0.15
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
// PAGE FADE TRANSITION
// =========================================

function initPageTransition() {

    document.body.style.opacity =
        "0";

    document.body.style.transition =
        "opacity .6s ease";

    setTimeout(() => {

        document.body.style.opacity =
            "1";

    },100);
}

// =========================================
// TICKER PAUSE ON HOVER
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
// APPEND TO INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTradingPopup();

        initFAQ();

        initNavbarEffects();

        initRevealAnimation();

        initPageTransition();

        initTickerInteraction();
    }
);
// =========================================
// MOBILE MENU SUPPORT
// =========================================

function initMobileMenu() {

    const navbar =
        document.querySelector(
            ".navbar"
        );

    const navLinks =
        document.querySelector(
            ".nav-links"
        );

    if (
        !navbar ||
        !navLinks
    ) return;

    let menuBtn =
        document.querySelector(
            ".menu-toggle"
        );

    if (!menuBtn) {

        menuBtn =
            document.createElement(
                "button"
            );

        menuBtn.className =
            "menu-toggle";

        menuBtn.innerHTML =
            "☰";

        navbar.prepend(
            menuBtn
        );
    }

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-active"
            );

            menuBtn.innerHTML =
                navLinks.classList.contains(
                    "mobile-active"
                )
                    ? "✕"
                    : "☰";
        }
    );
}

// =========================================
// PREMIUM HOVER INTERACTIONS
// =========================================

function initPremiumHoverEffects() {

    const cards =
        document.querySelectorAll(
            ".product-card, .why-card, .tier-card, .testimonial-card, .story-card, .video-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                card.style.background =
                    `
                    radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(80,140,255,.12),
                    rgba(15,28,55,.96)
                    )
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background =
                    `
                    linear-gradient(
                    180deg,
                    rgba(14,25,48,.98),
                    rgba(7,13,28,.98)
                    )
                    `;
            }
        );
    });
}

// =========================================
// PERFORMANCE OPTIMIZATION
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
// FINAL APP POLISH
// =========================================

function initFinalPolish() {

    console.log(
        "GlobalEarn Premium Loaded"
    );

    document.body.classList.add(
        "app-loaded"
    );
}

// =========================================
// APPEND TO INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initMobileMenu();

        initPremiumHoverEffects();

        lazyLoadIframes();

        initFinalPolish();
    }
);
// MOBILE NAVBAR TOGGLE

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
