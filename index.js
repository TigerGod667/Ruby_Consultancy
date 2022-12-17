var express = require("express");
const path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const sessions = require('express-session');
const bcrypt = require("bcrypt");
const flash = require('connect-flash');

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ruby"
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
});


var app = express();
let session;

app.use(sessions({
  secret:'flashblog',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(function(req, res, next){
  res.locals.message = req.flash();
  next();
});

  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

app.use(express.static(path.join(__dirname,'./static')));
app.set('view engine','ejs');
app.listen(6767);

app.get(["/","/home","/placeOrder"], (req, res) => {
  if (typeof req.session.emailId == 'undefined'){
    res.render("Welcome");
    return;
  }
  connection.query(`Select * from orders where user_id = ${req.session["user_id"]};`,(error3,result3) => {
    console.log(result3);
    if (result3.length!=0) {
      console.log("inga2");
      res.render("Home", { orderDetails : JSON.stringify(result3)}); 
    }
    else {
      console.log("Inga");
      res.render("Home", { orderDetails : "None" });
    }
  })   
});

app.get("/TakeOrder1",(req,res) => {
  if (typeof req.session.emailId == 'undefined'){
    res.render("Welcome");
    return;
  }
  res.render("TakeOrder1");
}) 

app.get("/logout",(req,res) => {
  req.session.destroy();
  res.render('Welcome');
})

app.post('/login', async (req,res) => {
  var email = req.body.email;
  let password = req.body.password;  
  console.log(email,password);
    let query = `SELECT * FROM users WHERE email_id = '${email}'`;
    connection.query(query, async (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.length!=0){
        bcrypt.compare(password, result[0]['password'], function(err, result1) {
          if (result1) {
            session = req.session;
            session.user_id = result[0]["user_id"];
            session.emailId = result[0]["email_id"];
            session.userName = result[0]["user_name"];
            res.redirect("/");
          }
          else {
            req.flash('success', 'Login Failed');
            res.redirect("/");
          }
        });
    }
    else{
      req.flash('success', 'Login Failed');
      res.redirect("/");
    }
  });
})

app.post('/signup', async (req,res) => {
  let username = req.body.username;
  let email = req.body.signupEmail;
  let phone = req.body.phone;
  let password = await bcrypt.hash(req.body.signupPassword, 10);
  let query = `SELECT * FROM users WHERE email_id = '${email}'`;
    connection.query(query, async (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.length!=0){
        req.flash('success', 'Signup Failed. Account Exists!');
        res.redirect("/");
      }
      else {
        query = `INSERT INTO users (user_name, email_id, phone_number, password) VALUES ('${username}', '${email}', '${phone}', '${password}')`;
        connection.query(query, (err, result1) => {
          if (err) throw err;
          connection.query(`SELECT max(user_id) as user_id from users;`,(error2,result2) => {
            session = req.session;
            session.user_id = result2[0]["user_id"];
            session.emailId = email;
            session.userName = username;
            res.redirect("/"); 
          });
        });
      }
  });
})

app.get('/logout',(req, res) => {
  req.session.destroy();
  res.redirect("/");
})

app.post('/nextPage',(req,res) => {
  if (typeof req.session.emailId == 'undefined'){
    res.render("Welcome");
    return;
  }
  var date = req.body.date;
  var customer = req.body.customer;
  var district = req.body.district;
  var description = req.body.description;
  return res.render('TakeOrder2', { "date": date,"customer": customer, "district": district, "description": description});
});

app.post('/placeOrder', (req, res) => {
  if (typeof req.session.emailId == 'undefined'){
    res.render("Welcome");
    return;
  }
  var date = req.body.date;
  var customer = req.body.customer;
  var district = req.body.district;
  var description = req.body.description;
  var products = JSON.parse(req.body.content);
  console.log(date, customer, district, description, products);
  var product_types = "";
  for (var i in products) {
    if (products[i]["Sales"]!=0 || products[i]["Vapus"]!=0) {
      product_types += i.toString()+",";
    }
  }
  product_types = product_types.substring(0,product_types.length-1);
  console.log(`Insert into Orders(user_id, date, customer, district, description, product_types) Values(${req.session.user_id},STR_TO_DATE('${date}','%Y-%m-%d'),'${customer}','${district}','${description}','${product_types}')`);
  connection.query(`Insert into Orders(user_id, date, customer, district, description, product_types) Values(${req.session.user_id},STR_TO_DATE('${date}','%Y-%m-%d'),'${customer}','${district}','${description}','${product_types}')`,(error1) => {
    if (error1) console.log(error1);
    connection.query(`SELECT max(order_id) as order_id from orders;`,(error2,result2) => {
      var product_array = product_types.split(",");
      for (var i in product_array) {
        var index = product_array[i];
        connection.query("Insert into `"+products[index]["Name"]+"`(order_id, sales, vapus, free, offers)"+` VALUES(${result2[0]["order_id"]}, ${products[index]["Sales"]}, ${products[index]["Vapus"]}, ${products[index]["Free"]}, "${products[index]["Offer"]}")`,(error3,result3) => {
          if (error3) console.log(error3);
        })
      }  
    })
  })
  res.redirect("/");
})

app.post('/removeOrder', (req, res) => {
  var id = req.body.removeItemId;
  connection.query(`DELETE from orders where order_id=${id}`,(error1) => {
    if (error1) {console.log(error1);}
    res.redirect('/');
  })
})