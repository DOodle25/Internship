![image2 - Copy](https://github.com/user-attachments/assets/3fc3f7f3-8e67-4d25-8d81-eaca668061fd)

# StarOneCRM

StarOneCRM is a comprehensive Customer Relationship Management (CRM) system built using the MERN stack (MongoDB, Express.js, React, Node.js). This project was developed as part of my internship, and it includes a wide range of features designed to streamline user management, task assignment, payment processing, and communication.

# Hosted on Azure live url:

## [Frontend](https://polite-field-09918cc00.4.azurestaticapps.net)

## [Backend](http://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net)

## [Alynor.wiki](https://www.alynor.wiki/)

## Test Logins

**admin: cocply135@gmail.com - admin123**

**employee: pdipen135@gmail.com - admin123**

**customer: 210305105302@paruluniversity.ac.in - admin123**

## Videos



https://github.com/user-attachments/assets/3134d68e-4cd8-48a6-a0bb-26fd14550e87



## UI

![Screenshot 2025-04-26 104615](https://github.com/user-attachments/assets/f080484a-c7ea-41ef-b7c4-ab27da9479ca)
![Screenshot 2025-04-26 104605](https://github.com/user-attachments/assets/d4e6bef5-7040-46c2-949f-c259f19af2e4)

![Screenshot 2025-03-17 114939](https://github.com/user-attachments/assets/a370f876-f21c-4cc1-92bf-4173ab495698)
![Screenshot 2025-04-26 104809](https://github.com/user-attachments/assets/62634ea1-c00e-4836-8973-cb7e59f51658)
![Screenshot 2025-04-26 104742](https://github.com/user-attachments/assets/483e1906-ea9e-4254-b7bf-18826dddb34f)
![Screenshot 2025-04-26 104703](https://github.com/user-attachments/assets/b7480147-cad7-492e-a5b1-bf7ccb2c7adb)
![Screenshot 2025-04-26 104653](https://github.com/user-attachments/assets/cc3405ff-c092-49cf-9507-0cc92355b709)
![Screenshot 2025-04-26 104644](https://github.com/user-attachments/assets/a46b800d-9808-4084-b45b-3a56edf8eca9)
![Screenshot 2025-04-26 104631](https://github.com/user-attachments/assets/799fa905-221b-4100-98c1-85166428d1ac)
![Screenshot 2025-04-26 105044](https://github.com/user-attachments/assets/894b4e12-114c-415a-a138-aece5faf961a)
![Screenshot 2025-04-26 104950](https://github.com/user-attachments/assets/b5c2789c-6ff1-4462-b40c-9c0bcb4ad950)
![Screenshot 2025-04-26 104942](https://github.com/user-attachments/assets/fba82cf7-19e4-46d6-8b49-4e472fb466d6)
![Screenshot 2025-04-26 104932](https://github.com/user-attachments/assets/7e9dafd2-0b72-40f2-8a43-f0bc395a4d8d)
![Screenshot 2025-04-26 104926](https://github.com/user-attachments/assets/7282b810-f2ab-4109-98df-3f56d37206b3)
![Screenshot 2025-04-26 104857](https://github.com/user-attachments/assets/8982a7ba-0924-4a7d-91b2-2d3393e32560)
![Screenshot 2025-04-26 104849](https://github.com/user-attachments/assets/650edd61-9b4c-4ae3-b8da-3218777bd68e)
![Screenshot 2025-04-26 104825](https://github.com/user-attachments/assets/a0436629-dd16-4b1b-a491-6378ba1287aa)
![Screenshot 2025-04-26 104817](https://github.com/user-attachments/assets/92f825cc-79a7-4c1e-809e-49e87369f612)

![Screenshot 2025-03-21 145455](https://github.com/user-attachments/assets/78acccf1-7b1b-4a78-a46b-15bef1f6990d)
![Screenshot 2025-03-21 145425](https://github.com/user-attachments/assets/56ace337-4ec2-4a2f-8ae4-0cfc4d285f75)



## Features

- **User Authentication**:

  - Google Login
  - Facebook Login
  - Traditional OTP with Nodemailer
  - Three-layer registration process (Login → Fill Required Data → Admin Verification)

- **User Management**:

  - Edit Profile
  - Upload Images
  - Create Tasks
  - Assign Tasks to Employees
  - View Payment History

- **Admin Features**:

  - Verify User Data
  - Manage Users, Tasks, and Assigned Tasks
  - Beautiful Data Tables for Users and Tasks
  - RFM Model for User Segmentation

- **Payment Processing**:

  - Stripe Integration
  - Payment History Visible to Both Employees and Customers

- **Real-time Communication**:

  - Socket.io Chat
  - Video Call using Peer.js and Socket.io

- **File Management**:
  - Photo Uploads using Multer and GridFS


## Setup

### Prerequisites

- Node.js
- MongoDB
- Stripe Account
- Google and Facebook Developer Accounts for OAuth

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/DOodle25/Internship
   cd StarOneCRM
   ```

   make sure to use the proper version of StarOneCRM-vX (PreviousVersion are maintained)

2. **Install Dependencies**

   ```bash
   npm install
   cd client
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGODB_URI =
   PORT =
   JWT_SECRET =
   GOOGLE_CLIENT_ID =
   GOOGLE_CLIENT_SECRET =
   FACEBOOK_CLIENT_ID =
   FACEBOOK_CLIENT_SECRET =
   NODE_ENV =
   STRIPE_SECRET_KEY =
   BASE_URL =
   STRIPE_WEBHOOK_SECRET =
   ```

4. **Run the Application**

   ```bash
   npm run dev
   ```

   This will start both the server and the client concurrently.

## How to Contribute

We welcome contributions from the community! Here’s how you can get started:

1. **Fork the Repository**

   Click the "Fork" button on the top right corner of this repository.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/DOodle25/Internship.git
   cd StarOneCRM
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

   Make your changes and ensure that the code is well-tested.

5. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Add your commit message here"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

   Go to the original repository and click on "New Pull Request". Select your branch and submit the PR.

## Technologies Used

- **Frontend**: React, Redux, Socket.io, Peer.js
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Google OAuth, Facebook OAuth, JWT, Nodemailer
- **Payment**: Stripe
- **File Management**: Multer, GridFS
- **Real-time Communication**: Socket.io, Peer.js

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to my mentors and colleagues for their guidance and support during the development of this project.
- Thanks to the open-source community for providing the tools and libraries that made this project possible.

## Contact

For any inquiries, please contact [Dipen Patel] at [emailhelper468@gmail.com].

---

Thank you for checking out StarOneCRM! We hope you find it useful and look forward to your contributions! 🚀
