import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const drugSchema = new Schema({

    diseaseName : {
        type: [String],
        required: true
    },
    drugName: {
        type: String,
        required: true,
        unique: true
    },
    drugUnit: {
        type: String,
        required: true,
        enum: ["mg", "mcg", "g", "ml", "ul"]
    },
    drugDoseLowerLimit: {
        type: Number,
        required: true
    },
    drugDoseUpperLimit: {
        type: Number,
        required: true
    },
    drugConc: {
        type: [Number],
        requred: true,
    },
    drugMode: {
        type: String,
        required: true,
        enum: ['Tablet', 'Injection']
    },
    animalType: {
        type: String,
        required: true,
        enum: ['Cat', 'Dog']
    },
    drugNote: {
        type: String,
        required: false
    }


}, {
    versionKey: false
})

drugSchema.pre('save', function(next) {
    this.drugName = this.drugName.toLowerCase();
    next();
});


const drugModel = mongoose.model('drug', drugSchema);
export default drugModel;