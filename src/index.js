const express = require('express');
require('./db/mongoose'); // we require the file such that it runs and we can use it
// const User = require('./models/user');
// const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();  //creating new express
const port  = process.env.PORT  //for hereku we are using process.env.PORT else run locally at 3000

// const multer = require('multer');
// const upload = multer({
//     dest: 'images', //destination where all file will be stored
//     limits: {
//         fileSize: 3000000 //3mb - max file size allowed to upload 
//     },
//     fileFilter(req, file, cb) {   //file filter to check the file type
//       //  if(!file.originalname.endsWith('.pdf')) { //check if the file ends with .pdf
//         if(!file.originalname.match(/\.(pdf||doc||docx)$/)) { //regex to check the file type
//             return cb(new Error('Please upload a  Document')); // return error if file is not in callback
//         }
//         cb(undefined, true);
//     }
// });
//error middleware


//upload.single('upload') is used to upload single file and upload.array('upload',5) 
//is used to upload multiple files and upload.fields('upload') is used to upload multiple 
//files with multiple fields and upload.none() is used to upload no file at all these are middlewares
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send();
// },(error, req, res, next) => { //error middleware
//     res.status(400).send({ error: error.message });

// });

        

app.use(express.json()); //for parsing json into an object so we can use that

app.use(userRouter);//registering the user router
app.use(taskRouter);//registering the task router





app.listen(port, () => {
    console.log('Listening on port ' + port);
});



    

//------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxd-----------------------------------------------------------
//checking the association between user and task in mongoose 
// const Task = require('./models/task');
// const User = require('./models/user');
// const main = async () => {
//     const user = await User.findById('61f6b20ffde7ac3ac043a6e2');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main()

//------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxd-----------------------------------------------------------



// without middleware : new request -> run route handler
//
// with middleware : new request -> do something(any function that we want to do) -> run route handler
//
//-------------------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxx-------------------------------------------
// //jwt example
// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
// //                    this is id of the user  this is secret key    this is some condition
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' });
//     console.log(token); //json web token
// //  token = header + "." + payload + "." + signature
//     const data = jwt.verify(token, 'thisismynewcourse'); //verifying the token
//     console.log(data);
// }


// myFunction();


// ------------------------------------------xxxxxxxxxxxxxxxxxxxxxxxxxxxx-----------------------------------------
//password operations
// const bcrypt = require('bcryptjs');

// const myfunc = async () => {
//     const password = 'Red12345!';
//     //8 gives no. of rounds of hashing algorithm exicuted, higher the no. of rounds more secure but slower the process 8 is fine
//     const hashedPassword = await bcrypt.hash(password, 8); 
//     console.log(password);
//     console.log(hashedPassword);

//     //comapring the password with the hashed password
//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
//     console.log(isMatch);
// }

// myfunc();
//encryption algo converts plain text into a encrypt and then converts the encrypt into a string
//hashing is a one way process, plain text is converted into a hash and it is irreversible back to orginal text
//and everytime you run the program a new hash is created thus it is not reversible

