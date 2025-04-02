import Job from "../models/job_model.js";
import Company from "../models/company_model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };
        const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(400).json({
                message: "No job found",
                success: false
            });
        }
        res.status(200).json({
            jobs,
            success: true
        });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getjobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "No job found",
                success: false
            });
        }
        res.status(200).json({
            job,
            success: true
        });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }
}   

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_By: adminId });
        if (!jobs) {
            return res.status(400).json({
                message: "No job found",
                success: false
            });
        }
        res.status(200).json({
            jobs,
            success: true
        });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Server Error" });
    }   
}
