const mongoose = require("mongoose");




function databases (){
    try{
        if (!process.env.DB) { 
            throw new Error("❌ DB_URI is missing in .env file");
        }
        mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((res)=>{ 
            
            console.log("Database connected");

           
            
        }).catch(()=>{
            console.log("Error connecting to the database");
        })

    }
    catch{
        console.log("Error in connecting to the database");
    }
    
}


module.exports =databases
