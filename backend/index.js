import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import createError from "http-errors";
import session from "express-session";
import bcrypt from "bcrypt";
import { Server } from "socket.io";
import http from "http";

// Import routes (same as yours)
import { InventoryManagementRoutes } from './Routes/InventoryManagementRoutes.js';
import { ProcurementRoutes } from "./Routes/SupplyChainManagement/ProcurementRoutes.js";
import { logisticsandShippingRoutes } from "./Routes/SupplyChainManagement/logisticsandShippingRoutes.js";
import { payrollRoutes } from "./Routes/HumanResources/payrollRoutes.js";
import { recruitmentRoutes } from "./Routes/HumanResources/recruitment.js";
import { perfomancemanagementRoutes } from "./Routes/HumanResources/perfomancemanagementRoutes.js";
import { accountsreceivablesRoutes } from "./Routes/Accounting/accountsreceivables.js";
import { accountspayablesRoutes } from "./Routes/Accounting/accountspayable.js";
import { expenseaccountRoutes } from "./Routes/Accounting/expenseaccount.js";
import { leadmanagementRoutes } from "./Routes/Sales and Customer Relation/leadmanagementRoutes.js";
import { opportunitytrackingRoutes } from "./Routes/Sales and Customer Relation/opportunitytracking.js";
import { salesfocustingRoutes } from "./Routes/Sales and Customer Relation/salesfocusting.js";
import { queryRoutes } from "./Routes/Sales and Customer Relation/queries.js";
import { materialsRoutes } from "./Routes/Manufacturing Production/materialsRoutes.js";
import { productionordersRoutes } from "./Routes/Manufacturing Production/productionordersRoutes.js";
import { qualitycontrolRoutes } from "./Routes/Manufacturing Production/qualitycontrolRoutes.js";
import { warehouseLocationRoutes } from "./Routes/Manufacturing Production/LocationRoutes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// CORS
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// MongoDB
const uri = "mongodb://localhost:27017/erp";
mongoose.connect(uri, { socketTimeoutMS: 90000, connectTimeoutMS: 90000 })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String },
  email: { type: String },
  role: { type: String, enum: ['admin', 'manager', 'client'], required: true },
  department: { type: String }, // ✅ included
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Register
app.post('/api/register', async (req, res) => {
  const { username, fullname, email, role, department, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      fullname,
      email,
      role,
      department, // ✅ FIXED: added department
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = 'some-authentication-token';
      res.json({ department: user.department, role: user.role, token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
});

// User list
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Auth middleware
const authenticateUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const user = await User.findOne({ token });
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

// Protected routes
app.get('/api/admin/dashboard', authenticateUser, authorizeRoles('admin'), (req, res) => res.json({ message: 'Welcome to admin dashboard' }));
app.get('/api/manager/dashboard', authenticateUser, authorizeRoles('admin', 'manager'), (req, res) => res.json({ message: 'Welcome to manager dashboard' }));
app.get('/api/client/dashboard', authenticateUser, authorizeRoles('admin', 'manager', 'client'), (req, res) => res.json({ message: 'Welcome to client dashboard' }));

// Feature routes
app.use("/inventorymanagement", InventoryManagementRoutes);
app.use("/Procurement", ProcurementRoutes);
app.use("/logisticsandShipping", logisticsandShippingRoutes);
app.use("/payroll", payrollRoutes);
app.use("/recruitment", recruitmentRoutes);
app.use("/perfomancemanagement", perfomancemanagementRoutes);
app.use("/accountsreceivables", accountsreceivablesRoutes);
app.use("/accountspayables", accountspayablesRoutes);
app.use("/expenseaccount", expenseaccountRoutes);
app.use("/queries", queryRoutes);
app.use("/leadmanagement", leadmanagementRoutes);
app.use("/opportunitytracking", opportunitytrackingRoutes);
app.use("/salesfocusting", salesfocustingRoutes);
app.use("/materials", materialsRoutes);
app.use("/productionorders", productionordersRoutes);
app.use("/qualitycontrol", qualitycontrolRoutes);
app.use("/warehouselocations", warehouseLocationRoutes);

// 404
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode || 500).send(err.message);
});

// Server
const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Connected to port " + port));
