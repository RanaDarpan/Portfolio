import express from 'express';
import Project from '../models/Project.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// GET all projects
router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST create project
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    // Parse JSON arrays if sent as strings
    if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
    if (typeof data.features === 'string') data.features = JSON.parse(data.features);
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      data.image = `data:${req.file.mimetype};base64,${base64Image}`;
    }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update project
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
    if (typeof data.features === 'string') data.features = JSON.parse(data.features);
    if (req.file) {
      const base64Image = req.file.buffer.toString('base64');
      data.image = `data:${req.file.mimetype};base64,${base64Image}`;
    }
    const project = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
