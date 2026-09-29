import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, getAllUsers, getUserDashboardData, updateUserProfile, createBooking, addToWishlist, getAllPackages } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TravelSphere Backend Server Running — MySQL travel_db' });
});

// Get all packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await getAllPackages();
    res.json({ success: true, packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch packages.' });
  }
});

// Book a tour package
app.post('/api/bookings', async (req, res) => {
  try {
    const { userId, packageId, startDate, endDate, guests, totalAmount } = req.body;
    if (!userId || !packageId) {
      return res.status(400).json({ success: false, message: 'userId and packageId are required.' });
    }
    const bookingId = await createBooking({ userId, packageId, startDate, endDate, guests, totalAmount });
    res.json({ success: true, message: 'Trip booked successfully in MySQL travel_db!', bookingId });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create booking in database.' });
  }
});

// Add to wishlist
app.post('/api/wishlist', async (req, res) => {
  try {
    const { userId, packageId } = req.body;
    if (!userId || !packageId) {
      return res.status(400).json({ success: false, message: 'userId and packageId are required.' });
    }
    const wishlistId = await addToWishlist({ userId, packageId });
    res.json({ success: true, message: 'Saved to wishlist in MySQL travel_db!', wishlistId });
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ success: false, message: 'Failed to add to wishlist.' });
  }
});

// Get complete live user dashboard data (profile, bookings, wishlist, stats) from MySQL
app.get('/api/user-dashboard-data', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: 'Email query parameter is required.' });

    const dashboardData = await getUserDashboardData(email);
    if (!dashboardData) return res.status(404).json({ success: false, message: 'User not found in database.' });

    res.json({ success: true, ...dashboardData });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, message: 'Database error fetching dashboard data.' });
  }
});

// Get live profile by email from MySQL users table
app.get('/api/users/profile', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: 'User not found in travel_db.' });

    const { password: pw, ...profile } = user;
    res.json({ success: true, user: profile });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ success: false, message: 'Database error.' });
  }
});

// Update live profile in MySQL
app.put('/api/users/profile', async (req, res) => {
  try {
    const { userId, name, phone } = req.body;
    if (!userId) return res.status(400).json({ success: false, message: 'userId is required.' });

    const updatedUser = await updateUserProfile(userId, { name, phone });
    res.json({ success: true, message: 'Profile updated in MySQL travel_db successfully!', user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile in database.' });
  }
});

// Get all users from database users table
app.get('/api/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users from database.' });
  }
});

// Register endpoint - stores new user in database `users` table
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password, phone, country } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Full name, email address, and password are required.' 
      });
    }

    // Check if user already exists in users table
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this email address already exists. Please login instead.' 
      });
    }

    // Save to users table in database
    const newUser = await createUser({
      name: fullName,
      email,
      password,
      phone
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully! You can now log in.',
      user: newUser
    });
  } catch (error) {
    console.error('Registration Error:', error);
    // Handle MySQL duplicate email error
    if (error.code === 'ER_DUP_ENTRY' || (error.message && error.message.includes('Duplicate entry'))) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please login instead.'
      });
    }
    res.status(400).json({ 
      success: false, 
      message: error.message || 'Registration failed. Please try again.' 
    });
  }
});

// Login endpoint - queries database `users` table
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required.' 
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email address or password.' 
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email address or password.' 
      });
    }

    // Return user information omitting password
    const { password: pw, ...userProfile } = user;

    res.json({
      success: true,
      message: 'Login successful!',
      user: userProfile,
      token: `mock-jwt-token-${user.user_id || user.id}-${Date.now()}`
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during authentication.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TravelSphere Backend API running on http://localhost:${PORT}`);
});
