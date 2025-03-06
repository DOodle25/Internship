const bcryptjs = require("bcryptjs");
require("dotenv").config();
const FacebookStrategy = require("passport-facebook").Strategy;
const { FRONTEND_BASE_URL, BACKEND_BASE_URL } = require("../utils/config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { generateOtp } = require("../utils/otp");
const jwt = require("jsonwebtoken");
const { OTP } = require("../models/otp.model");
const passport = require("passport");
const { sendEmail } = require("../utils/email");
const { User } = require("../models/user.model");

// Verify OTP and create user with hashed password
exports.register = async (req, res) => {
  const { name, email, age, role, password, otp, loginMethod } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email });
    if (
      !otpRecord ||
      otpRecord.otp !== otp ||
      otpRecord.expiresAt < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await OTP.deleteOne({ email });

    const hashedPassword = await bcryptjs.hash(password, 10);
    const isFormFilled = role === "employee";
    const loginMethod = "traditional";
    const newUser = new User({
      name,
      email,
      age,
      role,
      password: hashedPassword,
      isFormFilled,
      loginMethod,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};
// Login with email and password
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.password) {
      return res
        .status(500)
        .json({ message: "No password found in the database for this user" });
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
    await sendEmail({
      to: email,
      subject: "Your OTP Code",
      html: emailContent,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Google Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_BASE_URL}/api/auth/google/callback`,
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
      return res.redirect(`${FRONTEND_BASE_URL}/api/auth/auth-failed`);
    }

    try {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send token to frontend
      res.send(`
        <script>
          window.opener.postMessage({ token: "${token}" }, "${FRONTEND_BASE_URL}");
          window.close();
        </script>
      `);
    } catch (error) {
      console.error("Google Callback Error:", error);
      res.redirect(`${FRONTEND_BASE_URL}/api/auth/auth-failed`);
    }
  })(req, res, next);
};
// Google Auth Failure
exports.googleFailure = (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
};

// Facebook Auth
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `${BACKEND_BASE_URL}/api/auth/facebook/callback`,
      profileFields: ["id", "displayName", "emails"],
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { displayName, emails } = profile;
        const email = emails ? emails[0].value : `${profile.id}@facebook.com`; // Fallback if email is not provided

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            name: displayName,
            email,
            loginMethod: "facebook",
          });
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
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send token to frontend
      res.send(`
        <script>
          window.opener.postMessage({ token: "${token}" }, "${FRONTEND_BASE_URL}/#/");
          window.close();
        </script>
      `);
    } catch (error) {
      console.error("Facebook Callback Error:", error);
      res.redirect(`${FRONTEND_BASE_URL}/api/auth/auth-failed`);
    }
  })(req, res, next);
};
// Facebook Auth Failure
exports.facebookFailure = (req, res) => {
  res.status(401).json({ message: "Facebook authentication failed" });
};
