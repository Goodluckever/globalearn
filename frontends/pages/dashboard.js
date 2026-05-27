// =====================================
// DASHBOARD NOTIFICATION
// =====================================

function dashboardNotification(message){

const note =
document.createElement("div");

note.className =
"dashboard-note";

note.innerText =
message;

document.body.appendChild(
note
);

setTimeout(()=>{

note.classList.add(
"show-note"
);

},100);

setTimeout(()=>{

note.remove();

},3500);

}

// =====================================
// WELCOME
// =====================================

setTimeout(()=>{

dashboardNotification(
"Welcome to GlobalEarn Dashboard"
);

},1500);

// =====================================
// BUTTON ACTION
// =====================================

const dashboardBtn =
document.querySelector(
".dashboard-btn"
);

if(dashboardBtn){

dashboardBtn.addEventListener(
"click",
()=>{

dashboardNotification(
"Opening Market Dashboard..."
);

});

}

// =====================================
// KYC SUBMIT
// =====================================

const kycForm =
document.querySelector(
".kyc-form"
);

if(kycForm){

kycForm.addEventListener(
"submit",
(e)=>{

e.preventDefault();

dashboardNotification(
"KYC Submitted Successfully"
);

});

}

// =====================================
// AUTO MARKET MESSAGE
// =====================================

const dashboardMessages = [

"BTC market updated",

"Forex market monitored",

"NASDAQ market moved +1.2%",

"Portfolio synced",

"Market signals updated"

];

setInterval(()=>{

dashboardNotification(

dashboardMessages[
Math.floor(
Math.random()*
dashboardMessages.length
)
]

);

},10000);
