// =========================================
// GLOBAL CONFIG
// =========================================

const API_BASE_URL =
"https://globalearn-nfmm.onrender.com";

/* =========================
BACKEND STATUS
========================= */

async function checkBackendStatus(){

    const status =
    document.getElementById(
        "backend-status"
    );

    if(!status) return;

    try{

        const response =
        await fetch(
            `${API_BASE_URL}/api/health`
        );

        const data =
        await response.json();

        console.log(data);

        status.innerHTML =
        "🟢 Backend Connected";

    }

    catch(error){

        console.error(error);

        status.innerHTML =
        "🔴 Backend Offline";
    }
}

/* =========================
PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkBackendStatus();

    }
);
// =========================================
// LANGUAGE SWITCHER
// =========================================

function initLanguageSwitcher(){

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

    if(
        !switcher ||
        !heroTitle ||
        !heroText
    ) return;

    const translations = {

        en:{
            title:
            "Trade Crypto, Forex, Stocks & Global Markets",

            text:
            "Access premium trading tools, real-time market insights, educational resources, and advanced portfolio tracking through GlobalEarn Premium Brokerage."
        },

        fr:{
            title:
            "Tradez Crypto, Forex, Actions et Marchés Mondiaux",

            text:
            "Accédez aux outils de trading premium, analyses du marché et portefeuille avancé."
        },

        es:{
            title:
            "Opera Cripto, Forex, Acciones y Mercados Globales",

            text:
            "Acceda a herramientas premium, educación financiera y monitoreo del mercado."
        },

        ar:{
            title:
            "تداول العملات الرقمية والفوركس والأسهم",

            text:
            "منصة تداول احترافية مع أدوات وتحليلات سوق متقدمة."
        }
    };

    switcher.addEventListener(
        "change",
        function(){

            const lang =
                translations[
                    this.value
                ] ||
                translations.en;

            heroTitle.textContent =
                lang.title;

            heroText.textContent =
                lang.text;
        }
    );
}

// =========================================
// CURRENCY SWITCHER
// =========================================

function initCurrencySwitcher(){

    const switcher =
        document.getElementById(
            "currencySwitcher"
        );

    if(!switcher) return;

    const rates = {

        USD:{
            symbol:"$",
            rate:1
        },

        EUR:{
            symbol:"€",
            rate:0.92
        },

        GBP:{
            symbol:"£",
            rate:0.79
        },

        INR:{
            symbol:"₹",
            rate:83
        },

        AED:{
            symbol:"AED ",
            rate:3.67
        },

        NGN:{
            symbol:"₦",
            rate:1600
        }
    };

    switcher.addEventListener(
        "change",
        function(){

            const selected =
                rates[this.value];

            document
            .querySelectorAll(
                ".tier-price"
            )
            .forEach(price=>{

                const usd =
                    Number(
                        price.dataset.usd
                    );

                if(!usd) return;

                const total =
                    Math.round(
                        usd *
                        selected.rate
                    );

                price.textContent =
                    selected.symbol +
                    total.toLocaleString();
            });
        }
    );
}

// =========================================
// CTA BUTTONS
// =========================================

function initCTAButtons(){

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .tier-btn"
        );

    buttons.forEach(button=>{

        button.addEventListener(
            "click",
            ()=>{

                window.location.href =
                    "dashboard/dashboard.html";
            }
        );
    });
}

// =========================================
// SMOOTH SCROLL
// =========================================

function initSmoothScroll(){

    document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link=>{

        link.addEventListener(
            "click",
            function(e){

                const id =
                    this.getAttribute(
                        "href"
                    );

                if(
                    !id ||
                    id === "#"
                ) return;

                e.preventDefault();

                const section =
                    document.querySelector(
                        id
                    );

                if(section){

                    section.scrollIntoView({
                        behavior:"smooth"
                    });
                }
            }
        );
    });
}

// =========================================
// MOBILE MENU TOGGLE
// =========================================

function initMobileMenu(){

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );

    if(
        !menuToggle ||
        !mobileMenu
    ) return;

    menuToggle.addEventListener(
        "click",
        ()=>{

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

    document
    .querySelectorAll(
        "#mobileMenu a"
    )
    .forEach(link=>{

        link.addEventListener(
            "click",
            ()=>{

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
// LIVE TRADE POPUP
// =========================================

function initTradingPopup(){

    const popup =
        document.getElementById(
            "tradePopup"
        );

    const popupUser =
        document.getElementById(
            "popupUser"
        );

    const popupTrade =
        document.getElementById(
            "popupTrade"
        );

    if(
        !popup ||
        !popupUser ||
        !popupTrade
    ) return;

    const traders = [

        "James from UK",
        "Michael from Canada",
        "Sophia from Germany",
        "David from Australia",
        "Emma from France",
        "Daniel from Nigeria",
        "John from USA",
        "Noah from UAE"
    ];

    const trades = [

        "Earned $2,450 trading BTC/USD",
        "Earned $4,200 trading Gold",
        "Earned $3,850 trading EUR/USD",
        "Earned $6,940 trading ETH/USD",
        "Earned $2,980 trading Nasdaq",
        "Earned $8,120 trading Oil",
        "Earned $5,430 trading XRP/USD"
    ];

    function showPopup(){

        popupUser.textContent =
            traders[
                Math.floor(
                    Math.random() *
                    traders.length
                )
            ];

        popupTrade.textContent =
            trades[
                Math.floor(
                    Math.random() *
                    trades.length
                )
            ];

        popup.classList.add(
            "show-popup"
        );

        setTimeout(()=>{

            popup.classList.remove(
                "show-popup"
            );

        },4000);
    }

    setTimeout(
        showPopup,
        2000
    );

    setInterval(
        showPopup,
        7000
    );
}

// =========================================
// FAQ ACCORDION
// =========================================

function initFAQ(){

    const items =
        document.querySelectorAll(
            ".faq-wrapper details"
        );

    items.forEach(item=>{

        item.addEventListener(
            "toggle",
            function(){

                if(this.open){

                    items.forEach(
                        detail=>{

                        if(
                            detail !== this
                        ){

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
// NAVBAR EFFECT
// =========================================

function initNavbarEffects(){

    const navbar =
        document.querySelector(
            ".navbar"
        );

    if(!navbar) return;

    window.addEventListener(
        "scroll",
        ()=>{

            if(
                window.scrollY > 50
            ){

                navbar.style.background =
                    "rgba(4,14,45,.96)";

                navbar.style.boxShadow =
                    "0 10px 35px rgba(0,0,0,.35)";
            }

            else{

                navbar.style.background =
                    "rgba(4,14,45,.85)";

                navbar.style.boxShadow =
                    "none";
            }
        }
    );
}

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

function initRevealAnimation(){

    const elements =
        document.querySelectorAll(
            ".product-card, .why-card, .tier-card, .testimonial-card, .story-card, .video-card, .stat-card"
        );

    const observer =
        new IntersectionObserver(
            entries=>{

                entries.forEach(
                    entry=>{

                    if(
                        entry.isIntersecting
                    ){

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

    elements.forEach(el=>{

        el.classList.add(
            "hidden-element"
        );

        observer.observe(el);
    });
}

// =========================================
// TICKER INTERACTION
// =========================================

function initTickerInteraction(){

    const ticker =
        document.querySelector(
            ".ticker-track"
        );

    if(!ticker) return;

    ticker.addEventListener(
        "mouseenter",
        ()=>{

            ticker.style.animationPlayState =
                "paused";
        }
    );

    ticker.addEventListener(
        "mouseleave",
        ()=>{

            ticker.style.animationPlayState =
                "running";
        }
    );
}

// =========================================
// LAZY LOAD IFRAMES
// =========================================

function lazyLoadIframes(){

    document
    .querySelectorAll(
        "iframe"
    )
    .forEach(frame=>{

        frame.loading =
            "lazy";
    });
}

// =========================================
// PAGE LOAD EFFECT
// =========================================

function initPageTransition(){

    document.body.style.opacity =
        "0";

    document.body.style.transition =
        "opacity .6s ease";

    setTimeout(()=>{

        document.body.style.opacity =
            "1";

    },100);
}

// =========================================
// APP INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        checkServerConnection();

        initLanguageSwitcher();

        initCurrencySwitcher();

        initCTAButtons();

        initSmoothScroll();

        initMobileMenu();

        initTradingPopup();

        initFAQ();

        initNavbarEffects();

        initRevealAnimation();

        initTickerInteraction();

        lazyLoadIframes();

        initPageTransition();

        console.log(
            "GlobalEarn Premium Loaded"
        );
    }
);
