import mongoose from "mongoose";

const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
    animalType: { // Category of Animals
        type: String,
        required: true,
        enum: ['Cat', 'Dog']
    },
    diseaseName: { // Name of the disease
        type: String,
        required: true,
        unique: true
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
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

diagnosisSchema.pre('save', function(next) {
    this.diseaseName = this.diseaseName.toLowerCase();
    next();
});

const diagnosisModel = mongoose.model('diagnosis', diagnosisSchema);
export default diagnosisModel;
