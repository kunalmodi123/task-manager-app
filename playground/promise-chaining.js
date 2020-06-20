require("../src/db/mongoose.js");
const User = require("../src/models/user");

// 5ede4bf2f34be134a470de3b

// User.findByIdAndUpdate("5ede4bf2f34be134a470de3b", { age: 20 })
//   .then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 0 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("5ede4bf2f34be134a470de3b", 22)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
