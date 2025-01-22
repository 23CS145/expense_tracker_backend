const express=require('express')
const mongoose=require('mongoose')
const app=express()
app.use(express.json()); //pre-defined middle-ware
const { v4 : uuidv4 } =require( 'uuid');

mongoose.connect("mongodb://localhost:27017/expenses").then(()=>{
    console.log("Connected to MongoDB")
})
const expenseSchema=new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    title:{type:String,require:true},
    amount:{type:Number,require:true}
})

const Expense=mongoose.model("Expense",expenseSchema)

app.get("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params
    const expenses=await Expense.findOne({id});
    if(!expenses){
        res.status(404).send({message:"No expenses found"})
    }
    res.status(200).json(expenses)
})

// const expenses=[{
//     id:1,
//     title:"Food",
//     amount:200
// },{
//     id:2,
//     title:"Clothes",
//     amount:700
// }]
// app.get('/api/expenses',(req,res)=>{
//     // console.log(req.query);
//      res.status(200).json(expenses)
    
// })

// app.get('/api/expenses/:id',(req,res)=>{
//     const { id }=req.params;
//     const expense=expenses.find(((expense)=>expense.id==id))
//     if(!expense){
//         res.status(404).json({message:"Not found"})
//         return
//     }
//     res.status(200).json(expense)
// })

app.post("/api/expenses", async (req, res) => {
    try {
        console.log(req.body);
        const { title, amount } = req.body;
        if (!title || !amount) {
            return res.status(400).json({ message: "Please provide both title and amount" });
        }
        const newExpense = new Expense({
            id: uuidv4(),
            title,
            amount
        });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

app.delete("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params
    try{
    const deletedExpenses=await Expense.findOneAndDelete({id});
    if(!deletedExpenses){
        res.status(404).json({message:"Expense not found"})
            return         
    }
    res.status(200).json({message:"Deleted Successfully"})
    }catch(error){
        res.status(500).json({message:"Internal Server Error",error: error.message})
    }
    })

app.put("/api/expenses/:id", async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;    
        try {
            const updatedExpense = await Expense.findOneAndUpdate({id },updateData,{ new: true });    
            if (!updatedExpense) {
                return res.status(404).json({ message: "Expense not found" });
            }    
            res.status(200).json(updatedExpense);
        } catch (error) {
            res.status(500).json({ message: "Error updating expense", error: error.message });
        }
    });
    

app.listen(3000,()=>{
    console.log("Server is running"); 
})


