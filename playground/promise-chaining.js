require('../src/db/mongoose');
const User = require('../src/models/user');

//61cef43270c55f023832e39d
// User.findByIdAndUpdate('61cef43270c55f023832e39d',{age:1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age:1});
// }).then((result) => {
//     console.log(result);

// }).catch((error) => {
//     console.log(error);
// });

//using async and await
const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age});
    return count;
};
updateAgeAndCount('61cef43270c55f023832e39d',2).then((count) => {
    // console.log(user);
    console.log(count);
    
}).catch((error) => {
    console.log(error);
});
