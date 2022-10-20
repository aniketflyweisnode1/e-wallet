
const {Schema,model} = require('mongoose');


const userWalletSchema = Schema({
    firstName: { 
             type: String,
             required: true 
            },
    lastName: { 
             type: String,
              required: true
             },
    email: { 
            type: String,
               required: true
            },
    phone:{
           type:String,
             required:true
            },
    password:{
             type:String,
            required:true
        },
    confirmPassword:{
        type:String,
        required:true
    }

},{ timestamps: true });






module.exports.Wallet = model('Wallet',userWalletSchema) 