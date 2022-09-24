let express = require('express');
let app = express();
//var fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser')
let methodOverride = require("method-override")

const mongoose = require('mongoose')
const postdb = require('./models/post')
const userdb=require('./models/user');

const { triggerAsyncId } = require('async_hooks');
const { send } = require('process');

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false, }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
require('dotenv').config();
let signin=require('./router/signin')
let test=require('./router/test')
const port = process.env.PORT || 8080;
mongoose.connect('mongodb://localhost:27017/fairyTail').then(() => {
    console.log('Working')
}).catch((e) => {
    console.log("ERROR")
})

app.listen(port, () => {
    console.log(`launched on port ${port}`)
})

let loggedUser=null;
app.use(async(req,res,next)=>{
    next()
})

app.use('/signin',signin);


//home
app.get(['/','/home'], async (req, res) => {
    let posts = await postdb.find({}).sort({ date: -1 });
    res.render('index', { posts })
    loggedUser=null
})


///SignUp
app.post('/SignUp', async(req, res) => {
    newuser = req.body;
    newuser.username=newuser.username.charAt(0).toUpperCase() + newuser.username.slice(1).toLowerCase();
    newuser.username= newuser.username.trim()
    await userdb.insertMany([newuser])
    let user= await userdb.find({username:newuser.username})
    if(user[0].username)
    {
        res.send("User Already Exist. Please Login")
    }
    else
    res.redirect('/')
})

//Reacts
app.get('/:postid/:React', async (req, res) => {
    let { postid, React } = req.params
    let ReactNum = parseInt(React) + 1
    let post = await postdb.findById(postid)
    if (ReactNum && postid)
        await postdb.findByIdAndUpdate(postid, { Reacts: ReactNum }, { runValidators: true, new: true })
    res.redirect(`/#${post._id}`)
    
   
})
//creat comment
app.post(['/comment/:idPost'], async (req, res) => {
    let newcomment = req.body;
    newcomment.username=newcomment.username.charAt(0).toUpperCase() + newcomment.username.slice(1).toLowerCase();
    newcomment.username= newcomment.username.trim()
    let { idPost } = req.params;
    let newcommentImg=await userdb.findOne({username:newcomment.username})
    console.log(newcommentImg.img)
    newcomment.img=newcommentImg.img
    await postdb.findById(idPost).catch(() => res.redirect('/') )
    let post = await postdb.findById(idPost)
    await postdb.updateOne ({_id:idPost},{$push: {
        comments: {
           $each: [newcomment] 
            }
    }})
    await postdb.updateOne({_id:idPost},{commentsCounter:(post.commentsCounter)+1})

    res.redirect(`/#${post._id}`)

}
)

//delete comment
app.delete('/:idPost/:id', async(req, res) => {
    let { idPost, id } = req.params;
    let post = await postdb.findById(idPost)
     post.comments = post.comments.filter(c => c._id != id)
     await postdb.updateOne({_id:idPost},{comments: post.comments})
     await postdb.updateOne({_id:idPost},{commentsCounter:(post.commentsCounter)-1})
     if(req.path.includes('/signin'))
     res.redirect(`/signin#${post._id}`)
     else
     res.redirect(`/#${post._id}`)
})
//edit comment
app.patch('/:idPost/:id', async(req, res) => {
    let { idPost, id } = req.params;
    let newText = req.body;
    let post = await postdb.findById(idPost)
    comment = post.comments.find(c => c._id == id) 
    comment.Comment = newText.UpdatedComment;
    await postdb.updateOne({_id:idPost},{comments: post.comments})
    res.redirect(`/#${post._id}`)
})
//edit post
app.patch('/:idPost',async (req, res) => {
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
    res.redirect(`/#${post._id}`)
})
//get req didnt work
//search bar
app.post('/search', async(req, res) => {
    let search = req.body.q;
    if (search != '') {
       search=search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
          search= search.trim()
          console.log(search)
        let posts=await postdb.find({username:search})
        res.render('index', { posts })
    }
    else {
        res.redirect(`/`)
    }
})
//delete post
app.delete(['/:idpost'],async (req, res) => {
    let { idpost } = req.params;
    await postdb.findByIdAndDelete(idpost)
    if(req.path.includes('signin/'))
    res.redirect(`/signin`)
    else
    res.redirect('/')
})
//creat post 
app.post('/', async(req, res) => {
    let formdata = req.body
    if (formdata.username != '' && (formdata.img != '' || formdata.Description != '')) {
        let newpost = { }
        if (formdata.Description != '') {
            newpost.description = formdata.Description
        }
        if (formdata.img != '') {
            newpost.img = formdata.img
        }
        formdata.username=formdata.username.charAt(0).toUpperCase() + formdata.username.slice(1).toLowerCase();
        formdata.username= formdata.username.trim()
        let postimg=await userdb.findOne({username:formdata.username})
        newpost.userImg=postimg.img
        newpost.username = formdata.username 
        newpost.date=new Date();  

        await postdb.insertMany([newpost],{ ordered: false });
        let us=  await userdb.find({username:formdata.username});
        let pos= await postdb.find({username:formdata.username})
        pos=pos[0];
        us=us[0];
        us.postids.push(pos._id);

        res.redirect(`/#${newpost._id}}`)
    }
    else
        res.redirect('/')

})

// app.get('/x',(req,res)=>{
// chicke.fly()
// })
app.use((err,req,res,next)=>{
console.log("Error",err)
next()
})
app.use((req,res,next)=>{
    res.render('notfound')
})

// let SaveToJson = () => {
//     fs.writeFileSync('./public/data.json', JSON.stringify(data, null, 4), (err) => {
//         if (err) { console.error(err); return; };
//         console.log("File has been created");
//     });
// }
