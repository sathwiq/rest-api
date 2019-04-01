const mongoose=require('mongoose');

const orderSchema= mongoose.Schema({
  userId: {type:mongoose.Schema.Types.ObjectId ,ref:"User",required: true},
  date: { type: Date, default: Date.now },
  status: {type:String,required: true},
  tNo: {type:Number,required: true},
  items:[{
      title:{type:String,required: true},
      price: {type:String,required: true},
      no:{type:Number,required: true}
  }],
  totalPrice:{type:Number,required: true}
});
module.exports=mongoose.model('Order',orderSchema);