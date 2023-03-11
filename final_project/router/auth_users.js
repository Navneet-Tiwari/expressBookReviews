const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"Navneet","password": "pwd"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}
const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

const authenticatedUser = (username,password)=>{
     //returns boolean
     //write code to check if username and password match the one we have in records.
     let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }

}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"})};
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.session.username;
  const isbn  = req.params.isbn;
  let book = books[isbn];
  if(book){
    let review = req.query.review;
    let review_user = username;

    if(review){
        Book_reviews =  book["reviews"]
        // Object.values(Book_reviews).filter((Book_review) => Book_review.author === username);
        // book["reviews"]= {review_user : review}
        Book_reviews[review_user] = review;
    }
    else{
        return res.status(300).json({message: "Review not received"});
    }






  }

  return res.status(300).json({message: "Yet to be implemented"});

  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.users = users;
