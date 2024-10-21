import { Schema, model } from "mongoose";

const TeamSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    id_participantes: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    lider: {
        type: Schema.Types.ObjectId,  
        required: true
    },
    ronda: {
        type: Number,
        required: true
    },
    id_calificacion: {
        type: Schema.Types.ObjectId,  
        required: true
    }
});

export const TeamsModel = model("Teams", TeamSchema);
