import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Job } from "../models/JobModel.js";


export const createJob = catchAsyncError(async (req, res, next) => {
    const { companyName , position, salary, location, description, skills, vacancy} = req.body;
    if(!companyName || !position || !salary || !location || !description || !skills || skills.length == 0 || !vacancy) return next(new ErrorHandler("Please enter all fields", 400));

    //create the new job
    const newJob = await Job.create({
      companyName,
      position,
      salary,
      location,
      description,
      skills,
      vacancy,
      logo: {
        public_id: "public_id",
        url: "url",
      }
    });

    res.status(200).json({
        success: true,
        message: "JobPost created successfully",
        job : newJob
    });
});

//get all the jobs
export const getAllJobs = catchAsyncError(async (req, res, next) => {

    const jobs = await Job.find();

  res.status(200).json({
    success: true,
    jobs
  });
});


//get a single job
export const getOneJob = catchAsyncError(async (req, res, next) => {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }
    
    res.status(200).json({
        success: true,
        job,
    });
})

//update a job
export const updateJob = catchAsyncError(async (req, res, next) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }
    
    const { companyName , position, salary, location, description, skills, jobType, workFrom, vacancy} = req.body;

    if(companyName)job.companyName = companyName;
    if(position)job.position = position;
    if(salary)job.salary = salary;
    if(location)job.location = location;
    if(description)job.description = description;
    if(skills && skills.length > 0)job.skills = skills
    if(jobType)job.jobType = jobType;
    if(workFrom)job.workFrom = workFrom;
    if(vacancy)job.vacancy = vacancy;
   
    job.save();

    res.status(200).json({
        success: true,
        message: "JobPost updated successfully",
        job
    });
})

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        return next(new ErrorHandler("Job not found", 404));
    }

    await Job.deleteOne(job);

    res.status(200).json({
        success: true,
        message: "JobPost deleted successfully",
    });
})

