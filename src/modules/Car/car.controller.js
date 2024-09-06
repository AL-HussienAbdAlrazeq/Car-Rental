import { ObjectId } from "mongodb";
import { db } from "../../../database/db.connection.js";




const addCar =async (req,res)=>{
    const car = await db.collection('cars').insertOne({
        name:req.body.name ,
        model:req.body.model,
        rental_status:"Available"
     })
     res.status(201).json({message:"Success" , car})
}



const getSpecificCar = async (req,res)=>{
 const specificCar = await db.collection('cars').findOne({_id:new ObjectId(req.params.id)})
 res.status(200).json({specificCar })

}



const getAllCars = async (req,res)=>{
 const allCar = await db.collection('cars').find().toArray()
 res.status(200).json({allCar })

}



const updateCar =async (req,res)=>{
 
 const updateCar = await db.collection('cars').updateOne({_id:new ObjectId(req.params.id)},{$set:req.body})
 res.status(200).json({message:"Updated" , updateCar })
}



const deleteCar = async (req,res)=>{
    await db.collection('cars').deleteOne({_id:new ObjectId(req.params.id)})
    res.json({ message:"Deleted"})
   
   }





// const getStatus =async (req,res)=>{
//     const car = await db.collection('cars').find( {rental_status:"Available"}  ).toArray()
//     res.json({car })
// }



// const getRentedCar =async (req,res)=>{
//     const car = await db.collection('cars').find( {rental_status:"Rented"}  ).toArray()
//     res.json({car })
// }







export{
    addCar,
    getSpecificCar,
    getAllCars,
    updateCar,
    deleteCar
    // getModel,
    // getStatus,
    // getRentedCar
}