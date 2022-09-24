const mongoose=require('mongoose');
let userSchema= new mongoose.Schema( {
    username:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
        
    },
    img:String,
    a:{type:[String],default:[]}
})
userSchema.pre('save', function (next) {
    // capitalize
    this.username.charAt(0).toUpperCase() + this.username.slice(1).toLowerCase();
    next();
  });
let user=mongoose.model('User',userSchema);
module.exports=user;

