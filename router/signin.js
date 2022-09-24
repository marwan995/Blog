let express = require('express');
let router=express.Router();
const postdb = require('../models/post')
const userdb=require('../models/user');
let loggedUser=null;
const verifypass=async(req,res,next)=>{
    let x=await userdb.find({username:req.body.username})
    x=x[0]
    if(x.password==req.body.password){
        return next()
    }
    else
    res.render('notfound')

}
router.get('/', async (req, res) => {
    let posts = await postdb.find({}).sort({ date: -1 }); 
    res.render('logged in',{posts ,loggedUser})
})
//verifypass,
router.post("/",async(req,res)=>{
    let posts = await postdb.find({}).sort({ date: -1 });
     loggedUser= await userdb.find({username:req.body.username})
     loggedUser=loggedUser[0]
     res.redirect('/signin')
})
router.get('/:postid/:React', async (req, res) => {
    let { postid, React } = req.params
    let ReactNum = parseInt(React) + 1
    let post = await postdb.findById(postid)
    if (ReactNum && postid)
        await postdb.findByIdAndUpdate(postid, { Reacts: ReactNum }, { runValidators: true, new: true })
    res.redirect(`/signin#${post._id}`)
    
   
})
router.post(['/comment/:idPost'], async (req, res) => {
    let newcomment = req.body;
    let { idPost } = req.params;
    newcomment.username=loggedUser.username
    newcomment.img=loggedUser.img
    await postdb.findById(idPost).catch(() => res.redirect('/') )
    let post = await postdb.findById(idPost)
    await postdb.updateOne ({_id:idPost},{$push: {
        comments: {
           $each: [newcomment] 
            }
    }})
    await postdb.updateOne({_id:idPost},{commentsCounter:(post.commentsCounter)+1})

    res.redirect(`/signin#${post._id}`)
}
)
router.delete('/:idPost/:id', async(req, res) => {
    let { idPost, id } = req.params;
    let post = await postdb.findById(idPost)
     post.comments = post.comments.filter(c => c._id != id)
     await postdb.updateOne({_id:idPost},{comments: post.comments})
     await postdb.updateOne({_id:idPost},{commentsCounter:(post.commentsCounter)-1})
     res.redirect(`/signin#${post._id}`)

})
router.patch('/:idPost/:id', async(req, res) => {
    let { idPost, id } = req.params;
    let newText = req.body;
    let post = await postdb.findById(idPost)
    comment = post.comments.find(c => c._id == id) 
    comment.Comment = newText.UpdatedComment;
    await postdb.updateOne({_id:idPost},{comments: post.comments})
    res.redirect(`/#signin${post._id}`)
})
router.patch('/:idPost',async (req, res) => {
    let { idPost } = req.params;
    let post = await postdb.findById(idPost)
    let Editdata = req.body;
    if (Editdata) {
        if (Editdata.DescriptionEdit != '')
            post.description = Editdata.DescriptionEdit
        if (Editdata.img != '')
            post.img = Editdata.img;
    } 
     await postdb.updateOne({_id:idPost},{comments: post.comments})
    res.redirect(`/signin#${post._id}`)
})
router.delete(['/:idpost'],async (req, res) => {
    let { idpost } = req.params;
    await postdb.findByIdAndDelete(idpost)
    if(req.path.includes('signin/'))
    res.redirect(`/signin`)
    else
    res.redirect('/')
})
router.post('/newpost', async(req, res) => {
    let formdata = req.body
    if (formdata.username != '' && (formdata.img != '' || formdata.Description != '')) {
        let newpost = { }
        if (formdata.Description != '') {
            newpost.description = formdata.Description
        }
        if (formdata.img != '') {
            newpost.img = formdata.img
        }
        newpost.userImg=loggedUser.img
        newpost.username = loggedUser.username
        newpost.date=new Date();  
        console.log(newpost)
        await postdb.insertMany([newpost],{ ordered: false });
        res.redirect(`/Signin#${newpost._id}}`)
    }
    else
        res.redirect('/Signin')
})
module.exports=router