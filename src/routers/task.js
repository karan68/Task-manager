const express = require('express');
const router = new express.Router();//creating new router
const Task = require('../models/task');
const auth = require('../middleware/auth');



router.post('/tasks',auth, async (req,res) => {  //route
    // const task = new Task(req.body);

    const task = new Task({
        ...req.body, // es6 operator to pass all elements of iterableObj as arguments to function task
        owner : req.user._id //creating an association with user
    });

    try{
        await task.save();
        res.status(201).send(task);
    }
    catch(e){
        res.status(400).send(e);
    }
});


//     task.save().then(() => {
//         res.status(201).send(task);
//     }).catch((error) => {
//         res.status(400).send(error);
//     });
// });

//GET /tasks?completed=true --> filtering the data
//GET /tasks?limit=10&skip=10 --> pagination
//GET /tasks?sortBy=createdAt:desc --> sorting the data
router.get('/tasks',auth, async (req,res) => {
    const match = {};
    const sort = {};

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy)
    {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1
    }


    try{
        // const tasks = await Task.find({owner : req.user._id});
        await req.user.populate({
            path : 'tasks', //what we want to populate
            match, //filtering the data
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort 
            }

        }).execPopulate();
        res.send(req.user.tasks);
       
    }
    catch(e){
        res.status(500).send(e);
    }
});




//     Task.find().then((tasks) => {
//         res.send(tasks);
//     }).catch((error) => {
//         res.status(500).send(error);
//     });
// });

router.get('/tasks/:id', auth,async (req,res) => {
    const _id = req.params.id;
    try{
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id }); //fetching the task i created

        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    } 
});


//     Task.findById(_id).then((task) => {
//         if(!task){
//             return res.status(404).send();
//         }
//         res.send(task);
//     }).catch((error) => {
//         res.status(500).send(error);
//     });
// });



 //update an task
    //important
    router.patch('/tasks/:id',auth,async (req,res) => {
        const updates = Object.keys(req.body); //convert the body object into an array of strings
        const allowedUpdates = ['completed','description'];
        //every calls all the objects in the array and checks if it is in the allowedUpdates array
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).send({error : 'Invalid updates!'});
        }

        try {
            // const task = await Task.findById(req.params.id);
            const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
           
            if(!task){
                return res.status(404).send();
            }
            updates.forEach((update) => task[update] = req.body[update]);
            await task.save();
            res.send(task);
        } catch (e) {
            res.status(400).send(e);
        }
    });



    //deleting the task
    router.delete('/tasks/:id',auth,async (req,res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findByIdAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
});





module.exports = router;
