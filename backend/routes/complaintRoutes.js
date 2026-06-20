const express = require("express");
const router = express.Router();

const {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    updateComplaintStatus
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");
const adminProtect = require("../middleware/adminMiddleware");

// create complaint
router.post("/", protect, createComplaint);

// get my complaints
router.get("/", protect, getMyComplaints);

// get all complaints (admin only)
router.get("/all", protect, adminProtect, getAllComplaints);

// update complaint status (admin only)
router.put("/:id", protect, adminProtect, updateComplaintStatus);

module.exports = router;