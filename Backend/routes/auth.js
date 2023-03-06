const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const nodemailer = require("nodemailer");

const JWT_SC = "Deepakisagoodboy";

// Route 1:Create a user using :Post:'api/auth : No login required
router.post(
  "/CreateUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is not too Small").isLength({ min: 8 }),
  ],
  // If there are errors, returns bad request the errors
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // Chek wheather if user already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user already Exist" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new User
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data = {
          user: {
            id: user.id,
          },
        };

        const authTocken = jwt.sign(data, JWT_SC);
        //  console.log(JWTData);

        success = true;
        res.json({ success, authTocken });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Authenticate the user: Login
//Route 2:
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please Enter write details" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ success, error: "Please Enter write details" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authTocken = jwt.sign(data, JWT_SC);
      success = true;
      res.json({ success, authTocken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// Route 3:  to get User Details:Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    Userid = req.user.id;
    const user = await User.findById(Userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route 4: to get OPT from node mailler:api/auth/forgetPass
//  router.get("/forgetPass", fetchuser, async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();
//   var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

//   try {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       auth: {
//         user: 'erica.shanahan21@ethereal.email',
//         pass: 'WF3EUHsRQw7SrAGbtx', // generated ethereal password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Fred Foo 👻" <foo@example.com>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: `<b>Hello world? hello Bby</b> ${seq}`, 
     
//       // html body
//     });
//     console.log("Mail is sending");
//     console.log("Message sent: %s", info.messageId);
    
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     res.json({seq, info});
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = router;
