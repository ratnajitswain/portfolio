import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    type: String,
  category: String,
  company: String,
  position: String,
  description: String,
  contact: {
    email: String,
    phone: String
  },
  duration: String
});

export default mongoose.models.Job || mongoose.model('Job', jobSchema);