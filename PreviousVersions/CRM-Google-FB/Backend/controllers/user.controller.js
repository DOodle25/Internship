// const bcryptjs = require('bcryptjs');
// const { User } = require("../models/user.model");
// const { OTP } = require("../models/otp.model");
// const { sendEmail } = require("../utils/email");
// const jwt = require("jsonwebtoken");
// const Task = require("../models/task.model");

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const FacebookStrategy = require("passport-facebook").Strategy;

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/auth/facebook/callback",
//       profileFields: ["id", "displayName", "emails"],
//       passReqToCallback: true,
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         const { displayName, emails } = profile;
//         const email = emails ? emails[0].value : `${profile.id}@facebook.com`; // Fallback if email is not provided

//         let user = await User.findOne({ email });
//         if (!user) {
//           user = new User({ name: displayName, email, loginMethod: "facebook" });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// // Facebook Auth Route (Triggers Facebook Login)
// exports.facebookLogin = passport.authenticate("facebook", {
//   scope: ["email"],
// });

// // Facebook Auth Callback
// exports.facebookCallback = (req, res, next) => {
//   passport.authenticate("facebook", { session: false }, async (err, user) => {
//     if (err || !user) {
//       return res.redirect("https://polite-field-09918cc00.4.azurestaticapps.net/auth-failed");
//     }

//     try {
//       const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

//       // Send token to frontend
//       res.send(`
//         <script>
//           window.opener.postMessage({ token: "${token}" }, "https://polite-field-09918cc00.4.azurestaticapps.net");
//           window.close();
//         </script>
//       `);
//     } catch (error) {
//       console.error("Facebook Callback Error:", error);
//       res.redirect("https://polite-field-09918cc00.4.azurestaticapps.net/auth-failed");
//     }
//   })(req, res, next);
// };

// // Facebook Auth Failure
// exports.facebookFailure = (req, res) => {
//   res.status(401).json({ message: "Facebook authentication failed" });
// };


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/auth/google/callback",
//       passReqToCallback: true,
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         const { displayName, emails } = profile;
//         const email = emails[0].value;

//         let user = await User.findOne({ email });
//         console.log(user);
//         if (!user) {
//           // Signup: Create a new user
//           user = new User({ name: displayName, email, loginMethod: "google" });
//           await user.save();
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );
// // Google Auth Route (Triggers Google Login)
// exports.googleLogin = passport.authenticate("google", {
//   scope: ["email", "profile"],
//   prompt: "select_account", // Forces Google to show account selection
// });
// // Google Auth Callback
// exports.googleCallback = (req, res, next) => {
//   passport.authenticate("google", { session: false }, async (err, user) => {
//     if (err || !user) {
//       return res.redirect("https://polite-field-09918cc00.4.azurestaticapps.net/auth-failed");
//     }

//     try {
//       const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

//       // Send token to frontend
//       res.send(`
//         <script>
//           window.opener.postMessage({ token: "${token}" }, "https://polite-field-09918cc00.4.azurestaticapps.net");
//           window.close();
//         </script>
//       `);
//     } catch (error) {
//       console.error("Google Callback Error:", error);
//       res.redirect("https://polite-field-09918cc00.4.azurestaticapps.net/auth-failed");
//     }
//   })(req, res, next);
// };
// // Google Auth Failure
// exports.googleFailure = (req, res) => {
//   res.status(401).json({ message: "Google authentication failed" });
// };
// // Generate OTP
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
// // Validate email and send OTP
// exports.sendOtp = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already registered" });
//         }

//         const otp = generateOtp();
//         const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

//         await OTP.findOneAndUpdate(
//             { email },
//             { otp, expiresAt },
//             { upsert: true, new: true }
//         );

//         const emailContent = `
//             <p>Your OTP for registration is <strong>${otp}</strong>.</p>
//             <p>This OTP will expire in 10 minutes.</p>
//             <br>
//             <p>Thank you,<br>emailhelper468@gmail.com</p>
//         `;
//         await sendEmail({ to: email, subject: "Your OTP Code", html: emailContent });

//         res.status(200).json({ message: "OTP sent to email" });
//     } catch (error) {
//         console.error("Error sending OTP:", error.message);
//         res.status(500).json({ message: "Failed to send OTP" });
//     }
// };
// // Verify OTP and create user with hashed password
// exports.register = async (req, res) => {
//     const { name, email, age, role, password, otp, loginMethod } = req.body;

//     try {
//         const otpRecord = await OTP.findOne({ email });
//         if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
//             return res.status(400).json({ message: "Invalid or expired OTP" });
//         }

//         await OTP.deleteOne({ email });

