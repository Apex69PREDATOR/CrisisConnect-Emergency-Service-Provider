# CRISIS CONNECT

## Overview

CrisisConnect is a comprehensive web application designed to streamline emergency service requests and coordination. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), CrisisConnect provides a user-friendly platform for requesting emergency assistance such as fire, police, hospital, and medical support.

## System Requirements
- Node.js
- MongoDB
- Express
- React
- npm (Node Package Manager)
- A web browser (e.g., Google Chrome, Mozilla Firefox)
- MongoDB compass

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Apex69PREDATOR/CrisisConnect-Emergency-Service-Provider.git
2. **Change Directory**:
   ```bash
   cd CrisisConnect
3. **Install Node Modules**:
   ```bash
   npm install
4. **Install cors**:
   ```bash
   npm install cors
5. **Install Mongoose**:
   ```bash
   npm install mongoose
6. **Install MongooDB**:
   ```bash
   npm install mongodb
7. **Initialise The Project**:
   ```bash
   npm init
8. **Modify the .env file**:
    Go to the .env file and replace 'your email' with your email and 'your app password' with your app password(If you dont have an app password create it in your google account)
9. **Start the express server**:
   ```bash
   node ./backend/server.js
10. **Create a collection  in CrisisConnect DB**:
   After executing the command "node ./backend/server.js" a database named "CrisisConnect" will be created. Just go through the database in MongoDB Compass and create a collection named "admin".
11. **Create a component in admin collection**:
   Create a component inside admin collection under CrisisConnect DB. Just add  ---->
   {
  "_id": {
    "$oid": "66e164d1a2f6f07f2010c0c0"
  },
  "email":"your email in .env file",
  "password":"any password of your choice"
}
12. **you will use the above email and password in login through admin portal**
