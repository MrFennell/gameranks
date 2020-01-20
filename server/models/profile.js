import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    games: {
        type: Array,
    },
    played: {
        type: Array,
    },
    wishlist: {
        type: Array,
    },
    likes: {
        type: Array,
    },
    owned: {
        type: Array,
    },

}, {timestamps: true});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;