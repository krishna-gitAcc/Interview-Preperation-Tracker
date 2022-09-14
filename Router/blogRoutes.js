const express=require('express');
const Blog=require('../modules/blogs');

const router=express.Router();


router.post('/',(req,res)=>{
    const blog =new Blog(req.body);
   
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>console.log(err));
   });
   
   router.get('/',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'BLOGS', blogs:result})
    })
    .catch((err)=>console.log(err));
});

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
        res.render('details',{blog:result,title:'detailed'});
        // res.render('details',{blog:result,title:'Blog Details'})
    })
    .catch(err=>console.log(err));
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports=router;