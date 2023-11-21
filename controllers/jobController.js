// controllers/jobController.js
const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createJob = async (req, res) => {
  const { title, company, location, description } = req.body;

  try {
    const newJob = new Job({ title, company, location, description });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const { applicantName, applicantEmail, coverLetter } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const newApplication = new Application({
      job: jobId,
      applicantName,
      applicantEmail,
      coverLetter,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