//         const hashedPassword = await bcryptjs.hash(password, 10);
//         const isFormFilled = role === 'employee';
//         const loginMethod = 'traditional';
//         const newUser = new User({ name, email, age, role, password: hashedPassword, isFormFilled, loginMethod });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error("Error during registration:", error.message);
//         res.status(500).json({ message: "Registration failed" });
//     }
// };
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         if (!user.password) {
//             return res.status(500).json({ message: "No password found in the database for this user" });
//         }

//         const isMatch = await bcryptjs.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         const token = jwt.sign(
//             { id: user._id, isAdmin: user.isAdmin },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         res.json({ token, user });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
// exports.checkForm = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         if (user.loginMethod !== 'traditional') {
//             return res.json({ name: user.name, age: "age", role: "role", password: "password", description: "tasksAssigned", loginMethod: user.loginMethod });
//         }

//         if (!user.isFormFilled) {
//             return res.status(403).json({ message: "Complete your form to access other APIs", loginMethod: user.loginMethod });
//         }

//         res.json({ message: "Form is filled", loginMethod: user.loginMethod });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// exports.fillForm = async (req, res) => {
//     const { Taskassigned } = req.body;
//     console.log(req.body);
//     title = "Welcome Task";
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         if (user.loginMethod !== 'traditional') {
//             user.age = req.body.age;
//             user.role = req.body.role;
//             const hashedPassword = await bcryptjs.hash(req.body.password, 10);
//             user.password = hashedPassword;
//             await user.save();
//             // return res.json({ message: "User data saved", user });
//             const task = new Task({
//                 title,
//                 description: req.body.Taskassigned,
//                 customer: user.id,
//             });
//             await task.save();
//             user.tasksAssigned.push(task._id);
//             user.isFormFilled = true;
//             await user.save();

//             res.json({ message: "Form successfully filled and task assigned", user });
//         } else {
//             const task = new Task({
//                 title,
//                 description: Taskassigned,
//                 customer: req.user.id,
//             });
//             await task.save();
    
//             user.tasksAssigned.push(task._id);
//             user.isFormFilled = true;
//             await user.save();
    
//             res.json({ message: "Form successfully filled and task assigned", user });
//         }

        
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// exports.checkStatus = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const status = { user: user };
//         res.json({ status });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };



























const bcryptjs = require('bcryptjs');
const { User } = require("../models/user.model");
const { OTP } = require("../models/otp.model");
const { sendEmail } = require("../utils/email");
const jwt = require("jsonwebtoken");
const Task = require("../models/task.model");
require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const FRONTEND_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://polite-field-09918cc00.4.azurestaticapps.net' 
  : 'http://localhost:5173';

const BACKEND_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net' 
  : 'http://localhost:5000';

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${BACKEND_BASE_URL}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "emails"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { displayName, emails } = profile;
        const email = emails ? emails[0].value : `${profile.id}@facebook.com`; // Fallback if email is not provided

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({ name: displayName, email, loginMethod: "facebook" });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Facebook Auth Route (Triggers Facebook Login)
exports.facebookLogin = passport.authenticate("facebook", {
  scope: ["email"],
});

// Facebook Auth Callback
exports.facebookCallback = (req, res, next) => {
  passport.authenticate("facebook", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.redirect(`${FRONTEND_BASE_URL}/auth-failed`);
    }

    try {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Send token to frontend
      res.send(`
        <script>
          window.opener.postMessage({ token: "${token}" }, "${FRONTEND_BASE_URL}");
          window.close();
        </script>
      `);
    } catch (error) {
      console.error("Facebook Callback Error:", error);
      res.redirect(`${FRONTEND_BASE_URL}/auth-failed`);
    }
  })(req, res, next);
};

// Facebook Auth Failure
exports.facebookFailure = (req, res) => {
  res.status(401).json({ message: "Facebook authentication failed" });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_BASE_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { displayName, emails } = profile;
        const email = emails[0].value;

        let user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          // Signup: Create a new user
          user = new User({ name: displayName, email, loginMethod: "google" });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Google Auth Route (Triggers Google Login)
exports.googleLogin = passport.authenticate("google", {
  scope: ["email", "profile"],
  prompt: "select_account", // Forces Google to show account selection
});

// Google Auth Callback
exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.redirect(`${FRONTEND_BASE_URL}/auth-failed`);
    }

    try {
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Send token to frontend
      res.send(`
        <script>
          window.opener.postMessage({ token: "${token}" }, "${FRONTEND_BASE_URL}");
          window.close();
        </script>
      `);
    } catch (error) {
      console.error("Google Callback Error:", error);
      res.redirect(`${FRONTEND_BASE_URL}/auth-failed`);
    }
  })(req, res, next);
};

// Google Auth Failure
exports.googleFailure = (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
};

// Generate OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Validate email and send OTP
exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    const emailContent = `
      <p>Your OTP for registration is <strong>${otp}</strong>.</p>
      <p>This OTP will expire in 10 minutes.</p>
      <br>
      <p>Thank you,<br>emailhelper468@gmail.com</p>
    `;
    await sendEmail({ to: email, subject: "Your OTP Code", html: emailContent });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP and create user with hashed password
exports.register = async (req, res) => {
  const { name, email, age, role, password, otp, loginMethod } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await OTP.deleteOne({ email });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const isFormFilled = role === 'employee';
    const loginMethod = 'traditional';
    const newUser = new User({ name, email, age, role, password: hashedPassword, isFormFilled, loginMethod });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "No password found in the database for this user" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.checkForm = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.loginMethod !== 'traditional') {
      return res.json({ name: user.name, age: "age", role: "role", password: "password", description: "tasksAssigned", loginMethod: user.loginMethod });
    }

    if (!user.isFormFilled) {
      return res.status(403).json({ message: "Complete your form to access other APIs", loginMethod: user.loginMethod });
    }

    res.json({ message: "Form is filled", loginMethod: user.loginMethod });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.fillForm = async (req, res) => {
  const { Taskassigned } = req.body;
  console.log(req.body);
  title = "Welcome Task";
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.loginMethod !== 'traditional') {
      user.age = req.body.age;
      user.role = req.body.role;
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      user.password = hashedPassword;
      await user.save();
      // return res.json({ message: "User data saved", user });
      const task = new Task({
        title,
        description: req.body.Taskassigned,
        customer: user.id,
      });
      await task.save();
      user.tasksAssigned.push(task._id);
      user.isFormFilled = true;
      await user.save();

      res.json({ message: "Form successfully filled and task assigned", user });
    } else {
      const task = new Task({
        title,
        description: Taskassigned,
        customer: req.user.id,
      });
      await task.save();

      user.tasksAssigned.push(task._id);
      user.isFormFilled = true;
      await user.save();

      res.json({ message: "Form successfully filled and task assigned", user });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.checkStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const status = { user: user };
    res.json({ status });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};