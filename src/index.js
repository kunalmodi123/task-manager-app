const express = require("express");
require("./db/mongoose");
// const User = require("./models/user");
// const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   // middleware
//   if (req.method === "GET") {
//     return res.send("GET requests are disabled");
//   }

//   next();
// });

//challenge

// app.use((req, res, next) => {
//   if (
//     req.method === "GET" ||
//     req.method === "POST" ||
//     req.method === "PATCH" ||
//     req.method === "DELETE"
//   )
//     return res
//       .status(503)
//       .send("The site is under maintenance! Try again later.");

//   next();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("5eed30971a2ebb21904a77a3");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);

  const user = await User.findById("5eec0c24ce1458740cf163e9");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();
