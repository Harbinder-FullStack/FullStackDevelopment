import { Schema, model } from 'mongoose';

const studentSchema = new Schema(
    {
        name: { type: String, required: true },
        rollNo: { type: String, required: true, unique: true },
        course: { type: String },
        age: { type: Number }
    }, 
    { collection: 'students' }
);

export default model('Student', studentSchema);
