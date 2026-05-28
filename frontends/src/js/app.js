// =========================================
// GLOBAL CONFIG
// =========================================

const CONFIG = {

    API_BASE_URL:
        "https://globalearn-nfmm.onrender.com"

};

// =========================================
// API HELPER
// =========================================

async function apiRequest(
    endpoint,
    method = "GET",
    body = null
) {

    try {

        const options = {

            method,

            headers: {
                "Content-Type":
                    "application/json"
            }
        };

        if (body) {

            options.body =
                JSON.stringify(
                    body
                );
        }

        const response =
            await fetch(
                `${CONFIG.API_BASE_URL}${endpoint}`,
                options
            );

        const data =
            await response.json();

        return data;
    }

    catch (error) {

        console.error(
            "API Error:",
            error
        );

        return {

            success: false,

            message:
                "Network Error"
        };
    }
}

// =========================================
// BACKEND STATUS CHECK
// =========================================

async function checkBackendStatus() {

    const status =
        document.getElementById(
            "server-status"
        );

    if (!status) return;

    try {

        const data =
            await apiRequest(
                "/api/health"
            );

        status.innerHTML =
            `
            🟢 Backend Connected
            `;

        console.log(
            "Backend:",
            data
        );
    }

    catch (error) {

        status.innerHTML =
            `
            🔴 Backend Offline
            `;
    }
}

// auto refresh

setInterval(
    checkBackendStatus,
    20000
);

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

    const secondaryButtons =
        document.querySelectorAll(
            ".secondary-btn"
        );

    primaryButtons.forEach(
        button => {

        button.addEventListener(
            "click",
            () => {

                window.location.href =
                    "dashboard/dashboard.html";
            }
        );
    });

    tierButtons.forEach(
        button => {

        button.addEventListener(
            "click",
            () => {

                window.location.href =
                    "dashboard/dashboard.html";
            }
        );
    });

    secondaryButtons.forEach(
        button => {

        button.addEventListener(
            "click",
            () => {

                const market =
                    document.getElementById(
                        "markets"
                    );

                if (market) {

                    market
                    .scrollIntoView({

                        behavior:
                            "smooth"
                    });
                }
            }
        );
    });
}

// =========================================
// AUTH SYSTEM
// =========================================

async function loginUser(
    email,
    password
) {

    const result =
        await apiRequest(

            "/api/auth/login",

            "POST",

            {
                email,
                password
            }
        );

    if (
        result.token
    ) {

        localStorage.setItem(
            "token",
            result.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(
                result.user
            )
        );

        window.location.href =
            "dashboard/dashboard.html";
    }

    else {

        alert(
            result.message ||
            "Login Failed"
        );
    }
}

async function registerUser(
    formData
) {

    const result =
        await apiRequest(

            "/api/auth/register",

            "POST",

            formData
        );

    if (
        result.success
    ) {

        alert(
            "Account Created Successfully"
        );

        window.location.reload();
    }

    else {

        alert(
            result.message ||
            "Registration Failed"
        );
    }
}

// =========================================
// TOKEN CHECK
// =========================================

function checkUserSession() {

    const token =
        localStorage.getItem(
            "token"
        );

    if (token) {

        console.log(
            "User Logged In"
        );
    }
}

// =========================================
// PREMIUM LOADER
// =========================================

function initLoadingEffect() {

    document.body.style.opacity =
        "0";

    document.body.style.transition =
        "opacity .6s ease";

    setTimeout(
        () => {

        document.body.style.opacity =
            "1";

        },

        200
    );
}

// =========================================
// FINAL INIT
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkBackendStatus();

        initCTAButtons();

        checkUserSession();

        initLoadingEffect();
    }
);
// =====================================
// AUTH CONFIG
// =====================================

const API_BASE_URL =
"https://globalearn-nfmm.onrender.com";

// =====================================
// REGISTER
// =====================================

const registerForm =
document.getElementById(
    "registerForm"
);

if(registerForm){

registerForm.addEventListener(
"submit",

async function(e){

e.preventDefault();

const name =
document.getElementById(
"registerName"
).value;

const email =
document.getElementById(
"registerEmail"
).value;

const phone =
document.getElementById(
"registerPhone"
).value;

const country =
document.getElementById(
"registerCountry"
).value;

const gender =
document.getElementById(
"registerGender"
).value;

const password =
document.getElementById(
"registerPassword"
).value;

try{

const response =
await fetch(

`${API_BASE_URL}/api/register`,

{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

name,
email,
phone,
country,
gender,
password

})

}
);

const data =
await response.json();

alert(
data.message
);

if(data.success){

window.location.reload();

}

}

catch(error){

console.error(error);

alert(
"Registration failed"
);

}

});
}

// =====================================
// LOGIN
// =====================================

const loginForm =
document.getElementById(
"loginForm"
);

if(loginForm){

loginForm.addEventListener(
"submit",

async function(e){

e.preventDefault();

const email =
document.getElementById(
"loginEmail"
).value;

const password =
document.getElementById(
"loginPassword"
).value;

try{

const response =
await fetch(

`${API_BASE_URL}/api/login`,

{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

email,
password

})

}
);

const data =
await response.json();

if(data.success){

localStorage.setItem(
"token",
data.token
);

localStorage.setItem(
"user",
JSON.stringify(
data.user
)
);

// ======================
// ROLE BASED REDIRECT
// ======================

if(
data.user.role ===
"admin"
){

window.location.href =
"./admin/admin.html";

}

else{

window.location.href =
"./dashboard/dashboard.html";

}

}

else{

alert(
data.message
);

}

}

catch(error){

console.error(error);

alert(
"Login failed"
);

}

});
}

// =====================================
// AUTO AUTH CHECK
// =====================================

async function loadDashboard(){

const token =
localStorage.getItem(
"token"
);

if(!token) return;

try{

const response =
await fetch(

`${API_BASE_URL}/api/dashboard`,

{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

const data =
await response.json();

if(data.success){

const profile =
document.getElementById(
"profileName"
);

if(profile){

profile.textContent =
data.user.name;
}

}

}

catch(error){

console.error(error);

}
}

document.addEventListener(
"DOMContentLoaded",
loadDashboard
);
