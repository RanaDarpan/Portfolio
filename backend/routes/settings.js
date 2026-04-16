import express from 'express';
import Setting from '../models/Setting.js';

const router = express.Router();

// Get settings (we'll just use the first document as a singleton)
router.get('/', async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({ filterTags: [] });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update filter tags
router.put('/tags', async (req, res) => {
  try {
    const { filterTags } = req.body;
    
    if (!Array.isArray(filterTags)) {
      return res.status(400).json({ error: 'filterTags must be an array' });
    }

    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting();
    }
    
    settings.filterTags = filterTags;
    await settings.save();
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
