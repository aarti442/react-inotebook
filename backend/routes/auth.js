const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/Users'); // Ensure the correct file path
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'ImRTBDhRT';
// Route to create a new user
router.post('/createuser', [
    // Validation rules
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        const newUser = new User({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        const data = {
            user: {
                id: savedUser.id
            }
        }
        
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.status(201).json({success: true,authtoken : authtoken});
    } catch (error) {
        res.status(500).json({ error: 'Error saving user', details: error.message });
    }
});

// Route to fetch all users (optional)
router.get('/getusers', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
});

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


});

router.get('/getuser', fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router;
