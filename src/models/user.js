const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name : { type : String ,
        required : true, //validation
        trim : true

},

age : { type : Number,
        default : 0,  //if you don't provide an age we will use 0 instead
        validate(value){ //custom validation
            if(value<0){
                throw new Error('Age must be a positive number');
            }
        }
    } ,
email : { type : String,
        unique : true, //unique email so no other user can have the same email
        required : true,
        trim : true,   //trim whitespaces
        lowercase : true,
        validate(value){ //custom
            if(!validator.isEmail(value)){        //function from validator package
                throw new Error('Email is invalid');
            }
        }
    },
    
password : { type : String,
            required : true,
            trim : true,
            minlength : 7,
            validate(value){
                if(value.toLowerCase().includes('password')){
                    throw new Error('Password cannot contain "password"');
                }
            }
        },
tokens : [{                      //array of objects
    token : {                    //each object has a token
        type : String, 
        required : true 
    } 
}],

    avatar : {
        type : Buffer
    } //binary image data


}, {
    timestamps : true  //enabling timestamps

});

//virtual field is a field that is not stored in the
// database but is calculated from other fields in the database and is used for searching and filtering purposes only 
userSchema.virtual('tasks',{
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
});


// use methods when we want to operate on a single document, and we use statics when we want to operate 
//on entire collection.

//removing password and tokens from the user object before sending it to the client
// we use toJSON AS it is a prebuilt method and only retrns the object.
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject(); //convert the user object into a regular object so we can edit it

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}



//defining the function, that generates the token
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token }); //all tokens i.e. sessions to one place
    await user.save();
    return token;
}

//defining the function, that checks the credentials
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Unable to login, password incorrect');
    }
    return user;
}




//using pre as we want to run this before saving the user i.e. password hashing
//we are not using arrow function because we want to use 'this' keyword to access the user object in the function 
//we use next() to tell mongoose that we are done with the middleware and we want to save the user
userSchema.pre('save', async function(next){
    const user = this;
    //if user is cretaed or modified
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});

//delete user tasks when user is removed
userSchema.pre('remove', async function(next)
{
    const user = this;
    await Task.deleteMany({ owner : user._id });


    next();
})

const User = mongoose.model('User', userSchema);

User.createIndexes();

    module.exports = User;  //exporting the user module so other files can use it