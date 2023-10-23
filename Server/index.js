const express= require("express")
const nodemailer = require('nodemailer');
const bodyParser= require('body-parser')
const app=express()
const usermodel= require('./models/user')
const port= process.env.PORT || 5000;
const userController = require('./controller/user')
const mongoose = require("mongoose");
const cors= require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/Bishal")
  .then(() => {
    console.log("Connection Successful....");
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/notes/:email', async(req,res)=>{
  try{
    const _id=req.params.email;
    const data=await usermodel.findOne({email:_id});
    // console.log(data);
    if(!data)
    {
        res.status(400).send();
    }
    else{
        res.status(201).send(data.content);
    }
  }
  catch(err)
  {
      res.status(500).send(err);
  }
})

app.delete("/notes/:email/:id",async(req,res)=>{
  console.log("hi")
  try{
      const email=req.params.email;
      //const data=await usermodel.findOne({email:email});
      const id=req.params.id;
      //const _name_data=await data.content.findOneAndDelete({id: id});
      // console.log(_name_data);
      // if(!_name_data){
      // res.status(404).send();
      // }
      // else{
      //     res.status(201).send(_name_data);
      // }

      const result = await usermodel.updateOne({ email: email }, { $pull: { content: { id: parseInt(id) } } });

      if(!result){
      res.status(404).send({code:404,message: 'error'});
      }
      else{
          res.status(200).send({code:200,message: 'success'});
      }
  }catch(err){
    console.error(err);
      res.status(500).send(err);
  }
}) 

app.post('/signup',userController.signup)
app.post('/signin',userController.signin)
app.post('/sendemail',userController.sendmail)
app.post('/note',userController.note)

app.listen(port,()=>{
    console.log(`Backend running at port ${port}`)
})

