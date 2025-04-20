const Video = require("../models/videosModel");


exports.addFavorite = async (req, res) => {
    const { userId, videoId } = req.body;
  
    try {
      let favorite = await Video.findOne({ userId, videoId });
  
      if (favorite) {
        favorite.isFavorite = true;
      } else {
        favorite = new Video({ userId, videoId, isFavorite: true });
      }
  
      await favorite.save();
      res.status(200).json({ message: "تمت إضافة الفيديو إلى المفضلة." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "حدث خطأ أثناء إضافة الفيديو إلى المفضلة." });
    }
  };


exports.removeFavorite = async (req, res) => {
    const { userId, videoId } = req.body;
  
    try {
      await Video.findOneAndDelete({ userId, videoId });
      res.status(200).json({ message: "تمت إزالة الفيديو من المفضلة." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "حدث خطأ أثناء إزالة الفيديو من المفضلة." });
    }
  };




exports.getFavorites = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const favorites = await Video.find({ userId, isFavorite: true })
        .populate("videoId"); 
  
      res.status(200).json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "حدث خطأ أثناء جلب قائمة المفضلة." });
    }
  };
  
  
  