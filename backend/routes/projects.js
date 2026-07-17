const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { calculateCost, getScheduleTemplate, estimateTotalDuration } = require('../utils/costEngine');
const { requireApiKey } = require('../middleware/auth');
const {
  validate,
  projectCreateSchema,
  projectUpdateSchema,
  estimateSchema,
  taskStatusSchema,
} = require('../middleware/validate');

// GET all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// POST estimate cost without saving (for the live cost estimator UI)
// Defined before '/:id' so it isn't shadowed, and is a read-only calc so no auth required
router.post('/estimate', validate(estimateSchema), async (req, res, next) => {
  try {
    const { area, buildingType, floors, materialFactor, laborFactor } = req.body;
    const result = calculateCost({ area, buildingType, floors, materialFactor, laborFactor });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET single project
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST new project — uses costEngine for full breakdown
router.post('/', requireApiKey, validate(projectCreateSchema), async (req, res, next) => {
  const { name, location, area, budget, buildingType, floors, materialFactor, laborFactor } = req.body;

  try {
    const costResult = calculateCost({ area, buildingType, floors, materialFactor, laborFactor });
    const tasks = getScheduleTemplate(buildingType);
    const totalDays = estimateTotalDuration(tasks); // now uses real CPM, not naive sum

    const project = new Project({
      name,
      location,
      area,
      budget,
      buildingType,
      floors,
      estimatedCost: costResult.summary,
      costBreakdown: costResult.breakdown,
      materialBreakdown: costResult.materialBreakdown,
      tasks,
      estimatedDurationDays: totalDays,
    });

    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

// PUT update project status or task status
router.put('/:id', requireApiKey, validate(projectUpdateSchema), async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// PATCH update a specific task's status within a project
router.patch('/:id/tasks/:taskIndex', requireApiKey, validate(taskStatusSchema), async (req, res, next) => {
  try {
    const { status } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const taskIdx = parseInt(req.params.taskIndex, 10);
    if (Number.isNaN(taskIdx) || taskIdx < 0 || taskIdx >= project.tasks.length) {
      return res.status(400).json({ message: 'Invalid task index' });
    }

    project.tasks[taskIdx].status = status;
    await project.save();
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// DELETE project
router.delete('/:id', requireApiKey, async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
