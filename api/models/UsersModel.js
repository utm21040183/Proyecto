import { Schema, model, Model } from "mongoose";
const UserSchema = new Schema ({

    nombre:{
        type: String,
        required: true
    },
    correo:{
        type: String,
        required: true
    },
    curp:{
        type: String,
        required: true
    },
    rol:{
        type: String ,
        required: true
    }
})

export const UserModel = model("Users",UserSchema)