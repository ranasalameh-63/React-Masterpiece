const Video = require("../models/videosModel");

const addVideo = async (req, res) => {
  try {
    const { title, description, youtubeUrl, category } = req.body;
    const youtubeId = youtubeUrl.split("v=")[1]?.split("&")[0];
    const expertId = req.user._id;

    if (!youtubeId) {
      return res.status(400).json({ message: "Invalid YouTube URL" });
    }

    if (!expertId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

    const newVideo = new Video({
      title,
      description,
      youtubeUrl,
      youtubeId,
      categories: [category],
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video added successfully", video: newVideo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getVideosByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      const videos = await Video.find({ categories: category });
  
      res.status(200).json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = { addVideo, getVideosByCategory };
