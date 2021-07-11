// jshint esversion: 6


const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express() ;
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res)
{
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);


const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
 const jsonData = JSON.stringify(data);
 const url = "https://us6.api.mailchimp.com/3.0/lists/accd0d6b3f";


const options = {
  method: "POST",
  auth: "code_jha:a5816eb7a231ee9b51b55fc9fa15f7f3-us6",
}













 const request = https.request(url, options, function(response){
 if(response.statusCode === 200)
 {
    res.sendFile(__dirname + "/success.html");
  }
  else {
    {
      res.sendFile(__dirname + "/failure.html");
    }
  }

response.on("data", function(data){


  console.log(JSON.parse(data));
})
} )

//request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function()
{
  console.log("server is running on port 4000");
});
// a5816eb7a231ee9b51b55fc9fa15f7f3-us6(API HAI MAIL-CHIMP SEVELOPER.COM SE)
// accd0d6b3f(unique list ID)
