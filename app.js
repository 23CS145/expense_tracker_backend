const express = require("express");
const mongoose = require("mongoose");
const app = express();

const { v4: uuidv4 } =require("uuid");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const cors=require('cors')


app.use(express.json());
app.use(cors())

mongoose.connect("mongodb+srv://saranya:sara123@cluster21.tubv8.mongodb.net/expenses").then(() => {
  console.log("Connect to MongoDB");
});
const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: String, required: true }
});

const Expense = mongoose.model("Expense", expenseSchema);

const userSchema=new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  uname:{type:String,require:true},
  email:{type:String,require:true,unique:true},
  password:{type:String,require:true}

})
const User= mongoose.model('User',userSchema)

app.get("/api/expenses",async (req, res) => {
  console.log(req.user)
  try{
  const expenses = await Expense.find()
  if(!expenses){
    res.status(406).send({message:"No expense found"})
    return
  }
  res.status(200).json(expenses);
}catch{
  res.status(500).json({message:"Internal Server Error"})
}
});

app.get("/api/expenses/:id", async(req, res) => {
  try{
  const { id } = req.params;
  const expense = await Expense.findOne({id})
  if (!expense) {
    res.status(404).json({ message: "Not Found" });
    return
  }
  res.status(200).json(expense);
}catch{
  res.status(500).json({message:"Internal Server Error"})
}
});

app.post("/api/expenses", async (req, res) => {
  
  try{
  const { title, amount } = req.body;
  if (!title || !amount) {
    res.status(400).json({ message: "Please provide both title and amount" });
    return
  }
  const newExpense = new Expense({ id: uuidv4(), title, amount });
  const savedExpense = await newExpense.save();
  res.status(201).json(savedExpense);
}catch{
  res.status(500).json({message:"Internal Server Error"})
}
});

app.delete("/api/expenses/:id", async(req,res) => {
  
  const {id} = req.params;
  try{
    const deleteExpenses= await Expense.findOneAndDelete({id})
    if(!deleteExpenses){
      res.status(404).json({message:"Expense not found"})
      return
    }
    res.status(200).json({message:"Deleted Successfully"})
  }catch(error){
    res.status(500).json({message:"Internal Server Error"})
  }
})

app.put("/api/expenses/:id",async(req,res) => {
  const {id} =req.params;
  const { title, amount } = req.body;
  try{
    if (!title && !amount) {
      res.status(400).json({ message: "Please provide at least one field to update" });
      return;
    }
    const updateExpense=await Expense.findOneAndUpdate(
      {id},{$set:{...(title && {title}), ...(amount && {amount})}},{new:true}
    )
    if(!updateExpense){
      res.status(404).json({message:"Expense not found"})
      return
    }
      res.status(200).json(updateExpense);
  }catch{
    res.status(500).json({message:"Internal Server Error"})
  }
}) 

app.post("/register", async (req, res) => {
  const { email, uname, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: uuidv4(),
      email,
      uname,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}); 

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.listen(3000, () => {
  console.log("Server is running");
});