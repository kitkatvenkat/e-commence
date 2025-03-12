const express =require("express")
const { userRegister, userRegisterDataGet, userlogin } = require("../controllers/usercontroller")
const {tokenverify, adminOnly} = require("../middleware/authMiddleware")

const routers = express.Router()

routers.post("/createuser",userRegister)
routers.get("/userdataget",tokenverify,adminOnly,userRegisterDataGet)

routers.post("/login",userlogin)




module.exports = routers;
