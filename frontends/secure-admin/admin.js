// =========================================
// ADMIN LOGIN AUTH
// =========================================

function initAdminLogin() {

    const loginForm =
        document.getElementById(
            "adminLoginForm"
        );

    if (!loginForm) return;

    loginForm.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            const email =
                document.getElementById(
                    "adminEmail"
                ).value;

            const password =
                document.getElementById(
                    "adminPassword"
                ).value;

            // CHANGE THESE
            const ADMIN_EMAIL =
                "admin@globalearn.com";

            const ADMIN_PASSWORD =
                "GlobalEarn2026";

            if(
                email === ADMIN_EMAIL &&
                password === ADMIN_PASSWORD
            ){

                sessionStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                showAdminNotification(
                    "Login Successful"
                );

                setTimeout(()=>{

                    window.location.href =
                    "admin.html";

                },1000);

            } else {

                showAdminNotification(
                    "Invalid Credentials"
                );
            }
        }
    );
}

// =========================================
// ADMIN SESSION PROTECTION
// =========================================

function protectAdminRoute() {

    const isAdmin =
        sessionStorage.getItem(
            "adminLoggedIn"
        );

    const page =
        window.location.pathname;

    if(
        page.includes(
            "admin.html"
        ) &&
        isAdmin !== "true"
    ){

        window.location.href =
            "login.html";
    }
}

// =========================================
// TRADINGVIEW ANALYTICS
// =========================================

function initAdminChart() {

    const chart =
        document.getElementById(
            "adminChart"
        );

    if (!chart) return;

    new TradingView.widget({

        container_id:
            "adminChart",

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
// USER SEARCH
// =========================================

function initUserSearch() {

    const search =
        document.getElementById(
            "searchUser"
        );

    const table =
        document.getElementById(
            "usersTable"
        );

    if(
        !search ||
        !table
    ) return;

    search.addEventListener(
        "keyup",
        function(){

            const value =
                this.value
                .toLowerCase();

            const rows =
                table.querySelectorAll(
                    "tbody tr"
                );

            rows.forEach(row=>{

                const text =
                    row.innerText
                    .toLowerCase();

                row.style.display =
                    text.includes(
                        value
                    )
                    ? ""
                    : "none";
            });
        }
    );
}

// =========================================
// SETTINGS SAVE
// =========================================

function initSettingsSave() {

    const form =
        document.getElementById(
            "settingsForm"
        );

    if(!form) return;

    form.addEventListener(
        "submit",
        function(e){

            e.preventDefault();

            showAdminNotification(
                "Settings Saved"
            );
        }
    );
}

// =========================================
// LOGOUT
// =========================================

function initLogout() {

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    if(!logoutBtn) return;

    logoutBtn.addEventListener(
        "click",
        ()=>{

            sessionStorage.removeItem(
                "adminLoggedIn"
            );

            showAdminNotification(
                "Logged Out"
            );

            setTimeout(()=>{

                window.location.href =
                    "login.html";

            },1000);
        }
    );
}

// =========================================
// ADMIN NOTIFICATIONS
// =========================================

function showAdminNotification(
    message
){

    const notify =
        document.createElement(
            "div"
        );

    notify.className =
        "admin-notification";

    notify.innerHTML = `
        <strong>
            GlobalEarn Admin
        </strong>
        <p>
            ${message}
        </p>
    `;

    document.body.appendChild(
        notify
    );

    setTimeout(()=>{

        notify.classList.add(
            "show-admin-notification"
        );

    },100);

    setTimeout(()=>{

        notify.remove();

    },3500);
}

// =========================================
// ADMIN ACTIVITY FEED
// =========================================

function initAdminActivityFeed(){

    const updates = [

        "New User Registered",
        "Market Analytics Updated",
        "Portfolio Data Refreshed",
        "Support Ticket Received",
        "BTC Market Increased",
        "Dashboard Activity Synced"

    ];

    setInterval(()=>{

        const update =
            updates[
                Math.floor(
                    Math.random() *
                    updates.length
                )
            ];

        showAdminNotification(
            update
        );

    },15000);
}

// =========================================
// INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        protectAdminRoute();

        initAdminLogin();

        initAdminChart();

        initUserSearch();

        initSettingsSave();

        initLogout();

        initAdminActivityFeed();

        showAdminNotification(
            "Admin System Ready"
        );
    }
);
