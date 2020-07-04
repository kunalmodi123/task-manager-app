const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// const me = new User({
//   name: "   parikshit modi      ",
//   email: " kunalmodiJFGKhdfh123@gmail.com   ",
//   password: "kls12password",
// });

// me.save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });

// const task = new Task({
//   description: "cricket game",
// });

// task
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("error: ", error);
//   });

//=================================================================================================

//=================================================================================================
// const User = mongoose.model("User", {
//   name: {
//     type: String,
//   },
//   age: {
//     type: Number,
//   },
// });

// const me = new User({
//   name: "Pranjit",
//   age: "mike",
// });

// me.save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("Error: ", error);
//   });
