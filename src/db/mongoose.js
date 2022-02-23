const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,{ 
    useNewUrlParser : true,
    useCreateIndex : true, //create indexes,
    useFindAndModify : false //to prevent deprecation warning
});





//setting a user
// const me = new User({
//     name : 'Karan        ',
//     email : 'KAAAAAaran@gmail.com '  ,                       
//     password : 'pas1234567'  
// });

//save method returns a promise  so we use then and catch here
//Promises notify whether the request is fulfilled or rejected. 
//Callbacks can be registered with the .then() to handle fulfillment and rejection.
// The .then() can be chained to handle the fulfillment and rejection whereas 
//.catch() can be used for handling the errors(if any).

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error',error);
// });

 
//creating a new model


//creating an instance of the model
// const task1 = new task({
//     description : 'Learn mongoose'
// });



// //saving the task
// task1.save().then(() => {
//     console.log(task1);
// }
// ).catch((error) => {
//     console.log('Error',error);
// });
