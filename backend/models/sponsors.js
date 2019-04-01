const mongoose=require('mongoose');

const sponsorSchema= mongoose.Schema({
  title: {type:String,required: true},
});

module.exports=mongoose.model('Sponsor',sponsorSchema);
