const express = require('express');
const router = express.Router();

const Menu = require('./../models/Menu');

//GET METHOD to fetch the Menu
router.get('/', async (req, res) => {
    try{
        const data = await Menu.find();
        res.status(200).json(data);
    }catch(err){
        res.status(200).json({err: err.message});
    }
})

//POST METHOD to save the Menu
router.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({err: err.message});
    }
})

module.exports = router;
