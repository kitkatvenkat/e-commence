require("dotenv").config();
const express = require("express")
const dbconnect =require("./config/db")
const cors = require ("cors");
const routers = require("./router/userrouter");
const productrouters = require("./router/productRouter");
const cartRouter = require("./router/cartRoutes");
const orderRouter = require("./router/orderRoutes");


const app = express()

app.use (express.json())

app.use(cors())


dbconnect()



app.use("/api",routers)
app.use("/product",productrouters)
app.use("/cart",cartRouter)
app.use("/order",orderRouter)



app.listen(process.env.PORT,()=>{
    console.log("server is connected");

    
})