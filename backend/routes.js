app.post('/posts',(req,res,next)=>{
  const posts=new Post({
    title:req.body.title,
    content:req.body.content
  });
  posts.save();
  res.status(201).json({
    message:"Successfully saved"
  });
});
app.get('/orders',(req,res,next)=>{
  const order= new Order({
    userId:2 ,
    status: 'ok',
    tNo: 7,
    items:[
      {
        title:'mohito',
        id: 4,
        price:50,
      },
      {
        title:'moito',
        id: 4,
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
app.get('/posts',(req,res,next)=>{
  Post.find((err,doc)=>{
  });
  Post.find()
    .then(documents =>{
      res.status(200).json({
        message:'posts fetched succesfully',
        posts: documents
    });
  });
});
app.delete("/posts/:id",(req,res,next)=>{
  Post.deleteOne({_id:req.params.id}).then(
    result =>{
      console.log(result);
    }
  )
  res.status(200).json({message:"post Deleted"});
});