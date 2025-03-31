# StarOneCRM

StarOneCRM is a comprehensive Customer Relationship Management (CRM) system built using the MERN stack (MongoDB, Express.js, React, Node.js). This project was developed as part of my internship, and it includes a wide range of features designed to streamline user management, task assignment, payment processing, and communication.

Hosted on Azure live url:

# [Frontend](https://polite-field-09918cc00.4.azurestaticapps.net)

# [Backend](http://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net)

# [Alynor.wiki](https://www.alynor.wiki/)

# Test Logins

admin: cocply135@gmail.com - admin123

employee: pdipen135@gmail.com - admin123

customer: 210305105302@paruluniversity.ac.in - admin123

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

## Screenshots

![Screenshot 2025-03-06 133438](https://github.com/user-attachments/assets/078ff6ed-db76-4f5c-b28a-13cbde2039fe)
![Screenshot 2025-03-06 133456](https://github.com/user-attachments/assets/df268ecd-c82f-4bd1-bb7d-fa6498e0ea82)
![Screenshot 2025-03-06 133518](https://github.com/user-attachments/assets/a13dcbe9-1ad3-40fd-85e1-238b74adcb72)
![Screenshot 2025-03-06 133535](https://github.com/user-attachments/assets/2c7a2a32-d74b-493e-965a-676d1fd8e8e0)
![Screenshot 2025-03-06 133545](https://github.com/user-attachments/assets/55153310-9553-4338-990a-3c0d9a839a2a)
![Screenshot 2025-03-06 133625](https://github.com/user-attachments/assets/7c5913a2-b679-436d-952e-7ad9798918d5)
![Screenshot 2025-03-06 133639](https://github.com/user-attachments/assets/24472238-d49c-4236-ae16-06c823da5eda)
![Screenshot 2025-03-06 133659](https://github.com/user-attachments/assets/87c23bad-7d74-43f3-abcb-a281e0abd714)
![Screenshot 2025-03-06 133730](https://github.com/user-attachments/assets/6e605162-998b-4083-a641-372a8022df22)
![Screenshot 2025-03-06 133759](https://github.com/user-attachments/assets/a1cb6be5-cbb2-409f-9b1e-4032b0a1890b)
![Screenshot 2025-03-06 133831](https://github.com/user-attachments/assets/d03521cf-7b4e-4514-87e6-3d9bac285879)
![Screenshot 2025-03-06 133843](https://github.com/user-attachments/assets/204fc0a0-915b-4c76-9644-59f055f0273c)

## Videos

https://github.com/user-attachments/assets/33a5cfd5-48e1-4d85-a4be-76e5f633ea43

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
