import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    type: String,
    title: String,
    description: String,
    client: String,
    requirements: [String],
    potential_impact: String,
    contact: {
      email: String,
      phone: String
    }
});

export default mongoose.models.Idea || mongoose.model('Idea', ideaSchema);