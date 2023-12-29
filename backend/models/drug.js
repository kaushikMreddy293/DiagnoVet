import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const drugSchema = new Schema({

    diseaseName : {
        type: String,
        required: true
    },
    drugName: {
        type: String,
        required: true
    },
    drugDosage: {
        type: Number,
        required: true
    },
    drugUnit: {
        type: String,
        required: true,
        enum: ["mg", "mcg", "g", "ml", "ul"]

    },
    drugMode: {
        type: String,
        required: true,
        enum: ['Tablet', 'Injection']
    },
    animalType: {
        type: String,
        required: true,
        enum: ['Cat', 'Dog', 'Bird']
    }


}, {
    versionKey: false
})

const drugModel = mongoose.model('drug', drugSchema);
export default drugModel;