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

## UI

![Screenshot 2025-03-17 114447](https://github.com/user-attachments/assets/0a88870f-b98f-4abb-a1c1-fb2938bd092a)
![Screenshot 2025-03-17 114721](https://github.com/user-attachments/assets/0eecd003-e233-4a1b-b502-3ad455d03d65)
![Screenshot 2025-03-17 114939](https://github.com/user-attachments/assets/a370f876-f21c-4cc1-92bf-4173ab495698)
![Screenshot 2025-03-17 115001](https://github.com/user-attachments/assets/469c3050-49e6-4312-8231-d165e971f091)
![Screenshot 2025-03-17 115022](https://github.com/user-attachments/assets/1f97f084-5b5c-40e8-a446-f324c24e13fe)
![Screenshot 2025-03-17 115056](https://github.com/user-attachments/assets/4dc65780-4bcf-4b6d-a9cc-e069d08905b6)
![Screenshot 2025-03-17 115150](https://github.com/user-attachments/assets/5a11be41-45cd-47dc-b878-e92bfabe25e3)
![Screenshot 2025-03-17 115115](https://github.com/user-attachments/assets/b43f69d6-e149-4715-bfe2-c005e878ab9e)
![Screenshot 2025-03-21 145455](https://github.com/user-attachments/assets/78acccf1-7b1b-4a78-a46b-15bef1f6990d)
![Screenshot 2025-03-21 145425](https://github.com/user-attachments/assets/56ace337-4ec2-4a2f-8ae4-0cfc4d285f75)
![Screenshot 2025-03-21 145657](https://github.com/user-attachments/assets/5dca48a9-794d-4098-99a7-096d977f1b56)
![Screenshot 2025-03-21 145556](https://github.com/user-attachments/assets/bf226e43-91cb-4de6-9ee1-d19b2183c668)
![Screenshot 2025-03-21 145534](https://github.com/user-attachments/assets/08ac33cb-76a6-45df-bf9a-358508e00df8)
![Screenshot 2025-03-21 150030](https://github.com/user-attachments/assets/54c06904-ce18-477e-b8c3-d0081cb90112)
![Screenshot 2025-03-21 145902](https://github.com/user-attachments/assets/0ad3ffe2-cb56-4110-9e7a-bae50dda561b)
![Screenshot 2025-03-21 150255](https://github.com/user-attachments/assets/558f9b37-decc-433e-a6f8-6e5e1b623f13)


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
