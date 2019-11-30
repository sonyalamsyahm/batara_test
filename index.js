import express from "express";
require("express-group-routes");
const app = express();
const port = 5000;
const multer = require("multer");

app.use(express.json());
const { auth, authPost } = require("./middleware");
const Auth = require("./controllers/Auth");
const GetMethod = require("./controllers/GetController");
const PostMethod = require("./controllers/PostController");

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./uploads");
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: Storage });
app.use("/file", express.static("uploads"));

app.group("/api/v1", router => {
  router.post("/login", Auth.login);

  router.post("/register", auth, Auth.Register);

  router.get("/news", GetMethod.allNews);

  router.get("/news/:newsId", GetMethod.detailNews);

  router.get("/share/:userId", GetMethod.sharedLog);

  router.get("/shares", auth, GetMethod.showShares);

  router.post(
    "/post/:userId/upload",
    auth,
    authPost,
    upload.array("fileData", 4),
    PostMethod.postContent
  );

  router.post(
    "/cdn/upload",
    upload.single("fileData"),
    PostMethod.cloudinaryUpload
  );
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
