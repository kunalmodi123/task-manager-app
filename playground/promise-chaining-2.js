// challenge

require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("5ede44b9dcbeb619c4966008")
//   .then((task) => {
//     console.log(task);

//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("5edfc7ec8a0b985404297314")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
