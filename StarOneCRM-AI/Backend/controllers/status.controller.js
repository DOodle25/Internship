const bcryptjs = require("bcryptjs");
const { User } = require("../models/user.model");
const Task = require("../models/task.model");

exports.checkForm = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.loginMethod !== "traditional") {
      return res.json({
        name: user.name,
        age: "age",
        role: "role",
        password: "password",
        description: "tasksAssigned",
        loginMethod: user.loginMethod,
      });
    }
    if (!user.isFormFilled) {
      return res.status(403).json({
        message: "Complete your form to access other APIs",
        loginMethod: user.loginMethod,
      });
    }
    res.json({ message: "Form is filled", loginMethod: user.loginMethod });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// exports.fillForm = async (req, res) => {
//   const { Taskassigned } = req.body;
//   title = "Welcome Task";
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (user.loginMethod !== "traditional") {
//       user.age = req.body.age;
//       user.role = req.body.role;
//       const hashedPassword = await bcryptjs.hash(req.body.password, 10);
//       user.password = hashedPassword;
//       await user.save();
//       const task = new Task({
//         title,
//         description: req.body.Taskassigned,
//         customer: user.id,
//       });
//       await task.save();
//       user.tasksAssigned.push(task._id);
//       user.isFormFilled = true;
//       await user.save();
//       res.json({ message: "Form successfully filled and task assigned", user });
//     } else {
//       const task = new Task({
//         title,
//         description: Taskassigned,
//         customer: req.user.id,
//       });
//       await task.save();
//       user.tasksAssigned.push(task._id);
//       user.isFormFilled = true;
//       await user.save();
//       res.json({ message: "Form successfully filled and task assigned", user });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.checkStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    const status = { user: user };
    // console.log(status);
    res.json({ status });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.fillForm = async (req, res) => {
  const { Taskassigned } = req.body;
  title = "Welcome Task";
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.loginMethod !== "traditional") {
      user.age = req.body.age;
      user.role = req.body.role;
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      user.password = hashedPassword;
      await user.save();
      if (user.role !== "employee") {
        const task = new Task({
          title,
          description: req.body.Taskassigned,
          customer: user.id,
        });
        await task.save();
        user.tasksAssigned.push(task._id);
      }
      user.isFormFilled = true;
      await user.save();
      res.json({ message: "Form successfully filled and task assigned", user });
    } else {
      if (user.role !== "employee") {
        const task = new Task({
          title,
          description: Taskassigned,
          customer: req.user.id,
        });
        await task.save();
        user.tasksAssigned.push(task._id);
      }
      user.isFormFilled = true;
      await user.save();
      res.json({ message: "Form successfully filled and task assigned", user });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};