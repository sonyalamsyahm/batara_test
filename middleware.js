const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  //melakukan get header, yang akan diambil tokennya, dan dijadikan acuan untuk keamanan
  const getAuthHeader = req.headers["authorization"];

  //mengambil tokennya saja dengan method split(' ') dan diambil index ke 1 nya yaitu tokennya
  const token = getAuthHeader && getAuthHeader.split(" ")[1];
  if (token) {
    console.log(token);
    jwt.verify(token, "secret", (error, user) => {
      if (error) {
        console.log(error);
        return res.status(403).send({ message: "Your token is expired" });
      }
      req.roletype = user.login.roletype;
      req.userId = user.login.id;
      next();
    });
  }
};

//digunakan untuk mengecek tipe role, apabila rolenya 1 atau 2, maka bisa posting
exports.authPost = (req, res, next) => {
  if (req.roletype !== 3) next();
  else res.status(401).send({ message: "Unauthorize" });
};
