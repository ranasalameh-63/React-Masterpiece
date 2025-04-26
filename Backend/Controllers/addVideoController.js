const Video = require("../Models/videosModel");

const addVideo = async (req, res) => {
  try {
    console.log("User in addVideo:", req.user);
    const { title, description, youtubeUrl, category } = req.body;
    const expertId = req.user._id;

    
    if (!expertId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

    const newVideo = new Video({
      title,
      description,
      youtubeUrl,
      expertId,
      categories: [category],
     
    });

    await newVideo.save();
    res.status(201).json({ message: "Video added successfully", video: newVideo });
  } catch (error) {
    console.error("Error adding video:", error);
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
