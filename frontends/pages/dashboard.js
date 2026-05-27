// =========================================
// DASHBOARD TRADINGVIEW CHART
// =========================================

function initTradingChart() {

    const chart =
        document.getElementById(
            "dashboardChart"
        );

    if (!chart) return;

    new TradingView.widget({

        container_id:
            "dashboardChart",

        width:"100%",

        height:600,

        symbol:
            "BINANCE:BTCUSDT",

        interval:"30",

        timezone:"Etc/UTC",

        theme:"dark",

        style:"1",

        locale:"en",

        toolbar_bg:"#081120",

        enable_publishing:false,

        allow_symbol_change:true
    });
}

// =========================================
// DASHBOARD REVEAL ANIMATIONS
// =========================================

function initDashboardReveal() {

    const cards =
        document.querySelectorAll(
            ".overview-card, .portfolio-card, .education-card, .profile-card, .dashboard-chart"
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
                            "dashboard-show"
                        );
                    }
                });

            },
            {
                threshold:0.15
            }
        );

    cards.forEach(card => {

        card.classList.add(
            "dashboard-hidden"
        );

        observer.observe(card);
    });
}

// =========================================
// SIDEBAR ACTIVE LINKS
// =========================================

function initSidebarLinks() {

    const links =
        document.querySelectorAll(
            ".side-links a"
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            function () {

                links.forEach(l => {

                    l.classList.remove(
                        "active-side"
                    );
                });

                this.classList.add(
                    "active-side"
                );
            }
        );
    });
}

// =========================================
// PROFILE SAVE
// =========================================

function initProfileSave() {

    const form =
        document.querySelector(
            ".profile-card form"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            const inputs =
                form.querySelectorAll(
                    "input, select"
                );

            const profile = {};

            inputs.forEach(input => {

                profile[
                    input.placeholder ||
                    "country"
                ] =
                    input.value;
            });

            localStorage.setItem(
                "globalearn_profile",
                JSON.stringify(profile)
            );

            showNotification(
                "Profile Saved Successfully"
            );
        }
    );
}

// =========================================
// LOAD PROFILE
// =========================================

function loadProfile() {

    const data =
        localStorage.getItem(
            "globalearn_profile"
        );

    if (!data) return;

    const profile =
        JSON.parse(data);

    const inputs =
        document.querySelectorAll(
            ".profile-card input, .profile-card select"
        );

    inputs.forEach(input => {

        const key =
            input.placeholder ||
            "country";

        if (
            profile[key]
        ) {

            input.value =
                profile[key];
        }
    });
}

// =========================================
// PREMIUM NOTIFICATION SYSTEM
// =========================================

function showNotification(message) {

    const notify =
        document.createElement(
            "div"
        );

    notify.className =
        "dashboard-notification";

    notify.innerHTML = `
        <strong>
            GlobalEarn
        </strong>

        <p>
            ${message}
        </p>
    `;

    document.body.appendChild(
        notify
    );

    setTimeout(() => {

        notify.classList.add(
            "dashboard-notify-show"
        );

    },100);

    setTimeout(() => {

        notify.remove();

    },3500);
}

// =========================================
// LIVE MARKET ACTIVITY
// =========================================

function initDashboardActivity() {

    const messages = [

        "BTC Market Up +2.4%",
        "Gold Market Updated",
        "New Forex Signal Available",
        "Nasdaq +1.3% Today",
        "Portfolio Analytics Refreshed",
        "Education Center Updated"

    ];

    setInterval(() => {

        const message =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];

        showNotification(
            message
        );

    },12000);
}

// =========================================
// BUTTON ACTIONS
// =========================================

function initDashboardButtons() {

    const buttons =
        document.querySelectorAll(
            ".dashboard-btn"
        );

    buttons.forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                showNotification(
                    "Trading dashboard opened"
                );
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
            function(e){

                e.preventDefault();

                const section =
                    document.querySelector(
                        this.getAttribute(
                            "href"
                        )
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
// INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTradingChart();

        initDashboardReveal();

        initSidebarLinks();

        initProfileSave();

        loadProfile();

        initDashboardActivity();

        initDashboardButtons();

        initSmoothScroll();

        showNotification(
            "Welcome Back To GlobalEarn"
        );
    }
);
