const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async (req,res,next) => {
    //console.log('auth middleware');

    try{
        //we are taking the token from the header named ' authorization' and 
        //we are splitting it by space and taking the second part of the array which is the token itself 
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, 'thisismynewcourse');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if(!user)
        {
            throw new Error()
        }
        req.token = token
        req.user = user //requesting the user object

        next();//calling next method

    }
    catch(e){
        res.status(401).send({error: 'Please authenticate'});

}
}

module.exports = auth;