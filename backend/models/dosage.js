import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dosageSchema = new Schema({

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

const dosageModel = mongoose.model('dosage', dosageSchema);
export default dosageModel;