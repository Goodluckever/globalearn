const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =================================
// HEALTH CHECK
// =================================

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "GlobalEarn Backend",
    server: "connected"
  });
});

// =================================
// DASHBOARD DATA
// =================================

app.get("/api/dashboard",
(req, res)=>{

res.json({

portfolio:12580,

markets:70,

products:6,

signals:24

});

});

// =================================
// USER KYC
// =================================

app.post("/api/kyc",
(req,res)=>{

const data = req.body;

res.json({

success:true,

message:
"KYC Submitted",

data

});

});

// =================================
// LOGIN MOCK
// =================================

app.post("/api/login",
(req,res)=>{

const {
email,
password
} = req.body;

if(email && password){

return res.json({

success:true,

message:
"Login successful"

});

}

return res.status(400).json({

success:false

});

});

const PORT =
process.env.PORT || 5000;

app.listen(PORT, ()=>{

console.log(
`Server running on ${PORT}`
);

});
