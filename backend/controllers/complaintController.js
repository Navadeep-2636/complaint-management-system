const Complaint = require("../models/Complaint");

// Create Complaint
const createComplaint = async (req, res) => {
    try {
        const { title, description } = req.body;

        const complaint = await Complaint.create({
            title,
            description,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            complaint
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get user complaints
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            complaints
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            complaints
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = ["pending", "in-progress", "resolved"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            success: true,
            complaint
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports = { createComplaint, getMyComplaints, getAllComplaints,
    updateComplaintStatus};  