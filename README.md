### **Getting Started**  

Follow these steps to set up and run the TripMate project on your local machine.

---

### **1. Prerequisites**  
Ensure the following are installed on your system:  
- **Node.js**: Version 16 or later  
- **MongoDB**: Local or cloud instance  
- **Code Editor**: Visual Studio Code or equivalent  

---

### **2. Installation**  

#### Clone the Repository  
```bash
git clone <repository-url>
cd TripMate
```

#### Install Dependencies  
Navigate to the `frontend` and `backend` directories and run:  
```bash
npm install
```

---

### **3. Configuration**  

#### Frontend Configuration  
Create a `.env` file in the `frontend` directory and add the following:  
```env
VITE_GOOGLE_PLACES_API_KEY=<your-google-places-api-key>
VITE_GOOGLE_GEMINI_AI_API_KEY=<your-gemini-ai-api-key>
VITE_GOOGLE_AUTH_CLIENT_ID=<your-google-auth-client-id>
REACT_APP_GOOGLE_CLIENT_SECRET=<your-google-auth-client-secret>
```

#### Backend Configuration  
Create a `.env` file in the `backend` directory and add the following:  
```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
```

---

### **4. Running the Application**  

#### Start MongoDB  
Ensure MongoDB is running locally or use a cloud connection.

#### Start  
Navigate to the directory and start the server:  
```bash
npm run dev
```


#### Access the Application  
- Open [http://localhost:5173](http://localhost:5173) in your browser.  

--- 

That's it! Your TripMate project is up and running. 🎉
