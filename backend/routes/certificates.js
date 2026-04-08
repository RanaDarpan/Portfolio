import express from 'express';
import Certificate from '../models/Certificate.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// GET all certificates
router.get('/', async (_req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// GET single certificate
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json(cert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
});

// POST create certificate
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const cert = await Certificate.create(data);
    res.status(201).json(cert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update certificate
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const cert = await Certificate.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json(cert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE certificate
router.delete('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Certificate not found' });
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
});

export default router;
