

// models/userProfile.js
import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  email:{type:String, required: true},
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  profession: { type: String, required: true },
  imageUrl: { type: String }, // Optional field for the image URL
});

// Use ES module export syntax
const userProfile = mongoose.model('userProfile', userProfileSchema);
export default userProfile;
