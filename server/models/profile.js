import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    games: {
        type: Array,
    },

}, {timestamps: true});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;