const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
router.use(express.json());
const path = require('path');
const { request } = require('http');



function readVideoFile() {
    const videosList = fs.readFileSync("./data/videos.json");
    const parsedData = JSON.parse(videosList);
    return parsedData;
}
router.get("/videos", (req, res) => {
    const videos = readVideoFile();
    res.json(videos);
});

router.get("/videos/:id", (req, res) => {
    const videos = readVideoFile();
    const foundVideo = videos.find((video) => video.id === req.params.id);
    if (foundVideo) {
        res.json(foundVideo);
    } else {
        res.status(404).json({ message: "Video not found" });
    }
});

router.post("/videos", (req, res) => {
    console.log(req.body.title);
    console.log(req.body.description);
    const newVideo = {
        id: uuidv4(),
        image: req.body.image,
        title: req.body.title,
        description: req.body.description,
        views: 82,
        likes: 673,
        timestamp: new Date().getTime(),
        comments: [],
        video: "https://project-2-api.herokuapp.com/stream",
        channel: "Nicole Fonseca",
        duration: '3:33'
    };
    console.log(newVideo);
    const videos = readVideoFile();
    videos.push(newVideo);
    fs.writeFileSync(path.join('./data/videos.json'), JSON.stringify(videos));
    res.status(201).json(newVideo);
});


module.exports = router;
