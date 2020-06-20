// CRUD create read update delete
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // mandatory line while using mongodb
const ObjectID = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017"; // .//localhost url : port where mongodb is connected
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(databaseName);

    db.collection("tasks")
      .deleteOne({
        completed: false,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

//=============================================================================
// db.collection("users")
//       .deleteMany({
//         age: 23,
//       })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//============================================================================
// db.collection("tasks")
//       .updateMany(
//         {
//           completed: true,
//         },
//         {
//           $set: {
//             completed: false,
//           },
//         }
//       )
//       .then((result) => {
//         console.log(result.modifiedCount);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//==================================================================================
// const UpdatePromise = db.collection("users").updateOne(
//   {
//     _id: new ObjectID("5edb47106add6009e82ab8a1"),
//   },
//   {
//     $set: {
//       //$set is an object operator
//       name: "newKunal",
//     },
//     $inc: {
//       age: 2,
//     },
//   }
// );

// UpdatePromise.then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });
// }

//==================================================================================

// Challenge
//   db.collection("tasks").findOne(
//     {
//       _id: new ObjectID("5edbc505a1cb375138e40d02"),
//     },
//     (error, user) => {
//       if (error) return console.log("Unable to fetch");

//       console.log(user);
//     }
//   );

//   db.collection("tasks")
//     .find({ completed: true })
//     .toArray((error, users) => {
//       console.log(users);
//     });
// }

//===============================================================================
// db.collection("users").findOne(
//   {
//     _id: new ObjectID("5edb47106add6009e82ab8a1"),
//     //name: "parikshit"
//     //  age: 1, // if you cannot find the document with searched data
//   },
//   (error, user) => {
//     if (error) return console.log("Unable to fetch");

//     console.log(user);
//   }
// );

// // find return a cursor to which there are numerous methods we can use with
// db.collection("users")
//   .find({ age: 20 })
//   .toArray((error, users) => {
//     console.log(users);
//   });

// db.collection("users")
//   .find({ age: 20 })
//   .count((error, users) => {
//     console.log(users);
//   });

//===============================================================================
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp()); // to get the current timestamp
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.toHexString());

//============================================================================================

// db.collection("users").insertOne(
//   {
//    //_id: id // if we want to insert through your own id
//     name: "Kunal",
//     age: 20,
//   },
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert document!");
//     }

//     console.log(result.ops);
//   }
// );
//=====================================================================================
// challenge

// db.collection("tasks").insertMany(
//   [
//     {
//       description: "homework",
//       completed: true,
//     },
//     {
//       description: "project",
//       completed: false,
//     },
//     {
//       description: "web series",
//       completed: true,
//     },
//   ],
//   (error, result) => {
//     if (error) return console.log("Unable to insert documents!");
//     console.log(result.ops);
//   }
// );
//===============================================================================================
