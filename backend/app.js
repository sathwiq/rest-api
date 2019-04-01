const express=require('express'),
      app=express(),
      bodyParser=require('body-parser'),
      Restaurant=require('./models/restaurant'),
      Sponsor =require('./models/sponsors'),
      Order=require('./models/order'),
      checkAuth=require('./models/middleware/check-auth'),
      mongoose=require("mongoose");
      const userRoutes = require("./user");
mongoose.connect("mongodb+srv://sat:RfGCMwBz7nLF1UPz@cluster0-rqbbo.mongodb.net/test", { useNewUrlParser: true })
    .then(()=>{
      console.log('Connected to database');
    })
    .catch(()=>{
      console.log('Connection failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-origin","*"); 
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods',
  "GET,POST,PATCH,DELETE,PUT,OPTIONS");     
  next(); 
});
app.post('/posts/',(req,res,next)=>{
  const posts=new Sponsor({
    title:req.body.title
  }); 
  posts.save();
  res.status(201).json({
    message:"Successfully saved"
  });
});
app.post('/orders/',
checkAuth,
(req,res,next)=>{
  const posts=new Order({
    title:req.body.title,
    userId:req.userData.userId,
    status: req.body.status,
    tNo: req.body.tNo,
    items:req.body.items,
    totalPrice:req.body.totalPrice,
  }); 
  posts.save();
  
  res.status(201).json({
    message:"Successfully saved"
  });
});
app.get('/posts',(req,res,next)=>{
  Sponsor.find()
    .then(documents =>{
      res.status(200).json({
        message:'posts fetched succesfully',
        posts: documents
    });
  });
});
app.get('/cname',(req,res,next)=>{
  Sponsor.find()
    .then(documents =>{

      res.status(200).json({
        message:'posts fetched succesfully',
        posts: documents
    });
  });
});
app.get('/items/:name',(req,res,next)=>{
  Restaurant.find({ name: req.params.name})
  .then(documents =>{
    res.status(200).json({
      message:'posts fetched succesfully',
      items: documents[0].items
  });
});
});
app.get('/orders',checkAuth,(req,res,next)=>{
  Order.find({userId :req.userData.userId})
  .then(documents =>{
    res.status(200).json({
      message:'posts fetched succesfully',
      orders: documents
  });
});
});
app.get('/porders',
checkAuth,
(req,res,next)=>{
  const order= new Order({
    userId:2 ,
    status: 'ok',
    tNo: 7,
    items:[
      {
        title:'mohito',
        
        price:50,
      },
      {
        title:'moito',
       
        price:50,
      }
    ],
    totalPrice:5
  });
  order.save();
  res.status(201).json({
    message:"Successfully saved"
  });
});
app.use("/user", userRoutes);
app.get('*',(req,res,next)=>{
  console.log("Succcess");
})
module.exports=app;
