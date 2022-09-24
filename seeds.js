const mongoose=require('mongoose');
const user=require('./models/user')
const post=require('./models/post')
mongoose.connect('mongodb://localhost:27017/fairyTail').then(()=>{
console.log('Working')
}).catch((e)=>{
    console.log("ERROR")
})
async function lol() {
  await user.findByIdAndUpdate('62e277fa5ee5ed5c721227a4',{username:"Seif"})
 let a= await user.findById('62e277fa5ee5ed5c721227a4')
 console.log(a)
}
lol()
// post.insertMany(
//     [
//         {
//           Reacts: 16,
//           commentsCounter: 2,
//           comments: [
//             {
//               username: "Gedo",
//               Comment: "help",
//               img: "Gedo.jpg"
//             },
//             {
//               username: "marwan",
//               Comment: "LOVE ❤❤❤",
//               img: "randpic2.jpg"
//             }
//           ],
//           description: "  ",
//           img: "randpic3.jpg",
//           userImg: "Gedo.jpg",
//           username: "Gedo"
//         },
//         {
//           Reacts: 14,
//           commentsCounter: 1,
//           comments: [
//             {
//               username: "Gedo",
//               Comment: "same",
//               img: "Gedo.jpg"
//             }
//           ],
//           description: "انا مش فاهم",
//           userImg: "https://static.tvmaze.com/uploads/images/medium_portrait/363/907665.jpg",
//           username: "Amir"
//         },
//         {
//           Reacts: 17,
//           commentsCounter: 4,
//           comments: [
//             {
//               username: "marwan",
//               img: "randpic2.jpg",
//               Comment: "AMAZING",
//             },
//             {
//               username: "Amir",
//               Comment: "hello",
//               img: "https://static.tvmaze.com/uploads/images/medium_portrait/363/907665.jpg"
//             },
//             {
//               username: "Gedo",
//               Comment: "yella",
//               img: "Gedo.jpg"
//             },
//             {
//               username: "Amir",
//               Comment: "hmmm",
//               img: "https://static.tvmaze.com/uploads/images/medium_portrait/363/907665.jpg"
//             }
//           ],
//           description: "love story",
//           img: "love.png",
//           userImg: "randpic2.jpg",
//           username: "marwan"
//         },
//         {
//           username: "Amir",
//           userImg: "https://static.tvmaze.com/uploads/images/medium_portrait/363/907665.jpg",
//           img: "lol.png",
//           description: "anime pic",
//           Reacts: 31,
//           commentsCounter: 5,
//           comments: [
//             {
//               img: "Gedo.jpg",
//               username: "Gedo",
//               Comment: "same",
//             },
//             {
//               username: "Aya",
//               Comment: "lol",
//               img: "Error.jpg",
//             },
//             {
//               username: "Amir",
//               Comment: "help",
//               img: "https://static.tvmaze.com/uploads/images/medium_portrait/363/907665.jpg"
//             },
//             {
//               img: "hoss.jpg",
//               username: "Hoss",
//               Comment: "I'm here",
//             },
//             {
//               username: "marwan",
//               Comment: "LOVE",
//               img: "randpic2.jpg"
//             }
//           ]
//         },
//         {
//           username: "Hoss",
//           userImg: "Hoss.jpg",
//           img: "2pic.png",
//           description: "One punch man Pic",
//           Reacts: 49,
//           commentsCounter: 2,
//           comments: [
//             {
//               username: "Amir",
//               Comment: "im done",
//               img: "https://static.tvmaze.com/uploads/images/medium_portrait/363/907665.jpg"
//             },
//             {
//               username: "Aya",
//               Comment: "lol",
//               img: "Error.jpg"
//             }
//           ]
//         }
//       ]).then(s=>console.log(s));
/*user.insertMany([{
    username:'Amir',
    password:"amir is awesome",
    img:"https://static.tvmaze.com/uploads/images/medium_portrait/363/907665.jpg",
    postids:['62e230d311b7da42cc0fb0dc','62e230d311b7da42cc0fb0d5']
},
{
    username:'gedo',
    password:"i love simba",
    img:"Gedo.jpg",
    postids:['62e230d311b7da42cc0fb0d2',]
},
{
    username:'Aya',
    password:"dead inside",
    img:"Error.jpg"
},
{
  username:'Marwan',
  password:"fairytail",
  img:"randpic2.jpg",
  postids:['62e230d311b7da42cc0fb0d7']
},
{
  username:'Hoss',
  password:"i dont know",
  img:"hoss.jpg",
  postids:['62e230d311b7da42cc0fb0e2']
}
]).then(r=>console.log(r));*/