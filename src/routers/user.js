const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");
const {
  sendWelcomeEmail,
  sendCancellationEmail,
} = require("../emails/account");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  const path = require('path')

  const user = new User(req.body)
 
  try {
      await user.save()
      const token = await user.generateAuthToken()
      res.cookie('auth_token', token)
      res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'))
  } catch (e) {
      res.status(400).send(e)
  }

  // try {
  //   await user.save();
  //   sendWelcomeEmail(user.email, user.name);
  //   const token = await user.generateAuthToken();

  //   res.status(201).send({ user, token });
  // } catch (e) {
  //   res.status(400).send(e);
  // }

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((error) => {
  //     res.status(400);
  //     res.send(error);
  //     // you can chain both lines
  //     // res.status(400).send(error);
  //   });

  
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.cookie('auth_token', token)
    res.sendFile(path.resolve(__dirname, '..', 'views', 'private.html'))
} catch (e) {
    res.status(400).send()
}
  
  
  // try {
  //   const user = await User.findByCredentials(
  //     req.body.email,
  //     req.body.password
  //   );
  //   const token = await user.generateAuthToken();

  //   res.send({ user: user.getPublicProfile(), token });
  // } catch (e) {
  //   res.status(400).send();
  // }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  // still we cannot allow any user to see all users info, so we change the restapi to only show our info
  res.send(req.user);
  // try {
  //   const users = await User.find({});
  //   res.send(users);
  // } catch (e) {
  //   res.status(500).send(e);
  // }
  // // User.find({})
  // //   .then((users) => {
  // //     res.send(users);
  // //   })
  // //   .catch((e) => {
  // //     res.status(500).send(e);
  // //   });
});

// :id is route handler
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) return res.status(404).send();
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
//   // User.findById(_id)
//   //   .then((user) => {
//   //     if (!user) return res.status(404).send();
//   //     res.send(user);
//   //   })
//   //   .catch((e) => {
//   //     res.status(500).send(e);
//   //   });
// });

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ Error: "Invalid updates" });
  }

  try {
    // const user = await User.findById(req.params.id);
    const user = req.user; // changed so as to add auth to update
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    // We cannot use middleware in the code below so we will use the above code
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

// router.delete("/users/:id", auth ,async (req, res) => {
router.delete("/users/me", auth, async (req, res) => {
  try {
    // // const user = await User.findByIdAndDelete(req.params.id);
    // const user = await User.findByIdAndDelete(req.user._id); // to remove my own account

    // if (!user) return res.status(404).send();
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

const upload = multer({
  // dest: "avatar", // for auth, we removed this line
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error("Not a image file of jpg, jpeg or png format"));
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    //req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send("Uploaded!");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
//IMPORTANT
/*
<img src="data:image/jpg;base64, here you paste the binary data">

the above is the html code to change the buffer into image in the browser
*/

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) throw new Error();

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
