const Video = require("../models/videosModel");

exports.getVideosByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const videos = await Video.find({ categories: categoryName });
    res.status(200).json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Failed to fetch videos by category" });
  }
};





exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }); 

    res.status(200).json({
      message: "Videos fetched successfully",
      videos
    });

  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "An error occurred while fetching videos" });
  }
};



exports.getRecentVideos = async (req, res) => {
  try {
    const recentVideos = await Video.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json({
      message: "Recently added videos fetched successfully",
      videos: recentVideos,
    });
  } catch (error) {
    console.error("Error fetching recent videos:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
