const pool = require("../db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports.handleLogin = (req, res) => {
  if (req.session.user && req.session.user.username) {
    res.json({ loggedIn: true, status: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports.initialLogin = async (req, res) => {
  const potentialUser = await pool.query(
    "SELECT id,username,passhash,userid FROM users WHERE username=$1",
    [req.body.username]
  );

  if (potentialUser.rowCount === 0) {
    console.log("not good");
    res.json({ loggedIn: false, status: "Incorrect Username Or Password" });
  } else {
    const match = await bcrypt.compare(
      req.body.password,
      potentialUser.rows[0].passhash
    );
    if (match) {
      //login
      req.session.user = {
        username: req.body.username,
        id: potentialUser.rows[0].id,
        userid: potentialUser.rows[0].userid,
      };
      res.json({ loggedIn: true, status: req.body.username });
    } else {
      console.log("not good");
      res.json({ loggedIn: false, status: "Incorrect Username Or Password" });
    }
  }
};

module.exports.handleSignup = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username FROM users WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    //register
    const passHash = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO users(username,passhash,userid) values($1,$2,$3) RETURNING id,username,userid",
      [req.body.username, passHash, uuidv4()]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
      userid: newUserQuery.rows[0].userid,
    };
    res.json({ loggedIn: true, status: req.body.username });
  } else {
    res.json({ loggedIn: false, status: "Username Exists" });
  }
};
