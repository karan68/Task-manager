const express = require('express');
const router = new express.Router();//creating new router
const auth = require('../middleware/auth');
const User = require('../models/user');
const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');
const multer = require('multer');
const sharp = require('sharp');

router.get('/test', (req, res) => {
    res.send('Hello World new');
});


//testing for postman
router.post('/users', async (req,res) => {  //route
    // console.log(req.body); //getting the data

    const user = new User(req.body); //creating a new user

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);//sending mail
       const token = await user.generateAuthToken(); //signin token
        res.status(201).send({user, token}); //201 is the status code for created
    } catch (e) {
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error); // setting a status code and sending the error found
    // });
});


    //login route
    router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken(); //const token containing the id 
            res.send({user,token});
        } catch (e) {
            // console.log(e);
            res.status(400).send();
        }
    });



    //logout route
    router.post('/users/logout', auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            })
            await req.user.save();

            res.send()
        }
        catch(e)
        {
            res.status(500).send()
        }
    })

    //logout of all sessions
    router.post('/users/logoutAll', auth, async (req, res) => {
        try {
            req.user.tokens = [] //making the tokens array empty
            await req.user.save();
            res.send();
            
        }
        catch(e)
        {
            res.status(500).send();
        }
    })
    

//to pass a middleware say auth, we pass it as a argument to the get method before we pass our route handler 
//getting all users -> changing it to request that send only user data
router.get('/users/me',auth,async (req,res) => {
   
    res.send(req.user);

    //------- previous code--------
    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send();
    // }
});
   
  
    // User.find().then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // });

//to upload the avatar image
const upload = multer({
    
    limits: {
        fileSize: 1000000 //1mb - max file size allowed to upload
    },
    fileFilter(req, file, cb) { //file filter to check the file type
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar',auth, upload.single('avatar'),async(req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250,height: 250}).png().toBuffer() //accessing the buffer of the file, modifying  and converting it to buffer 
   req.user.avatar = buffer //saving it on avatar field
    await req.user.save();
    res.send();
},(error, req, res, next) => { //error middleware
    res.status(400).send({ error: error.message });
    });
    

router.delete('/users/me/avatar',auth,async(req,res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar',async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type','image/png'); //setting it to an image
        res.send(user.avatar);
    }
    catch(e) {
        res.status(500).send();
    }

})

//getting a single user with id
router.get('/users/:id',async (req,res) => {
    const _id = req.params.id;  //req.params keeps the contents of the url

    try {
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }
    catch (e) {
        res.status(500).send(e);
    }
});



    // User.findById(_id).then((user) => {
    //     if(!user){
    //         return res.status(404).send();
    //         }

    //         res.send(user);
    //         }).catch((error) => {
    //             res.status(500).send(error);
    //  });
 

    //update an user
    //important
    router.patch('/users/me',auth,async (req,res) => {
        const updates = Object.keys(req.body); //convert the body object into an array of strings
        const allowedUpdates = ['name','email','password','age'];
        //every calls all the objects in the array and checks if it is in the allowedUpdates array
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).send({error : 'Invalid updates!'});
        }

        try {
            // const user = await User.findById(req.params.id);
            updates.forEach((update) => req.user[update] = req.body[update]);
            await req.user.save();
            // if(!user){
            //     return res.status(404).send();
            // }
            res.send(req.user);
        } catch (e) {
            res.status(400).send(e);
        }
    });

//deleting the user
router.delete('/users/me',auth,async (req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id); //earlier we deleted the user by id from parameters
        // const user = await User.findByIdAndDelete(req.user._id); //now we delete by id  from user object
        // if(!user){
        //     return res.status(404).send();
        // }
        //we don't need to check the user by id because we have added the auth middelware so we directly use 
        //mongoose delete method to delete the user
        await req.user.remove();
        sendCancellationEmail(req.user.email, req.user.name);//sending mail
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
});




module.exports = router;
