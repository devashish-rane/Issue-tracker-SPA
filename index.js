const express = require("express");
const bodyParser = require("body-parser");  //for JSON API

//import local validation module 
const Validator  = require("./validation");


//create express app instance
const app = express();


//static serving middleware
app.use(express.static("react_build"));

//using for API
app.use(bodyParser.json());

const data=[];
// const data = [
//     {
//     id: 1, status: 'Open', owner: 'Ravan',
//     created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
//     title: 'Error in console when clicking Add',
//     },
//     {
//     id: 2, status: 'Assigned', owner: 'Eddie',
//     created: new Date('2016-08-16'), effort: 14, 
//    completionDate: new Date('2016-08-30'),
//     title: 'Missing bottom border on panel',
//     },
// ]    

app.get("/issues",(req,res)=>{
     const metadata = { total_issues : data.length};
     res.json({ _metadata  : metadata , clientDataFeed : data});
});

app.post("/issues",(req,res)=>{
    const newPostedIssue = req.body;
    newPostedIssue.id = data.length + 1;
    newPostedIssue.created = new Date();
    if(!newPostedIssue.status)
        newPostedIssue.status = "New";

    let err = Validator.validateIssue(newPostedIssue);
    if(err){
        res.status(422).json({ message: `Invalid requrest: ${err}` });
        return;
    }    
    data.push(newPostedIssue);
    
    res.json(newPostedIssue);

});



//server listening 
app.listen(8000,()=>{
    console.log("Server is running on port 8000");  
});