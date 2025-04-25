import mongoose from 'mongoose';
import app from './app';
import { MONGO_URI } from './config/db'; // Importing the secret


const PORT = process.env.PORT || 4000;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in the configuration.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
        console.log('ENV JWT_SECRET:', process.env.JWT_SECRET);
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
