// =================================
// PRIVATE ADMIN LOGIN
// =================================

const loginForm =
document.getElementById(
"adminLoginForm"
);

if(loginForm){

loginForm.addEventListener(
"submit",
(e)=>{

e.preventDefault();

const username =
document.getElementById(
"adminUsername"
).value;

const password =
document.getElementById(
"adminPassword"
).value;

if(
username === "admin" &&
password === "globalearn123"
){

localStorage.setItem(
"adminAccess",
"true"
);

window.location.href =
"admin.html";

}else{

document.getElementById(
"adminLoginMessage"
).innerHTML =
`
<p style="color:red">
Invalid credentials
</p>
`;

}

});

}

// =================================
// ROUTE PROTECTION
// =================================

if(
window.location.pathname
.includes("admin.html")
){

const access =
localStorage.getItem(
"adminAccess"
);

if(access !== "true"){

window.location.href =
"login.html";

}

}

// =================================
// ADMIN NOTIFICATION
// =================================

function adminNote(message){

const note =
document.createElement(
"div"
);

note.innerText =
message;

note.style.position =
"fixed";

note.style.top =
"20px";

note.style.right =
"20px";

note.style.background =
"#1d6fff";

note.style.padding =
"18px";

note.style.borderRadius =
"14px";

document.body.appendChild(
note
);

setTimeout(()=>{

note.remove();

},3000);

}

const adminBtn =
document.querySelector(
".admin-btn"
);

if(adminBtn){

adminBtn.addEventListener(
"click",
()=>{

adminNote(
"Notification Created"
);

});

}
