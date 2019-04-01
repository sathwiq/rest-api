const mongoose=require('mongoose');

const restSchema= mongoose.Schema({
  name: {type:String,required: true},
  items:[{
      name:{type:String,required: true},
      position: {type:Number,required: true},
      price: {type:Number,required: true},
      desc:{type:String,required: true},
      img:{type:String,required: true},
  }],
});

module.exports=mongoose.model('Restaurent',restSchema);
