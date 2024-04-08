const express = require("express");
const mysql = require("mysql2");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const middleware = require("./middleware");

const app = new express();
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "todo",
});
db.connect((err) => {
  if (err) {
    console.log("error in database connection ", err);
  } else {
    console.log("connected to the todo database");
  }
});

app.get("/login", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  db.query(
    `select * from users where email=? and password=?;`,
    [email, password],
    (err, result) => {
      if (err) {
        // throw err;
        res.status(500).send({
          is_success: false,
          data: {},
          error: err,
        });
        return;
      }
      if (result.length > 0) {
        const user = {
          id: result[0].userid,
        };
        jwt.sign(user, "secretkey", { expiresIn: 1000000 }, (err, token) => {
          if (err) {
            res.status(500).send({
              is_success: false,
              data: {},
              error: err,
            });
            return;
          }
          res.json({
            is_success: true,
            data: {
              token,
            },
            error: "",
          });
          // console.log(token);
        });
        // res.send("user found")
      } else if (result == 0) {
        res.status(401).send({
          is_success: false,
          data: {},
          error: "user not found",
        });
      }
    }
  );
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  db.query(`SELECT * FROM users WHERE email=?`, [email], (err, result) => {
    if (err) {
      return res.send("Error in fetching login data");
    } else if (result.length > 0) {
      return res.send("User already exists");
    } else {
      // User doesn't exist, proceed with registration
      db.query(
        `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
        [username, password, email],
        (err) => {
          if (err) {
            console.log("Error in insert query");
            return res.send("Error in registration");
          } else {
            console.log("Successfully registered");
            return res.send("Successfully registered");
          }
        }
      );
    }
  });
});

app.get("/show", middleware, (req, res) => {
  try {
      console.log("-------------------------------- /show endpoint  ------------------------------");
    const id = req.body.id;
    const status = req.query.status;
    console.log("req data after ", req.query);
    db.query(
      `select taskname,description from taskdata where userid=? and status=?`,
      [id, status],
      (err, result) => {
        if (err) {
          res.status(500).send({
            is_success: false,
            data: {},
            error: "error in fetching data to show !",
          });
          return;
        }
        if (result.length > 0) {
          res.status(200).send({
            is_success: true,
            data: result,
            error: {},
          });
          return;
        }
        res.status(200).send({
          is_success: false,
          data: {},
          error: "data not found",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      is_success: false,
      data: {},
      error: "error in fetching data to show !" + err,
    });
  }
});

app.post("/addtask", middleware, (req, res) => {
  try {
    console.log("-------------------------------- /addtask endpoint  ------------------------------");
    const { id,taskname, description } = req.body;
    console.log("from add task : ", taskname, description);
    db.query(
      `insert into taskdata(userid,taskname,description,status)values(?,?,?,?)`,
      [id, taskname, description, "pending"],
      (err) => {
        if (err) {
          console.log("Error in addtask try block ");
          res.status(500).send({
            is_success: false,
            data: {},
            error: err,
          })          
        } 
        res.status(200).send({
          is_success: true,
          data: {},
          error: {},
        })
      }
    );
  } catch (error) {
    console.log("error in addtask endpoint");
    res.send("error in addtask endpoint" + error);
  }
});

app.get("/completed",middleware, (req, res) => {
  try {
    const userid = req.body.id;
    const taskname = req.query.taskname;
    console.log(req.query, userid, taskname);
    db.query(
      `update taskdata set status=? where userid=? and taskname=?`,
      ["completed", userid, taskname],
      (err) => {
        if (err) {
          res.send("error in /completed endpoint updating query");
        } else {
          res.send("updated successfuly ");
        }
      }
    );
  } catch (error) {
    res.send("error in /completed catch block ");
  }
});
// // username, password   -> 1221
// 1221+"private key "=>"tfgvbhjkmdfeoidfh;wejfewoiro weiwejweo"

// "tfgvbhjkmdfeoidfh;wejfewoiro weiwejweo"+ endpoint("show") =>"tfgvbhjkmdfeoidfh;wejfewoiro weiwejweo"- "private key "= 1221

app.get("/delete", (req, res) => {
  const userid = req.query.userid;
  const taskname = req.query.taskname;
  const status = req.query.status;
  console.log(userid, taskname, req.query);
  db.query(
    `delete from taskdata where userid=? and taskname=? and status=?`,
    [userid, taskname, status],
    (err) => {
      if (err) {
        res.send("error in deleting query ");
      } else {
        console.log("deleted successfuly !");
        res.send("deleted successfuly !");
      }
    }
  );
});

app.get("/count", (req, res) => {
    try {
        
        const userid = req.body.id;
        const status = req.query.status;
        db.query(
            `select count(taskname) as count from taskdata where userid=? and status=?;`,
            [userid, status],
            (err, result) => {
                if (err) {
                    res.send("error in fetching count data");
                } else if (result.length > 0) {
                    console.log(result);
                    res.send(result);
                } else {
                    console.log("No data found" + result);
                    res.send("No data found" + result);
                }
            }
        );
    } catch (error) {
        console.log("error in /count endpoint");
        res.status(500).send({
            is_success: false,
            data: {},
            error: "error in fetching data to show !" + error,
        })
    }
});

const port = 8080;
app.listen(port, (err) => {
  if (err) console.log("error in starting " + err);
  console.clear();
  console.log("server is running on " + port + " port");
});
