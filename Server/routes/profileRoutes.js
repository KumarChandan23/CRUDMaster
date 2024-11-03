// routes/profileRoutes.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import userProfile from '../models/userProfile.js';

const router = express.Router();

// Define __dirname in ES module scope
const __dirname = path.resolve();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Create a Profile
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { email, userName, mobileNumber, profession } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newProfile = new userProfile({ email, userName, mobileNumber, profession, imageUrl });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ error: 'Error creating profile' });
  }
});

// Fetch all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await userProfile.find({});
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profiles' });
  }
});

// Fetch a Profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await userProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// Update a Profile by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { email, userName, mobileNumber, profession } = req.body;
    const profile = await userProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    // Delete the old image if a new one is uploaded
    if (req.file) {
      const oldImagePath = path.join(__dirname, profile.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      profile.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Update profile fields
    profile.email = email || profile.email;
    profile.userName = userName || profile.userName;
    profile.mobileNumber = mobileNumber || profile.mobileNumber;
    profile.profession = profession || profile.profession;

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

// Delete a Profile by ID
router.delete('/:id', async (req, res) => {
  try {
    const profile = await userProfile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    // Delete the profile image from the server
    const imagePath = path.join(__dirname, profile.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await userProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile and image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting profile' });
  }
});

export default router;
