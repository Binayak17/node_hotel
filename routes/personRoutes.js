const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

// POST request to save person data
router.post('/', async (req, res) => {
    try{
        const data = req.body; // Assuming the request body

    //Create a new person document using the Mongoose model
    const newPerson = new Person(data);

    //Save the new person to the database
    const response = await newPerson.save();
    console.log('data saved successfully');
    res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: err.message });
    }
})

//GET request to get person data
router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log("data fetched successfully");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: err.message });
    }
})

//GET request to person according to work type
router.get('/:workType', async (req, res) =>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const data = await Person.find({work: workType});
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error: 'Work type not found'});
    }
    }catch(err){
        res.status(500).json({err: err.message});
    }
}) 

// PUT METHOD to update person data
router.put('/:id', async (req, res) =>{
    try{
        const personID = req.params.id;
        const data = req.body;
        const response = await Person.findByIdAndUpdate(personID, data, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({err: err.message});
    }
})

module.exports = router;