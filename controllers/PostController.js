const fs = require("fs");
const model = require("../models");
const News = model.news;
const Files = model.file;

exports.postContent = (req, res) => {
  if (req.roletype === 1 || req.roletype === 2) {
    /*
        Pengecekkan ulang agar super admin atau narator yang login memiliki data
        yang jelas walaupun roletypenya sudah sesuai
        */
    if (req.userId != req.params.userId) {
      res.status(403).json({ messege: "Forbidden Access" });
    } else {
      News.create({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.params.userId
      })
        .then(status => {
          req.files.map(x => {
            Files.create({ fileName: x.filename, newsId: status.id });
          });
          res.status(200).json({
            message: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

// test file upload ke cloudinary
exports.cloudinaryUpload = (req, res) => {
  const cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: "dbfo70umw",
    api_key: "481875856962268",
    api_secret: "4FEb7x5R1t1pEc-2MOMpUPrrVYQ"
  });

  const path = req.file.path;
  const fileUpload = `photo/${req.file.filename}`;

  cloudinary.uploader.upload(path, { public_id: fileUpload }, function(
    err,
    image
  ) {
    if (err) {
      fs.unlinkSync(path);
      res.status(400).json({
        error: err.errno
      });
    } else {
      console.log("file uploaded to Cloudinary");
      fs.unlinkSync(path);
      res.status(200).json(image);
    }
  });
  console.log(req.file.filename);
};
