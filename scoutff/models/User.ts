import mongoose, { Schema } from "mongoose";

interface IUser {
    name: string;
    email: string;
    image: string;
    password: string;
    role: string;
    username: string;

}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    image: String,
    role:  {
        type: String,
        default: "user",
        enum: ["user", "admin", "commentator", "premium"]
    },
})

export default mongoose.models.User || mongoose.model("User",userSchema)

