import { PlayerProps } from '@/lib/api/player'
import mongoose, { InferSchemaType } from 'mongoose'


/* PetSchema will correspond to a collection in your MongoDB database. */
const PlayerSchema = new mongoose.Schema({
  name: {
    /* The name of this user */

    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  slug: {
    /* The username of this user */

    type: String,
    alias: "username",
    required: [true, "Please provide a username for this user"],
    maxlength: [60, "Username cannot be more than 60 characters"],
  },
  flag: {
    /* The email of this user */

    type: String,
    alias : "nationality",
    required: [true, "Please provide a email for this user"],
    maxlength: [100, "Username cannot be more than 100 characters"],
  },
  photo: {
    /* The image url of this user */

    type: String,
    alias: "image",
    required: [true, "Please provide a image url for this user"],
    maxlength: [200, "Image url cannot be more than 200 characters"],
  },

  rating : {
    type : Number,
    default : 0
  }




})


export default mongoose.models.Player || mongoose.model('Player', PlayerSchema)