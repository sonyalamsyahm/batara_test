const model = require("../models");
const News = model.news;
const Files = model.file;
const User = model.user;
const Share = model.share;
const Media = model.media;

exports.allNews = (req, res) => {
  News.findAll({
    include: [
      {
        model: Files,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      }
    ]
  })
    .then(response => res.send(response))
    .catch(error => {
      console.log(error);
      res.json({
        error,
        message: "Error while fetch data"
      });
    });
};

exports.detailNews = (req, res) => {
  News.findOne({
    where: {
      id: req.params.newsId
    }
  })
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.json({
        error,
        message: "Error while fetch data"
      });
    });
};

exports.sharedLog = (req, res) => {
  const { userId } = req.params;
  const { mediaId, newsId } = req.body;
  Share.findOne({
    where: {
      userId,
      mediaId
    }
  }).then(() => {
    if (mediaId > 3 || mediaId < 1) {
      res.send({
        message: "Invalid Flatform"
      });
    } else {
      Share.create({ userId, newsId, mediaId })
        .then(() => {
          res.status(200).json({
            message: "Success"
          });
        })
        .catch(error => res.send({ message: error }));
    }
  });
};

exports.showShares = (req, res) => {
  if (req.roletype === 1 || req.roletype === 2) {
    User.findAll({
      include: [
        {
          model: News,
          attributes: {
            include: ["title"]
          },
          include: [
            {
              model: Media,
              attributes: {
                include: ["mediaName"]
              },
              through: {
                attributes: []
              }
            }
          ],
          through: {
            attributes: []
          }
        }
      ]
    })
      .then(response => {
        res.json(response);
      })
      .catch(error => {
        res.json({
          message: "Error when fetch data"
        });
      });
  } else res.status(401).json({ message: "Unauthorizec" });
};
