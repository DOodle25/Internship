# StarOneCRM

StarOneCRM is a comprehensive Customer Relationship Management (CRM) system built using the MERN stack (MongoDB, Express.js, React, Node.js). This project was developed as part of my internship, and it includes a wide range of features designed to streamline user management, task assignment, payment processing, and communication.

Hosted on Azure live url:
Frontend --> https://polite-field-09918cc00.4.azurestaticapps.net
Backend --> http://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net
my Website --> Alynor.wiki

test id : admin - cocply135@gmail.com - admin123(as placeholder on live site)
test id : customer - 210305105302@paruluniversity.ac.in - admin123

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

# Internship Log

<details>
<summary>December 2024</summary>

<details>
<summary>Day 1 (23-12-24)</summary>
Met the employees and got to know the team leads and their respective tasks. There wasn’t much work for me on the first day. I familiarized myself with the projects they were working on and discussed my strengths with the team. They assessed which team or project I might be suitable for. I was assigned a task to implement API CRUD operations for a CRM.
</details>

<details>
<summary>Day 2 (24-12-24)</summary>
Worked on the CRM CRUD task. Added API calls to `/crud/` for creating a user, deleting a user, updating user data, and reading a list of users with all their details.
</details>

<details>
<summary>Day 3 (25-12-24)</summary>
**Holiday**
</details>

<details>
<summary>Day 4 (26-12-24)</summary>
Hosted the frontend and backend separately on Azure using Azure Function App and Azure Static Web App. Configured the API calls with CORS settings. Faced issues with the backend not allowing PATCH requests, which caused problems with update calls.
</details>

<details>
<summary>Day 5 (27-12-24)</summary>
Integrated the user list data into a `react-data-table-component`. Added functionality for searching and sorting the data by name, role, age, and email. Updated the UI for the user data table using the selected color palette.
</details>

<details>
<summary>Day 6 (28-12-24)</summary>
**Holiday**
</details>

<details>
<summary>Day 7 (29-12-24)</summary>
**Holiday**
</details>

<details>
<summary>Day 8 (30-12-24)</summary>
Hosted the application with the new UI and populated it with 4,400 dummy user records generated through API calls using a JavaScript script executed with Node.js. Tested the sorting and searching functionalities.
</details>

<details>
<summary>Day 9 (31-12-24)</summary>
Presented the project to the team lead. Received feedback to add backend validation for the data and a frontend UI to display errors and success messages. Started working on these tasks.
</details>

</details>

<details>
<summary>January 2025</summary>
<details>

