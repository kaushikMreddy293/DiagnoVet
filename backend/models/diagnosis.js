import mongoose from "mongoose";

const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
    animalType: { // Category of Animals
        type: String,
        required: true,
        enum: ['Cat', 'Dog', 'Bird']
    },
    diseaseName: { // Name of the disease
        type: String,
        required: true
    },
    diseaseSymptoms: { // Symptoms related to disease
        type: [String], 
        required: true
    },
    drugMode: { // Mode of treatment
        type: String,
        required: true,
        enum: ['Tablet', 'Injection']
    },
    drugNames: { // Reccommended medicines
        type: [String], 
        required: true
    },
    diseaseOtherNames: { // Other names of the same disease
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

const diagnosisModel = mongoose.model('diagnosis', diagnosisSchema);
export default diagnosisModel;
