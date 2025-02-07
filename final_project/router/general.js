const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let doesExist = require("./auth_users.js").doesExist;

//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
const myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved")
    },6000)})


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
//   return res.status(404).json({message: "Unable to register user.","username"  : username, "password": password});
    res.send("Unable to register user." +(' ')+ (username) + (password));
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
// })
console.log(successMessage + ': sending resposne');
    res.send(JSON.stringify(books,null,4));
//   book_det = JSON.stringify(books,null,4);
//   return res.status(300).json({message: "All Books"});
//   return res.status(300).json(JSON.stringify(books,null,4));
    });
    console.log("Req received");
    

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  myPromise.then((successMessage) => {
  const isbn = req.params.isbn;
  console.log(successMessage + ': sending resposne');
  res.send(books[isbn]);
  });
  console.log("Req received");
//   return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  myPromise.then((successMessage) => {
  const author = req.params.author;
  let filtered_books = Object.values(books).filter((book) => book.author === author);
  console.log(successMessage + ': sending resposne');
  res.send(filtered_books);
  });
  console.log("Req received");
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  myPromise.then((successMessage) => {
  const title = req.params.title;
  let filtered_books = Object.values(books).filter((book) => book.title === title);
  console.log(successMessage + ': sending resposne');
  res.send(filtered_books);
  }); 
  console.log("Req received");
//   return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
//   res.send('Reviews'+ (books[isbn].reviews));
  return res.status(300).json(books[isbn].reviews);
});

module.exports.general = public_users;
