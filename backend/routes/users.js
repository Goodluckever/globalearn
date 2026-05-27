const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");

/* =========================
GET ALL USERS
========================= */

router.get("/",
async (req,res)=>{

    try{

        const users =
        await User.find();

        res.json({
            success:true,
            users
        });

    }

    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }

});

/* =========================
GET SINGLE USER
========================= */

router.get("/:id",
async (req,res)=>{

    try{

        const user =
        await User.findById(
            req.params.id
        );

        res.json({
            success:true,
            user
        });

    }

    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }

});

module.exports =
router;
