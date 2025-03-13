const express =require("express")
const { userRegister, userRegisterDataGet, userlogin, userUpdate, changePassword } = require("../controllers/usercontroller")
const {tokenverify, adminOnly} = require("../middleware/authMiddleware")

const routers = express.Router()

routers.post("/createuser",userRegister)
routers.get("/userdataget",tokenverify,adminOnly,userRegisterDataGet)

routers.post("/login",userlogin) 
routers.put("/updata/:id",userUpdate)
routers.put("/change-password/:id", changePassword);




module.exports = routers;
