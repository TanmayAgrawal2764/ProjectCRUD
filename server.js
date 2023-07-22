// http= require("http")

// http.createServer(function(request,response){
//      response.writeHead(200,{
//           'content-type':'text/plain'
//      })
//      response.end()
// }).listen(3000,console.log("server is running at 3000 port"))

const express = require("express")
const morgan = require("morgan")
const color = require("colors")
const dotenv = require("dotenv")
const connectdb = require("./config/db")
const app = express();


// app.use((request,response,next)=>{ middleware 
//      console.log("Middleware is running")
//      request.title="confident person" this code according to me just set the title value in somewhere in middleware
//      next();
// })

app.use(morgan("dev"))// it is a middleware

app.use(express.json({}));
app.use(express.json({
  extended: true
}));

dotenv.config({
  path: "./config/config.env"
})

connectdb();

const PORT = process.env.PORT || 4000

app.use("/api/todo/auth", require("./routes/Routes"))

app.listen(PORT, console.log(`server is online and listenning at: ${PORT}`.red.underline.bold))