const usermodel= require('../models/user')
const nodemailer = require('nodemailer');

module.exports.signup= async (req,res)=>{
    try{
        const newuser= new usermodel({
            email:req.body.email,
            password: req.body.password,
        });

        const ok = await newuser.save();
        res.send({code:200,message: 'signup success'})

    }catch(er){
        res.send({code:400,message: 'Error occure'})
    }
}
module.exports.sendmail =  async (req, res) => {

    const user = await usermodel.findOne({email:req.body.email});
    if (user) {
      // User exists
      res.send({code:500,message: 'User already registered'})
    } else {
      // User does not exist
      try{
          const email  = req.body.email;
          const otp  = req.body.otp_val;
          // console.log(otp)
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'bshaw2623@gmail.com',
              pass: 'fqcjwtbvdoomfahj'
            }
          });
  
          const mailOptions = {
            from: 'bshaw2623@gmail.com',
            to: email,
            subject: 'OTP',
            html: `<h1>Your Keep Notes Verification Code </h1></br><p> ${otp} Use the above code to sign into your account</p>`
          };
  
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.send({code:510,message: 'Error Sending the email'})
            } else {
              // console.log('Email sent: ' + info.response);
              res.send({code:200,message: 'Email Sent Successfully'})
            }
          });
        }catch(er){
          res.status(400).send(er)
        }
    }
};
module.exports.signin= (req,res)=>{
    // email and password match
    usermodel.findOne({email:req.body.email}).then(result=>{
        if(result.password !== req.body.password){
            res.send({code:404, message: 'Wrong Password'})
        }
        else{
            res.send({
                email: req.body.email,
                code:200, 
                message: 'user found',
                token: 'hfgdhg'
            })
        }
    }).catch(err=>{
        res.send({code:500, message: 'user not found'})
    })

}


module.exports.note= async(req,res)=>{
  // try{
  //   const newuse= new usermodel.findOneAndUpdate(
  //     { email: req.body.email},
  //     { $push: { content: { title: req.body.title, mesg:req.body.content } } },
  //     function (error, success) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log(success);
  //       }
  //     }
  //   );

  //   // const ok = await newuse.save();
  //   res.send({code:200,message: 'success'})

  //   }catch(er){
  //     console.log(req)
  //       res.send({code:400,message: 'Error occure'})
  //   }

  // const content = 
    // {
    //   title: req.body.title,
    //   message: req.body.mesg
    // }
  // ;

  // const result = await usermodel.updateOne({email: req.body.email}, { $push: { content: {
  //       id: usermodel.content.length+1,
  //       title: req.body.title,
  //       message: req.body.mesg
  //     } } });
  // if (result) {
  //   console.log("Content updated successfully!");
  // } else {
  //   console.log("Content update failed!");
  // }

  const usermode = await usermodel.findOne({ email: req.body.email });

  const contentData = {
    title: req.body.title,
    message: req.body.mesg
  };

  const contentLength = usermode.content.length;
   let id=1
  
  if(contentLength!=0){
    const highestId = usermode.content.reduce((acc, curr) => {
      return acc.id > curr.id ? acc : curr;
    });

    id= highestId.id+1
  }

  const result = await usermodel.updateOne({ email: req.body.email }, { $push: { content: { id: id, title: contentData.title, message: contentData.message } } });
  
  if (result) {
              res.status(200).send({code:200,message: 'success'});
  } else {
              res.status(400).send({code:400,message: 'error'});

  }

}
