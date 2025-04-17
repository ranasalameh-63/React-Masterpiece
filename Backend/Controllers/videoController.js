const Video = require("../models/videosModel");

const getVideosByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const videos = await Video.find({ categories: categoryName });
    res.status(200).json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Failed to fetch videos by category" });
  }
};

module.exports = {
  getVideosByCategory,
};
