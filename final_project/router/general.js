const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  if (req.body.username && req.body.password) {
    if (!isValid(req.body.username)) { 
      users.push({"username":req.body.username,"password":req.body.password});
      return res.status(200).json({message: "User successfully registred. You may now login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});



// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 4));
});
// TASK10: Same function as above using promises
public_users.get('/task10',function (req, res) {
  new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books, null, 2)));
  }).then(() => console.log("Task 10 Promise complete"));
});



// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books[req.params.isbn], null, 4));
 });
// TASK11: Same function as above using promises
public_users.get('/task11/:isbn',function (req, res) {
  new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify(books[req.params.isbn], null, 2)));
  }).then(() => console.log("Task 11 Promise complete"));
});
  
  
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let blist = [];
  for (b in books) {
    if (books[b].author === author){
      blist.push(books[b]);
    }
  }
  return res.send(JSON.stringify(blist, null, 2));
});
// TASK12: Same function as above using promises
public_users.get('/task12/:author',function (req, res) {
  new Promise((resolve, reject) => {
    const author = req.params.author;
    let blist = [];
    for (b in books) {
      if (books[b].author === author){
        blist.push(books[b]);
    }
  }
    resolve(res.send(JSON.stringify(blist, null, 2)));
  }).then(() => console.log("Task 12 Promise complete"));
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  for (t in books) {
    if (books[t].title === req.params.title){
      return res.send(JSON.stringify(books[t], null, 2));
    }
  } 
});
// TASK13: Same function as above using promises
public_users.get('/task13/:title',function (req, res) {
  new Promise((resolve, reject) => {
    for (t in books) {
      if (books[t].title === req.params.title){
        resolve(res.send(JSON.stringify(books[t], null, 2)));
      }
    } 
  }).then(() => console.log("Task 13 Promise complete"));
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviews = req.params.isbn;
  return res.send(JSON.stringify(books[reviews].reviews, null, 4));
});

module.exports.general = public_users;
