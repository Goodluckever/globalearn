// ======================================
// GLOBAL IMPORTS
// ======================================

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================================
// APP INIT
// ======================================

const app = express();

const PORT =
process.env.PORT || 5000;

// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// ======================================
// DATABASE CONNECTION
// ======================================

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

.then(() => {

    console.log(
        "✅ MongoDB Connected"
    );

})

.catch((error) => {

    console.error(
        "❌ MongoDB Error:",
        error
    );

});

// ======================================
// USER MODEL
// ======================================

const userSchema =
new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        default: ""
    },

    country: {
        type: String,
        default: ""
    },

    gender: {
        type: String,
        default: ""
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "user"
    },

    balance: {
        type: Number,
        default: 8940
    },

    equity: {
        type: Number,
        default: 12540
    },

    profit: {
        type: Number,
        default: 3480
    },

    plan: {
        type: String,
        default:
        "Premium Trader"
    },

    kycStatus: {
        type: String,
        default:
        "Pending Review"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const User =
mongoose.model(
    "User",
    userSchema
);

// ======================================
// JWT AUTH MIDDLEWARE
// ======================================

function authMiddleware(
    req,
    res,
    next
){

    const authHeader =
    req.headers.authorization;

    if(!authHeader){

        return res.status(401)
        .json({

            success:false,

            message:
            "Unauthorized"

        });
    }

    const token =
    authHeader.split(" ")[1];

    try{

        const decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    }

    catch(error){

        return res.status(401)
        .json({

            success:false,

            message:
            "Invalid token"

        });
    }
}

// ======================================
// HEALTH ROUTE
// ======================================

app.get(
    "/api/health",
    (
        req,
        res
    ) => {

    res.status(200).json({

        success:true,

        status:
        "Backend Connected",

        database:
        mongoose.connection.readyState
        === 1
        ? "Connected"
        : "Disconnected"

    });

});

// ======================================
// ROOT ROUTE
// ======================================

app.get(
    "/",
    (
        req,
        res
    ) => {

    res.json({

        success:true,

        app:
        "GlobalEarn API",

        status:
        "Running"

    });

});

// ======================================
// REGISTER USER
// ======================================

app.post(
    "/api/register",

    async (
        req,
        res
    ) => {

    try{

        const {

            name,
            email,
            password,
            phone,
            country,
            gender

        } = req.body;

        if(
            !name ||
            !email ||
            !password
        ){

            return res
            .status(400)
            .json({

                success:false,

                message:
                "Missing required fields"

            });
        }

        const existingUser =
        await User.findOne({
            email
        });

        if(existingUser){

            return res
            .status(400)
            .json({

                success:false,

                message:
                "Email already exists"

            });
        }

        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

        const newUser =
        await User.create({

            name,
            email,
            phone,
            country,
            gender,

            password:
            hashedPassword

        });

        res.status(201)
        .json({

            success:true,

            message:
            "Registration successful",

            user:newUser

        });

    }

    catch(error){

        console.error(error);

        res.status(500)
        .json({

            success:false,

            message:
            "Server error"

        });
    }
});

// ======================================
// LOGIN USER
// ======================================

app.post(
    "/api/login",

    async (
        req,
        res
    ) => {

    try{

        const {

            email,
            password

        } = req.body;

        const user =
        await User.findOne({
            email
        });

        if(!user){

            return res
            .status(404)
            .json({

                success:false,

                message:
                "User not found"

            });
        }

        const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){

            return res
            .status(401)
            .json({

                success:false,

                message:
                "Invalid password"

            });
        }

        const token =
        jwt.sign(

            {

                id:user._id,

                role:user.role

            },

            process.env.JWT_SECRET,

            {

                expiresIn:"7d"

            }
        );

        res.status(200)
        .json({

            success:true,

            token,

            user:{

                id:user._id,

                name:user.name,

                email:user.email,

                balance:user.balance,

                equity:user.equity,

                profit:user.profit,

                plan:user.plan,

                kycStatus:
                user.kycStatus

            }

        });

    }

    catch(error){

        console.error(error);

        res.status(500)
        .json({

            success:false,

            message:
            "Login failed"

        });
    }
});

// ======================================
// PROTECTED DASHBOARD
// ======================================

app.get(
    "/api/dashboard",

    authMiddleware,

    async (
        req,
        res
    ) => {

    try{

        const user =
        await User.findById(
            req.user.id
        );

        res.json({

            success:true,

            user

        });

    }

    catch(error){

        res.status(500)
        .json({

            success:false,

            message:
            "Dashboard error"

        });
    }
});

// ======================================
// SERVER START
// ======================================

app.listen(
    PORT,
    () => {

    console.log(

        `🚀 Server Running On Port ${PORT}`

    );

});
