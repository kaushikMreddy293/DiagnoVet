import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    }
}, {
    timestamps: true,
    versionKey: false
});

const userModel = mongoose.model('user', userSchema);
export default userModel;