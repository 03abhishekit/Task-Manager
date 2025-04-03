


import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username :  {
        type:String,
        required: true,
    },

    email:{
        type:String,
        required : true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    },

},{
    timestamps : true
},
)
;

// Middleware to delete tasks when a user is deleted
userSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    await Task.deleteMany({ userId: this._id });
    next();
  });

const User =  mongoose.model("User", userSchema);

export default User;