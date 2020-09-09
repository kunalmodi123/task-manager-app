const express = require("express");
require("./db/mongoose");
// const User = require("./models/user");
// const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const cookieParser = require('cookie-parser')
 

const app = express();
const port = process.env.PORT;

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
  

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

// const main = async () => {
//   // const task = await Task.findById("5eed30971a2ebb21904a77a3");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("5eec0c24ce1458740cf163e9");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();

// //=======================================================================================
// // FILE UPLOAD

// const multer = require("multer");
// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000, // size in bytes
//   },
//   fileFilter(req, file, cb) {
//     // cb is callback
//     // if (!file.originalname.endsWith(".pdf")) {
//     //   return cb(new Error("Please upload a PDF"));
//     // }

//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("Please upload a word document"));
//     }

//     cb(undefined, true);
//   },
// });

// // upload.single is a middleware
// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// ); // the 2nd argument is setup only to handle errors. Now we will get more readable error
// // rather than a whole HTML file as response

// //===========================================================================================
