const express = require("express");






//create express app instance
const app = express();


//static serving middleware
app.use(express.static("react_build"));



//server listening 
app.listen(8000,()=>{
    console.log("Server is running on port 8000");  
});