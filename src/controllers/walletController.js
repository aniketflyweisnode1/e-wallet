const {Wallet} = require("../model/walletModel");
const jwt = require("jsonwebtoken");
const { isValid, isValidRequestBody,isValidString, isValidEmail } = require("../validator/validator");
let bcrypt = require('bcrypt')


const createAccount = async (req, res) => {
  try {
    const data = req.body;

    if (!isValidRequestBody(data))
      res.send(400)({ status: false, msg: "body cant be empty" });
    

    const { firstName,lastName, email, phone, password, confirmPassword } = data;

    if (!isValid(firstName && lastName)) {
      return res.status(400).send({ status: false, msg: "invalid credentials" });
    }


    if (!isValid(email)) {
      return res.status(400).send({ status: false, msg: "email is required" });
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).send({ status: false, msg: "invalid email" });
    }

    if (!isValid(phone)) {
        return res.status(400).send({ status: false, message: 'phoneNumber is required' })
    }

    if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phone))) {
        return res.status(400).send({ status: false, message: 'phoneNumber number should be valid mobile number' })
    }

    if (!(password)) {
      return res.status(400).send({ status: false, msg: "provide password" });
    }

    if (!(confirmPassword)) {
      return res.status(400).send({ status: false, msg: "please provide confirmPassword" });
    }

    if(password != confirmPassword)
      return res.status(400).send({status:false,msg:"password mismatch"})
    
      
    let hash = await bcrypt.hash(password, 10)
    data.password = hash;
    data.confirmPassword = hash
   
    const newAccount = await Wallet.create(data);
    res.status(201).send({status: true,msg: "account created successfully",data: newAccount});
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, msg: "server error" });
  }
};








const updateDetails = async (req,res)=>{
    try {
        const walletId = req.params.walletId
        const data = req.body

        const userData = await Wallet.findById(walletId)

        if(!userData){
            res.status(404).send({status:false,msg:"no details found"})
        } 


        if (Object.keys(req.body) == 0) {
            return res.status(400).send({ status: false, message: 'please provide data for updation' })
        }

        if(typeof data.firstName == 'string'){
          //checking for fname
      if (!isValid(data.firstName)) return res.status(400).send({ status: false, message: "First name is required and should not be an empty string" });

      //validating fname
      if (isValidString(data.firstName)) return res.status(400).send({ status: false, message: "Enter a valid first name and should not contain numbers" });
        }
        


        if(typeof data.lastName == 'string'){
          //checking for lname
      if (!isValid(data.lastName)) return res.status(400).send({ status: false, message: "last name is required and should not be an empty string" });

      //validating lname
      if (isValidString(data.lastName)) return res.status(400).send({ status: false, message: "Enter a valid last name and should not contain numbers" });
        }


        if(typeof data.email == 'string') {
          //validating user email-id
          if (isValid(data.email)) return res.status(400).send({ status: false, message: "email is required " });
      
          if (!isValidEmail(data.email)) return res.status(400).send({ status: false, message: "Enter a valid email-id" });
          }
   


        const updateDetails = await Wallet.findOneAndUpdate({ _id:walletId }, data, { new: true })

        return res.status(200).send({ status: true, message: "details updated successfully", data: updateDetails })

    } catch (error) {
        res.status(500).send(error)
    }
}



module.exports = { createAccount,updateDetails}
git push --set-upstream origin otp