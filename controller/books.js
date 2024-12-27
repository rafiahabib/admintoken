const Book=require('../model/books')
const addBook = async(req,res)=>{
  try{
    const data = req.body
    const book =await Book.create(data)
    res.json({"message":"book created successfully",book})}
    catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
    }

const getSingleBook = async(req,res)=>{
    try{
    const id = req.params.id
    const book = await Book.findById(id)
    res.json({"message":"book read successfully",book})}
    catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
    }

const updateBook=async(req,res)=>{
    try{
    const book= await Book.findByIdAndUpdate(req.params.id).populate('bookid')
    res.json({"message":"update succesfully",book})}
    catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
}
const deleteBook=async(req,res)=>{
    try{
    const id=req.params.id
    const book= await Book.findByIdAndDelete(id)
    console.log("deleted")
    res.json({"message":"delete successfully",book})}
    catch(err){
        console.error(err)
        res.status(500).json({"message":"internal server error"})
    }
}

module.exports = {
    addBook,
    getSingleBook,
    updateBook,
    deleteBook

}