const express = require("express")
const { tokenverify, adminOnly } = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware")
const { productCreate, productshow, productupdate, productdelete } = require("../controllers/productcontroller")

const productrouters = express.Router()


productrouters.post("/productcreate",tokenverify,adminOnly,upload.fields([{ name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }]),productCreate)

productrouters.get("/showproduct",productshow)   

productrouters.put("/productupdate/:id",tokenverify,adminOnly,upload.fields([{ name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }]),productupdate)

productrouters.delete("/productdelete/:id",tokenverify,adminOnly,productdelete)



   

    module.exports = productrouters    