let express = require("express");
let router = express.Router();
let User = require("../model/Users");
let bcrypt = require("bcryptjs");

const store = require("store2");

router.get("/", (req, res) => {
  if(!store('email')){
    res.redirect("/login");
  }else{
    res.render("home", {msg:{ message: "", name: store('name')}});
  }
});

router.get("/contact", (req, res) => {
  
  if(!store('email')){
    res.redirect("/login");
  }else{
  res.render("contact", {msg:{ message:"", name: store('name') }});
  }
});

router.get("/login", (req, res) => {
  res.render("login", {msg:{ message: "", name:"" }});
});

router.get("/signup", (req, res) => {
  res.render("signup", {msg:{ message: "" , name:""}});
});

router.get('/logout', (req, res) => {
  if(!store('email')){
    res.render("login", {msg:{ message: "", name:""}});
  }else{
    store('name',"");
    res.render("login", {msg:{ message: "loggedout", name: "" }});
  }
})

router.post("/signup", async (req, res) => {
  store('name',"");
  let { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.render("signup", {msg:{ message: "already exists",name: ""}});
    } else if (password.length < 6) {
      res.render("signup", {msg:{ message: "minLength", name:"" }});
    } else {
      let user = await new User({ name, email, password });
      let data = await user.save();
      store('name', data.name);
      store('email', data.email);
      res.render("/", {msg:{ message:"", name: store('name') }});
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    //console.log(existingUser.password);
    let matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      res.render("login", {msg:{ message: "invalid password", name:"" }});
    } else {
      store('name',existingUser.name);
      store('email', req.body.email);
      res.render("home",{msg: { message: "", name: existingUser.name}});
    }
  } catch (error) {
    res.render("login", {msg:{ message: "invalid", name: ""}});
  }
});


module.exports = router;
