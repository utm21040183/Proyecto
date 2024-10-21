import { Schema, model } from "mongoose";
const CalificacionSchema = new Schema({

    id_equipo: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    ronda: {
        type: Number,
        required: true
    },
    id_evento: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    calificaciones: [{
        id_metrica: {
            type: Schema.Types.ObjectId, 
            required: true
        },
        calificacion: {
            type: Number,
            required: true
        }
    }]
});

const Calificacion = model("Calificacion", CalificacionSchema);

export default Calificacion;
