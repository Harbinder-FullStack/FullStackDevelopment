import mongoose from 'mongoose';

const URI = 'mongodb://localhost:27017/studentDb';

function connectToDatabase() {
  // Database connection logic can be placed here if needed
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });
}
module.exports = { connectToDatabase };
