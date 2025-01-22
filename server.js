// const http=require('http');
// const calculate=require("./calculator")
// const server=http.createServer((req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/html"});
//     res.end("<h1>Hello World</h1>");
// });

//  server.listen(3000,()=>{       //   this is a port
//     console.log("Server running at http://127.0.0.1:3000/")
// })

// const http = require('http');
// const calculate = require('./calculator');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });

//     let a = 10, b = 20;
//     let addition = calculate.add(a, b);
//     let subtraction = calculate.sub(a, b);
//     let multiplication = calculate.mul(a, b);
//     let division = calculate.div(a, b);

//     res.write(`a = ${a}, b = ${b}<br>`);
//     res.write(`Addition: ${addition}<br>`);
//     res.write(`Subtraction: ${subtraction}<br>`);
//     res.write(`Multiplication: ${multiplication}<br>`);
//     res.write(`Division: ${division}<br>`);

//     res.end(); 

// });

// server.listen(3000, () => {
//     console.log("Server running at http://127.0.0.1:3000/");
// });


const { json } = require('express/lib/response');
const fs=require('fs');

// fs.appendFile('sample.txt','\n a new text',(err)=>{
//     if(err){
//         console.log(err);
//     }
// })
// fs.readFile('sample.txt',"utf8",(err,data)=>{
//     if(err){
//         console.log(err)
//         return 
//     }
//     console.log(data)
// })
const newperson={
        name:"Devi",
        age:21,
        dept:"CSE"
}

// fs.readFile('sample.json','utf8',(err,data)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     const json=JSON.parse(data)
//     const newlist=[...json,newperson]
//     fs.writeFile('sample.json',JSON.stringify(newlist),(err)=>{
//         if(err){
//             console.log(err)
//             return
//         }
//     })
// })

fs.readFile('sample.json','utf8',(err,data)=>{
    if(err){
        console.log(err)
        return
    }
    const json=JSON.parse(data)
    const newlist=json.filter((data)=>data.name!=="Sara")
    fs.writeFile('sample.json',JSON.stringify(newlist),(err)=>{
        if(err){
            console.log(err)
            return
        }
    })
})