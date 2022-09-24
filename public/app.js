let Commentbtns=Array.from(document.getElementsByClassName('Commentbtn'));
let reactComment=Array.from(document.getElementsByClassName('reactComment'));
let dot =Array.from(document.getElementsByClassName('dot'))
let options=Array.from(document.getElementsByClassName('options'));
let btn2= document.getElementById('btn2');
let btn =document.getElementById('btn1');
let con=Array.from(document.querySelectorAll('#container'))
let creatcommentForms=Array.from(document.querySelectorAll('#creatCommentForm'))
let editform=Array.from(document.querySelectorAll('#editform'))
let posts=Array.from(document.getElementsByClassName('post'));

console.log(creatcommentForms[0])
Commentbtns.forEach(btn=>{btn.addEventListener('click',()=>{
let comments=btn.parentElement.parentElement.childNodes[11];
    if(comments.style.display =='block')
    comments.style.display='none';
    else
    comments.style.display='block';
})
})

dot.forEach(d=>{d.addEventListener('click',()=>{
    d.parentNode.childNodes[3].style.display='block';
    d.parentNode.childNodes[3].classList.add('hello')

   window.addEventListener('click',(e)=>{

if(e.target !=d&&e.target!=d.parentElement.childNodes[3].childNodes[3].childNodes[1]&&e.target!=d.parentElement.childNodes[3].childNodes[3].childNodes[3]){
    d.parentNode.childNodes[3].style.display='none';
    d.parentNode.childNodes[3].classList.remove('hello')
}
   })
})
})
options.forEach((op)=>{
    op.addEventListener('click',()=>{
        op.parentElement.childNodes[3].style.display='block';

        window.addEventListener('click',(e)=>{
            if(e.target !=op&&e.target!=  op.parentElement.childNodes[3].childNodes[3].childNodes[5]
                &&e.target!=  op.parentElement.childNodes[3].childNodes[3].childNodes[1]
                ){
                op.parentElement.childNodes[3].style.display='none';
            }

               })
               window.addEventListener('scroll',()=>{
                op.parentElement.childNodes[3].style.display='none';
               })
    })
})
//sign up/in
let Anim=document.getElementById('Animation');
let Anim2=document.getElementById('Animation2');
Anim.addEventListener('click',()=>{
    document.getElementById('SigninUsername').focus()

})
Anim.childNodes[3].addEventListener('keydown',(e)=>{
    if(  Anim.childNodes[3].value){
        Anim.childNodes[1].classList.add('temp')   
    }
    else{
        Anim.childNodes[1].classList.remove('temp')   

    }
})
Anim2.addEventListener('click',()=>{
    Anim2.childNodes[3].focus()
    
})
Anim2.childNodes[3].addEventListener('keydown',(e)=>{
    if(  Anim2.childNodes[3].value){
        Anim2.childNodes[1].classList.add('temp2')   
    }
    else{
        Anim2.childNodes[1].classList.remove('temp2')   

    }
})
btn2.addEventListener('click',()=>{
    con[0].style.display=" inline-block";
    con[1].style.display=" none";
})
btn.addEventListener('click',()=>{
    con[1].style.display=" inline-block";
    con[0].style.display=" none";

})
//let x=window.scrollY;
window.addEventListener('scroll',e=>{
    console.log(window.scrollY)
con[1].style.top=`${window.scrollY + 11}px`;
con[0].style.top=`${window.scrollY + 11}px`;

// if(window.scrollY>x){
//     if(window.scrollY>360&&window.screenY<40){
//         window.scrollTo({ top: 400, behavior: 'smooth' })
//     }

// //window.scrollTo({top:posts[0].offsetTop-60, behavior: 'smooth'})
// }
// x=window.scrollY
})

creatcommentForms.forEach(ccf=>{
    ccf.childNodes[5].addEventListener('click',(e)=>{
        if(ccf.childNodes[1].value==''||ccf.childNodes[3].value==''){
            e.preventDefault()           
        }
    
 })})
 editform.forEach(ef=>{
    ef.childNodes[3].addEventListener('click',(e)=>{
        if(ef.childNodes[1].value==''){
            e.preventDefault()           
        }
    
 })})
