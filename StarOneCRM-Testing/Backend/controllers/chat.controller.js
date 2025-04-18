const Message = require("../models/message.model");
const User = require("../models/user.model").User;
const Task = require("../models/task.model");
const mongoose = require("mongoose");
const { getGfs } = require("../db");

exports.getAssignedTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "tasksAssigned",
        populate: [
          {
            path: "customer employee",
            select: "name email role profileImage",
          },
          {
            path: "messages",
            options: { sort: { createdAt: -1 } }, // Sort messages by createdAt in descending order
          },
        ],
      })
      .exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let gfs;
    try {
      gfs = getGfs();
    } catch (error) {
      return res.status(500).json({ error: "GridFS not initialized" });
    }

    const tasksWithProfileImagesAndUnreadCounts = await Promise.all(
      user.tasksAssigned.map(async (task) => {
        const updatedTask = { ...task.toObject() };

        // Fetch profile images
        if (task.customer && task.customer.profileImage) {
          updatedTask.customer.profileImage = await fetchProfileImage(
            task.customer.profileImage,
            gfs
          );
        }
        if (task.employee && task.employee.profileImage) {
          updatedTask.employee.profileImage = await fetchProfileImage(
            task.employee.profileImage,
            gfs
          );
        }

        // Calculate unread messages for customer and employee
        let customerUnread = 0;
        let employeeUnread = 0;

        for (const message of task.messages) {
          if (!message.isRead) {
            if (message.sender.toString() === task.customer._id.toString()) {
              customerUnread++;
            } else if (message.sender.toString() === task.employee._id.toString()) {
              employeeUnread++;
            }
          } else {
            break; // Stop counting when the first read message is encountered
          }
        }

        updatedTask.customerUnread = customerUnread;
        updatedTask.employeeUnread = employeeUnread;

        return updatedTask;
      })
    );

    res.status(200).json({
      success: true,
      tasksAssigned: tasksWithProfileImagesAndUnreadCounts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const fetchProfileImage = async (imageId, gfs) => {
  try {
    let chunks = [];
    const readStream = gfs.openDownloadStream(
      new mongoose.Types.ObjectId(imageId)
    );
    return new Promise((resolve, reject) => {
      readStream.on("data", (chunk) => chunks.push(chunk));
      readStream.on("end", () => {
        resolve(
          `data:image/png;base64,${Buffer.concat(chunks).toString("base64")}`
        );
      });
      readStream.on("error", (err) => reject(err));
    });
  } catch (error) {
    return null;
  }
};
// exports.getAssignedPeople = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate({
//         path: "tasksAssigned",
//         populate: {
//           path: "customer employee",
//           select: "name email role",
//         },
//       })
//       .exec();
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json({ success: true, tasksAssigned: user.tasksAssigned });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.unassignCustomerFromEmployee = async (req, res) => {
//   try {
//     const { customerId, employeeId } = req.body;
//     if (!customerId || !employeeId) {
//       return res
//         .status(400)
//         .json({ error: "Customer ID and Employee ID are required" });
//     }
//     const customer = await User.findById(customerId);
//     const employee = await User.findById(employeeId);
//     if (!customer || customer.role !== "customer") {
//       return res.status(404).json({ error: "Customer not found or invalid" });
//     }
//     if (!employee || employee.role !== "employee") {
//       return res.status(404).json({ error: "Employee not found or invalid" });
//     }
//     customer.assignedTo = customer.assignedTo.filter(
//       (id) => id.toString() !== employeeId
//     );
//     employee.assignedPeople = employee.assignedPeople.filter(
//       (id) => id.toString() !== customerId
//     );
//     await customer.save();
//     await employee.save();
//     res.status(200).json({
//       success: true,
//       message: `Customer ${customer.name} unassigned from Employee ${employee.name}`,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.assignCustomerToEmployee = async (req, res) => {
//   try {
//     const { customerId, employeeId, taskId } = req.body;
//     if (!customerId || !employeeId || !taskId) {
//       return res
//         .status(400)
//         .json({ error: "Customer ID, Employee ID, and Task ID are required" });
//     }
//     const customer = await User.findById(customerId);
//     const employee = await User.findById(employeeId);
//     const task = await Task.findById(taskId);
//     if (!customer || customer.role !== "customer") {
//       return res.status(404).json({ error: "Customer not found or invalid" });
//     }
//     if (!employee || employee.role !== "employee") {
//       return res.status(404).json({ error: "Employee not found or invalid" });
//     }
//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }
//     if (!customer.assignedTo) {
//       customer.assignedTo = [];
//     }
//     if (!employee.assignedPeople) {
//       employee.assignedPeople = [];
//     }
//     if (!customer.assignedPeople) {
//       customer.assignedPeople = [];
//     }
//     if (!employee.assignedPeople) {
//       employee.assignedPeople = [];
//     }
//     if (!customer.tasks) {
//       customer.tasks = [];
//     }
//     if (!employee.tasks) {
//       employee.tasks = [];
//     }
//     if (customer.assignedTo.includes(employeeId)) {
//       return res
//         .status(400)
//         .json({ error: "Customer is already assigned to this employee" });
//     }
//     customer.assignedTo.push(employeeId);
//     employee.assignedPeople.push(customerId);
//     customer.assignedPeople.push(employeeId);
//     employee.tasksAssigned.push(taskId);
//     employee.tasks.push(taskId);
//     customer.tasks.push(taskId);
//     task.customer = customerId;
//     task.employee = employeeId;
//     task.isEmployeeAssigned = true;
//     await customer.save();
//     await employee.save();
//     await task.save();
//     res.status(200).json({
//       success: true,
//       message: `Customer ${customer.name} assigned to Employee ${employee.name} and Task ${task.title}`,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// exports.assignCustomerToEmployee = async (req, res) => {
//   try {
//     const { customerId, employeeId, taskId } = req.body;
//     if (!customerId || !employeeId || !taskId) {
//       return res
//         .status(400)
//         .json({ error: "Customer ID, Employee ID, and Task ID are required" });
//     }

//     const customer = await User.findById(customerId);
//     const employee = await User.findById(employeeId);
//     const task = await Task.findById(taskId);

//     if (!customer || customer.role !== "customer") {
//       return res.status(404).json({ error: "Customer not found or invalid" });
//     }
//     if (!employee || employee.role !== "employee") {
//       return res.status(404).json({ error: "Employee not found or invalid" });
//     }
//     if (!task) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     // Initialize all arrays to empty arrays if they don't exist
//     customer.assignedTo = Array.isArray(customer.assignedTo) ? customer.assignedTo : [];
//     employee.assignedPeople = Array.isArray(employee.assignedPeople) ? employee.assignedPeople : [];
//     customer.tasks = Array.isArray(customer.tasks) ? customer.tasks : [];
//     employee.tasks = Array.isArray(employee.tasks) ? employee.tasks : [];
//     employee.tasksAssigned = Array.isArray(employee.tasksAssigned) ? employee.tasksAssigned : [];

//     // Check if task is already assigned to another employee
//     if (task.employee && task.employee.toString() !== employeeId.toString()) {
//       const oldEmployee = await User.findById(task.employee);
//       if (oldEmployee) {
//         // Initialize old employee's arrays if they don't exist
//         oldEmployee.tasks = Array.isArray(oldEmployee.tasks) ? oldEmployee.tasks : [];
//         oldEmployee.tasksAssigned = Array.isArray(oldEmployee.tasksAssigned) ? oldEmployee.tasksAssigned : [];
//         oldEmployee.assignedPeople = Array.isArray(oldEmployee.assignedPeople) ? oldEmployee.assignedPeople : [];

//         // Remove task from old employee's lists
//         oldEmployee.tasks = oldEmployee.tasks.filter(
//           (t) => t && t.toString() !== taskId.toString()
//         );
//         oldEmployee.tasksAssigned = oldEmployee.tasksAssigned.filter(
//           (t) => t && t.toString() !== taskId.toString()
//         );
        
//         // Remove customer from assignedPeople if this was the only task
//         const hasOtherTasks = oldEmployee.tasksAssigned.some(
//           (t) => t && t.toString() !== taskId.toString() && 
//                  t.customer && t.customer.toString() === customerId.toString()
//         );
//         if (!hasOtherTasks) {
//           oldEmployee.assignedPeople = oldEmployee.assignedPeople.filter(
//             (p) => p && p.toString() !== customerId.toString()
//           );
//         }
        
//         await oldEmployee.save();
//       }
//     }

//     // Update customer-employee relationship if not already assigned
//     if (!customer.assignedTo.some(id => id && id.toString() === employeeId.toString())) {
//       customer.assignedTo.push(employeeId);
//     }

//     if (!employee.assignedPeople.some(id => id && id.toString() === customerId.toString())) {
//       employee.assignedPeople.push(customerId);
//     }

//     // Update task assignment
//     if (!employee.tasksAssigned.some(id => id && id.toString() === taskId.toString())) {
//       employee.tasksAssigned.push(taskId);
//     }
//     if (!employee.tasks.some(id => id && id.toString() === taskId.toString())) {
//       employee.tasks.push(taskId);
//     }
//     if (!customer.tasks.some(id => id && id.toString() === taskId.toString())) {
//       customer.tasks.push(taskId);
//     }

//     // Update task details
//     task.customer = customerId;
//     task.employee = employeeId;
//     task.isEmployeeAssigned = true;

//     await customer.save();
//     await employee.save();
//     await task.save();

//     res.status(200).json({
//       success: true,
//       message: `Customer ${customer.name} assigned to Employee ${employee.name} and Task ${task.title}`,
//     });
//   } catch (error) {
//     console.error("Error in assignCustomerToEmployee:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.assignCustomerToEmployee = async (req, res) => {
  try {
    const { customerId, employeeId, taskId } = req.body;
    if (!customerId || !employeeId || !taskId) {
      return res
        .status(400)
        .json({ error: "Customer ID, Employee ID, and Task ID are required" });
    }

    const customer = await User.findById(customerId);
    const employee = await User.findById(employeeId);
    const task = await Task.findById(taskId);

    if (!customer || customer.role !== "customer") {
      return res.status(404).json({ error: "Customer not found or invalid" });
    }
    if (!employee || employee.role !== "employee") {
      return res.status(404).json({ error: "Employee not found or invalid" });
    }
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Initialize all arrays to empty arrays if they don't exist
    customer.assignedTo = Array.isArray(customer.assignedTo) ? customer.assignedTo : [];
    // employee.assignedPeople = Array.isArray(employee.assignedPeople) ? employee.assignedPeople : [];
    customer.tasks = Array.isArray(customer.tasks) ? customer.tasks : [];
    employee.tasks = Array.isArray(employee.tasks) ? employee.tasks : [];
    employee.tasksAssigned = Array.isArray(employee.tasksAssigned) ? employee.tasksAssigned : [];

    // Check if task is already assigned to another employee
    if (task.employee && task.employee.toString() !== employeeId.toString()) {
      const oldEmployee = await User.findById(task.employee);
      if (oldEmployee) {
        // Initialize old employee's arrays if they don't exist
        oldEmployee.tasks = Array.isArray(oldEmployee.tasks) ? oldEmployee.tasks : [];
        oldEmployee.tasksAssigned = Array.isArray(oldEmployee.tasksAssigned) ? oldEmployee.tasksAssigned : [];
        // oldEmployee.assignedPeople = Array.isArray(oldEmployee.assignedPeople) ? oldEmployee.assignedPeople : [];

        // Remove task from old employee's lists
        oldEmployee.tasks = oldEmployee.tasks.filter(
          (t) => t && t.toString() !== taskId.toString()
        );
        oldEmployee.tasksAssigned = oldEmployee.tasksAssigned.filter(
          (t) => t && t.toString() !== taskId.toString()
        );
        
        // Remove customer from assignedPeople if this was the only task
        const hasOtherTasks = oldEmployee.tasksAssigned.some(
          (t) => t && t.toString() !== taskId.toString() && 
                 t.customer && t.customer.toString() === customerId.toString()
        );
        // if (!hasOtherTasks) {
        //   oldEmployee.assignedPeople = oldEmployee.assignedPeople.filter(
        //     (p) => p && p.toString() !== customerId.toString()
        //   );
        // }
        
        await oldEmployee.save();

        // Delete all messages related to this task
        await Message.deleteMany({ task: taskId });
        task.messages = []; // Clear messages array in task
      }
    }

    // Update customer-employee relationship if not already assigned
    if (!customer.assignedTo.some(id => id && id.toString() === employeeId.toString())) {
      customer.assignedTo.push(employeeId);
    }

    // if (!employee.assignedPeople.some(id => id && id.toString() === customerId.toString())) {
    //   employee.assignedPeople.push(customerId);
    // }

    // Update task assignment
    if (!employee.tasksAssigned.some(id => id && id.toString() === taskId.toString())) {
      employee.tasksAssigned.push(taskId);
    }
    if (!employee.tasks.some(id => id && id.toString() === taskId.toString())) {
      employee.tasks.push(taskId);
    }
    if (!customer.tasks.some(id => id && id.toString() === taskId.toString())) {
      customer.tasks.push(taskId);
    }

    // Update task details
    task.customer = customerId;
    task.employee = employeeId;
    task.isEmployeeAssigned = true;

    await customer.save();
    await employee.save();
    await task.save();

    res.status(200).json({
      success: true,
      message: `Customer ${customer.name} assigned to Employee ${employee.name} and Task ${task.title}. All previous messages deleted.`,
    });
  } catch (error) {
    console.error("Error in assignCustomerToEmployee:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("customer", "name email")
      .populate("employee", "name email")
      .exec();

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.sendMessage = async (req, res) => {
  try {
    const { content, taskId } = req.body;
    if (!content || !taskId) {
      return res
        .status(400)
        .json({ error: "Message content and task ID are required" });
    }
    const sender = await User.findById(req.user.id);
    const task = await Task.findById(taskId).populate("customer employee");
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (
      ![task.customer._id.toString(), task.employee._id.toString()].includes(
        req.user.id.toString()
      )
    ) {
      return res.status(403).json({
        error: "You are not authorized to send messages for this task",
      });
    }
    const message = await Message.create({
      sender: req.user.id,
      task: taskId,
      content,
    });
    task.messages.push(message._id);
    await task.save();
    io.to(taskId).emit("receiveMessage", { message, sender });
    res
      .status(201)
      .json({ success: true, message: "Message sent", data: message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getMessagesByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId)
      .populate("customer employee", "name email role")
      .populate({
        path: "messages",
        populate: { path: "sender", select: "name email" },
      });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (
      ![task.customer.id.toString(), task.employee.id.toString()].includes(
        req.user.id.toString()
      )
    ) {
      return res.status(403).json({
        error: "You are not authorized to view messages for this task",
      });
    }
    res.status(200).json({ success: true, messages: task.messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createTask = async (req, res) => {
  try {
    const { title, description, customerId
      // , assignedPeople 
    } = req.body;

    const newTask = new Task({ title, description, customer: customerId
      // , assignedPeople 
    });
    await newTask.save();

    await User.findByIdAndUpdate(customerId, { $push: { tasksCreated: newTask._id } });
    await User.findByIdAndUpdate(customerId, { $push: { tasksAssigned: newTask._id } });

    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// exports.updateTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
//       new: true,
//     });
//     res.status(200).json({ success: true, task: updatedTask });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// exports.updateTask = async (req, res) => {
//   try {
//     // Try to get ID from params first, then from body if not found
//     const taskId = req.params.taskId || req.body._id;
    
//     if (!taskId) {
//       return res.status(400).json({ error: "Task ID is required" });
//     }

//     const updatedTask = await Task.findByIdAndUpdate(
//       taskId,
//       req.body,
//       { new: true }
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ error: "Task not found" });
//     }

//     res.status(200).json({ success: true, task: updatedTask });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updateTask = async (req, res) => {
  try {
    // Try to get ID from multiple possible locations
    const taskId = req.params.taskId || req.params.id || req.body._id || req.body.id;
    
    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
      await User.findByIdAndUpdate(task.customer, { $pull: { tasksCreated: taskId } });

      await User.findByIdAndUpdate(task.employee, { $pull: { tasksAssigned: taskId } });
      await User.findByIdAndUpdate(task.customer, { $pull: { tasksAssigned: taskId } });
  
      // await User.updateMany(
      //   // { _id: { $in: task.assignedPeople } },
      //   { $pull: { tasksAssigned: taskId } }
      // );
    await Message.deleteMany({ _id: { $in: task.messages } });
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({
      success: true,
      message: "Task and associated messages deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId).populate(
      "customer employee messages"
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
