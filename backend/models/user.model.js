import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    image: {
        type: Array,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    saved: {
        type:[String],
        default:[]
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

},{timestamps: true})

export const userModel = mongoose.models.user || mongoose.model('user', userSchema)