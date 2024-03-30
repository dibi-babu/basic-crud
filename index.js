const { log } = require("console");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

const port = 8080;
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: Number,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

//Read API
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});
// create user
app.post("/create", async (req, res) => {
    try {
      console.log(req.body);
      const data = new userModel(req.body);
      await data.save();
      res.json({ success: true, message: "user added successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "An error occurred while adding the user", error: error.message });
    }
  });
  
// update user
app.post("/update", async (req, res) => {
    try {
    console.log(req.body);
    const {id,...rest} =  req.body;
    await userModel.updateOne({_id:id},rest)
    res.send({ success: true, message: "user updated successfully" });
} catch (error) {
    res.status(500).json({ success: false, message: "An error occurred while updating the user", error: error.message });
  }
  });
// delete user
  app.delete("/delete/:id", async (req, res) => {
    try {
    console.log(req.body);
    const id =  req.params.id;
    await userModel.deleteOne({_id:id})
    res.send({ success: true, message: "user Deleted successfully" });
} catch (error) {
    res.status(500).json({ success: false, message: "An error occurred while updating the user", error: error.message });
  }
  });
  
  

mongoose
  .connect("mongodb://localhost:27017/CrudOperation")
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
