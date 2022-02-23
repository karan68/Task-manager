//not included in the main project

//CRUD operations
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient; //access to functions neccessary for crud operation

//making the connection to the database
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL,{ useNewUrlParser : true}, (error,client) => {
    if(error){
        return console.log('Unable to connect to database');
    }
    const db  = client.db(databaseName);

    // Create part of the CRUD

    //insert one document
    // client.db(databaseName).collection('users').insertOne({ //inserting data into the database
    //     name : 'Karan',
    //     age : 23
    // },(error,result) => { //callback function
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops); //printing the result,ops is an araay of documents
    // });

    //insert many document
    // const db  = client.db(databaseName);
    // db.collection('users').insertMany([
    //     {
    //         name : 'Karan',
    //         age : 23
    //     },
    //     {
    //         name : 'yadav',
    //         age : 23
    //     },
    //     {
    //         name : 'Karan yadav',
    //         age : 23
    //     }
    // ],(error,result) => {
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // });


    //insert many document for tasks
    
//     db.collection('tasks').insertMany([
//         {
//             description : 'task 1',
//             completed : true
//         },
//         {
//             description : 'task 2',
//             completed : false
//         },
//         {
//             description : 'task 3',
//             completed : true
//         }],(error,result) => {
//             if(error){
//                 return console.log('Unable to insert user');
//             }
//             console.log(result.ops);
        
// });
//----------------------------------xxxxxxxxxxxxx------------------------------------


// Read part of the CRUD

//find one document
//findOne({_id:new ObjectID('5e9f9f9f9f9f9f9f9f9f9f9')}) //this should be used to search for an id .
// db.collection('users').findOne({name : 'Karan',age:23},(error,user) => { //searchind for a document in the database 
//                                                             // that is not present is not an error , it just return null
//     if(error){
//         return console.log('Unable to fetch');
//     }
//     console.log(user);
// });

// //find returns a cursor to the database elements you want to find
// db.collection('users').find({age:23}).toArray((error,users) => { //toArray is used to convert the cursor into an array
//     if(error){
//         return console.log('Unable to fetch');
//     }
//     console.log(users);
// });
// //count
// db.collection('users').find({age:23}).count((error,count) => { //toArray is used to convert the cursor into an array
//     if(error){
//         return console.log('Unable to fetch');
//     }
//     console.log(count);
// });
//------------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxx-----------------------------------------


// Update part of the CRUD
//the following are the opertors that can be used to update the database
//currentDate - sets the value of a field to the current date
//inc - increments the value of a field by a specified amount
//mul - multiplies the value of a field by a specified amount
//rename - renames a field
//set - sets the value of a field
//unset - removes the value of a field
//min - sets the value of a field to the smallest value greater than or equal to a specified value
//max - sets the value of a field to the largest value less than or equal to a specified value



// const updatePromise = db.collection('users').updateOne({
//     _id : new mongodb.ObjectID('6186b4d122014a0a9092c698')
// },{
    
//         $inc : {
//             age : 1
//     }


// }).then((result) => {    //then is used to handle the promise
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

//updateMany
// const updatePromise = db.collection('tasks').updateMany({
//     completed : true
// },{
//     $set : {
//         completed : false
//     }
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })


//-----------------------------------------------------xxxxxxxxxxxxxxxxxxxxx---------------------------------------
//delete part of the CRUD

//deleteMany

// db.collection('users').deleteMany({
//     age : 23
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })


//deleteOne

// db.collection('users').deleteOne({
//     _id : new mongodb.ObjectID('6186b4d122014a0a9092c698')
// }).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })



});