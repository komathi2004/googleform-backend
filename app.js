const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Form = require('./models/form');

const app = express();
const PORT = process.env.PORT || 3000;
//middleware is created
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect('mongodb+srv://komathi:komathi@cluster0.hpha8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/forms', async (req, res) => {
  try {
    const { title, fields } = req.body;
    
    const newForm = new Form({
      title,
      fields
    });
    
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ message: 'Failed to save form' });
  }
});

// Get all forms
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Failed to fetch forms' });
  }
});

// Get a specific form
app.get('/api/forms/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ message: 'Failed to fetch form' });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});