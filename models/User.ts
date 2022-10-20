import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  name: {
    /* The name of this user */

    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  username: {
    /* The username of this user */

    type: String,
    required: [true, "Please provide a username for this user"],
    maxlength: [60, "Username cannot be more than 60 characters"],
  },
  email: {
    /* The email of this user */

    type: String,
    required: [true, "Please provide a email for this user"],
    maxlength: [100, "Username cannot be more than 100 characters"],
  },
  image: {
    /* The image url of this user */

    type: String,
    required: [true, "Please provide a image url for this user"],
    maxlength: [200, "Image url cannot be more than 200 characters"],
  },
  followers: {
    type: Number,
    default: 0,
},
emailVerified:{
    type: Boolean,
    default: false
},
verified:{
    type: Boolean,
}



})

export default mongoose.models.User || mongoose.model('User', UserSchema)