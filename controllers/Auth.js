const jwt = require("jsonwebtoken");

const model = require("../models");
const User = model.user;

exports.login = (req, res) => {
  const { email, password } = req.body;
  //mengambil 1 data user yang email dan passwodnya sama
  User.findOne({
    where: {
      email,
      password
    }
  })
    .then(login => {
      if (login) {
        const token = jwt.sign({ login }, "secret");
        console.log(token);
        res.send({
          userId: login.id,
          email: login.email,
          username: login.name,
          token
        });
      } else {
        res.status(422).json({
          message: "Bad Request"
        });
      }
    })
    .catch(err => console.log(err));
};

//hanya dapat diakses roletype 1
exports.Register = (req, res) => {
  const { email, password, name, roletype } = req.body;

  console.log(req.roletype);
  if (req.roletype !== 1) {
    res.status(403).json({ message: "Access not allow" });
  } else {
    User.findOne({
      where: {
        email: email
      }
    })
      .then(response => {
        if (response) {
          res.json({
            message: "Email already in Use"
          });
        } else {
          User.create({
            email,
            password,
            name,
            roletype
          })
            .then(() => res.status(200).json({ message: "success" }))
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }
};
