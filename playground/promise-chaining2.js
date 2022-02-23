require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('61cefacd4dee1e330c344a08').then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed:false});
// }).then((result) => {
//     console.log(result);
    
// }).catch((error) => {
//     console.log(error);
// });

//async-await

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count;
}
deleteTaskAndCount('61cefb67f921f82b74fbd761').then((count) => {
    console.log(count);
    
}
).catch((error) => {
    console.log(error);
}
);