<summary>Day 10 (01-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 11 (02-01-25)</summary>
Implemented backend validation for the following:
- Age must be a number.
- Name must be a string.
- Role must be a string.
- Email must match a specific format using regular expressions.
</details>

<details>
<summary>Day 12 (03-01-25)</summary>
Enhanced the frontend UI using `react-toastify` to display success and error messages. Added error handling for scenarios such as duplicate email, invalid age (non-numeric), invalid name (non-string), and incorrectly formatted email.
</details>

<details>
<summary>Day 13 (04-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 14 (05-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 15 (06-01-25)</summary>
Deployed the application again using GitHub YML files to Azure. Tested the `react-toastify` notifications and backend validation. Demonstrated the project to the team lead and asked for feedback.
</details>

<details>
<summary>Day 16 (07-01-25)</summary>
Created a backend for user login functionality and tested it by hosting on Azure. Presented it to the team lead for feedback.
</details>

<details>
<summary>Day 17 (08-01-25)</summary>
Tested login functionality without a password and with credentials for users. Created separate roles for admin and user access.
</details>

<details>
<summary>Day 18 (09-01-25)</summary>
Created a data flow diagram for authentication and show it to team lead.
![Data Flow Diagram](content/DFD.jpeg)
</details>

<details>
<summary>Day 19 (10-01-25)</summary>
 Added variables `isFormFilled`, `isFormValidated`, and `Token` to validate user accounts. Implemented functionality to ensure only admins can validate and allow users to update their accounts. Tested on Azure and demonstrated to the team lead.
</details>

<details>
<summary>Day 20 (11-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 21 (12-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 22 (13-01-25)</summary>
Developed a routing system where routes are accessible based on active variables (`isFormFilled`, `isFormValidated`, etc.). Tested by hosting on Azure and presenting to the team lead.
</details>

<details>
<summary>Day 23 (14-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 24 (15-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 25 (16-01-25)</summary>
Added password-protected login functionality using NodeMailer for OTP verification. Separated routes and improved security measures. Hosted and tested on Azure. Showed the results to the team lead. 
</details>

<details>
<summary>Day 26 (17-01-25)</summary>
Integrated NodeMailer functionality to send OTP for secure login. Tested various use cases, including expired OTPs and incorrect emails, by hosting on Azure and demonstrating to the team lead
</details>

<details>
<summary>Day 27 (18-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 28 (19-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 29 (20-01-25)</summary>
Enhanced login security by separating admin and user routes and ensuring restricted access to sensitive functionalities. Tested by hosting on Azure.
</details>

<details>
<summary>Day 30 (21-01-25)</summary>
Optimized and refactored the backend code for the login and validation system. Added tests for edge cases. Hosted on Azure and demonstrated improvements to the team lead.
</details>

<details>
<summary>Day 31 (22-01-25)</summary>
Debugged and resolved minor issues in the OTP-based login functionality. Improved error handling for failed API calls and incorrect user inputs.
</details>

<details>
<summary>Day 32 (23-01-25)</summary>
Added frontend UI feedback for invalid OTPs and incorrect email formats using react-toastify. Tested integration thoroughly on Azure.
</details>

<details>
<summary>Day 33 (24-01-25)</summary>
mproved admin routes to allow bulk validation of user accounts. Tested by simulating high-traffic scenarios on Azure.
</details>

<details>
<summary>Day 34 (25-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 35 (26-01-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 36 (27-01-25)</summary>
Fixed issues with the user update functionality. Verified changes and tested compatibility with backend validation logic.
</details>

<details>
<summary>Day 37 (28-01-25)</summary>
Implemented additional backend security checks for OTP validity duration and enhanced error logging.
</details>

<details>
<summary>Day 38 (29-01-25)</summary>
Improved UI responsiveness for mobile devices, especially for login and validation pages. Tested cross-browser compatibility. 
</details>

<details>
<summary>Day 39 (30-01-25)</summary>
Streamlined the deployment process by automating Azure deployments through GitHub Actions. Tested the pipeline end-to-end.
</details>

<details>
<summary>Day 40 (31-01-25)</summary>
Fixed edge cases in the routing logic to handle scenarios where variables like `isFormFilled` and `isFormValidated` are undefined or null.
</details>

</details>

<details>
<summary>February 2025</summary>

<details>
<summary>Day 41 (01-02-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 42 (02-02-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 43 (03-02-25)</summary>
Conducted a final round of testing and documentation for the login, validation, and routing functionalities. Prepared for a project review. 
</details>

<details>
<summary>Day 44 (04-02-25)</summary>
Created three types of users: **Admin, Customer, and Employee**. Implemented role-based access control to ensure users could only access specific functionalities based on their roles.
</details>

<details>
<summary>Day 45 (05-02-25)</summary>
Developed a task creation system where a **Customer** can create a task request. Integrated the feature with the backend API and ensured data validation.  
</details>

<details>
<summary>Day 46 (06-02-25)</summary>
Implemented task verification functionality. An **Admin** can review and verify a task created by a **Customer** before assigning it further.  
</details>

<details>
<summary>Day 47 (07-02-25)</summary>
Added the ability for an **Admin** to assign a **Customer** to an **Employee** after verification. Implemented role-based API calls to restrict actions based on user type.
</details>

<details>
<summary>Day 48 (08-02-25)</summary>
 **Holiday**
</details>

<details>
<summary>Day 49 (09-02-25)</summary>
 **Holiday**
</details>

<details>
<summary>Day 50 (10-02-25)</summary>
  Restricted **Customers** and **Employees** to view only their own profiles. Introduced an access control mechanism ensuring they cannot access or modify others’ profiles.
</details>

<details>
<summary>Day 51 (11-02-25)</summary>
  Developed a **chat functionality** for assigned tasks. Customers and Employees can communicate only with their assigned individual to discuss tasks.
</details>

<details>
<summary>Day 52 (12-02-25)</summary>
  Implemented real-time chat functionality for assigned tasks. Messages are stored in the backend, and users receive real-time updates.
</details>

<details>
<summary>Day 53 (13-02-25)</summary>
  Created an **Admin Panel UI** for task assignment and chat monitoring. Developed a backend system to enable admins to assign and track tasks efficiently.
</details>

<details>
<summary>Day 54 (14-02-25)</summary>
  Tested the full system, including user roles, task creation, verification, assignment, and chat. Fixed bugs related to user access restrictions and task assignment.
</details>

<details>
<summary>Day 55 (15-02-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 56 (16-02-25)</summary>
**Holiday**
</details>

<details>
<summary>Day 57 (17-02-25)</summary>
</details>

<details>
<summary>Day 58 (18-02-25)</summary>
</details>

<details>
<summary>Day 59 (19-02-25)</summary>
</details>

<details>
<summary>Day 60 (20-02-25)</summary>
</details>

<details>
<summary>Day 61 (21-02-25)</summary>
</details>

<details>
<summary>Day 62 (22-02-25)</summary>
</details>

<details>
<summary>Day 63 (23-02-25)</summary>
</details>

<details>
<summary>Day 64 (24-02-25)</summary>
</details>

<details>
<summary>Day 65 (25-02-25)</summary>
</details>

<details>
<summary>Day 66 (26-02-25)</summary>
</details>

<details>
<summary>Day 67 (27-02-25)</summary>
</details>

<details>
<summary>Day 68 (28-02-25)</summary>
</details>

</details>

<details>
<summary>March 2025</summary>

<details>
<summary>Day 69 (01-03-25)</summary>
</details>

<details>
<summary>Day 70 (02-03-25)</summary>
</details>

<details>
<summary>Day 71 (03-03-25)</summary>
</details>

<details>
<summary>Day 72 (04-03-25)</summary>
</details>

<details>
<summary>Day 73 (05-03-25)</summary>
</details>

<details>
<summary>Day 74 (06-03-25)</summary>
</details>

<details>
<summary>Day 75 (07-03-25)</summary>
</details>

<details>
<summary>Day 76 (08-03-25)</summary>
</details>

<details>
<summary>Day 77 (09-03-25)</summary>
</details>

<details>
<summary>Day 78 (10-03-25)</summary>
</details>

<details>
<summary>Day 79 (11-03-25)</summary>
</details>

<details>
<summary>Day 80 (12-03-25)</summary>
</details>

<details>
<summary>Day 81 (13-03-25)</summary>
</details>

<details>
<summary>Day 82 (14-03-25)</summary>
</details>

<details>
<summary>Day 83 (15-03-25)</summary>
</details>

<details>
<summary>Day 84 (16-03-25)</summary>
</details>

<details>
<summary>Day 85 (17-03-25)</summary>
</details>

<details>
<summary>Day 86 (18-03-25)</summary>
</details>

<details>
<summary>Day 87 (19-03-25)</summary>
</details>

<details>
<summary>Day 88 (20-03-25)</summary>
</details>

<details>
<summary>Day 89 (21-03-25)</summary>
</details>

<details>
<summary>Day 90 (22-03-25)</summary>
</details>

<details>
<summary>Day 91 (23-03-25)</summary>
</details>

<details>
<summary>Day 92 (24-03-25)</summary>
</details>

<details>
<summary>Day 93 (25-03-25)</summary>
</details>

<details>
<summary>Day 94 (26-03-25)</summary>
</details>

<details>
<summary>Day 95 (27-03-25)</summary>
</details>

<details>
<summary>Day 96 (28-03-25)</summary>
</details>

<details>
<summary>Day 97 (29-03-25)</summary>
</details>

<details>
<summary>Day 98 (30-03-25)</summary>
</details>

<details>
<summary>Day 99 (31-03-25)</summary>
</details>

</details>

<details>
<summary>April 2025</summary>

<details>
<summary>Day 100 (01-04-25)</summary>
</details>

<details>
<summary>Day 101 (02-04-25)</summary>
</details>

<details>
<summary>Day 102 (03-04-25)</summary>
</details>

<details>
<summary>Day 103 (04-04-25)</summary>
</details>

<details>
<summary>Day 104 (05-04-25)</summary>
</details>

<details>
<summary>Day 105 (06-04-25)</summary>
</details>

<details>
<summary>Day 106 (07-04-25)</summary>
</details>

<details>
<summary>Day 107 (08-04-25)</summary>
</details>

<details>
<summary>Day 108 (09-04-25)</summary>
</details>

<details>
<summary>Day 109 (10-04-25)</summary>
</details>

<details>
<summary>Day 110 (11-04-25)</summary>
</details>

<details>
<summary>Day 111 (12-04-25)</summary>
</details>

<details>
<summary>Day 112 (13-04-25)</summary>
</details>

<details>
<summary>Day 113 (14-04-25)</summary>
</details>

<details>
<summary>Day 114 (15-04-25)</summary>
</details>

<details>
<summary>Day 115 (16-04-25)</summary>
</details>

<details>
<summary>Day 116 (17-04-25)</summary>
</details>

<details>
<summary>Day 117 (18-04-25)</summary>
</details>

<details>
<summary>Day 118 (19-04-25)</summary>
</details>

<details>
<summary>Day 119 (20-04-25)</summary>
</details>

<details>
<summary>Day 120 (21-04-25)</summary>
</details>

</details>
