const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const youtubedl = require('youtube-dl-exec');
const router = express.Router();
// Convert YouTube URL to MP3 and download
const fs = require('fs');

// Convert YouTube URL to MP3 and download
router.get('/', (req, res) => {
  const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const outputFolderPath = path.join(__dirname, 'downloads');
    console.log("__diraname", __dirname);
  // Execute youtube-dl command to download the video as MP3
  youtubedl(url, {
    extractAudio: true,
    audioFormat: 'mp3',
    output: path.join(outputFolderPath, '%(title)s.%(ext)s'),
    noCheckCertificate: true,
    ffmpegLocation: '/usr/local/bin/ffmpeg',
    getTitle :true,
    getDuration: true,
    getFilename: true,
  }).then((data) => {
    console.log("data: ", data);
    res.json(
      {
         message: 'Conversion successful',
         title: data
      });
  }).catch((error) => {
    console.error(`An error occurred: ${error}`);
    res.status(500).json({ error: error.message });
  });
});



module.exports = router
