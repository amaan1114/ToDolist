const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const port = process.env.PORT || 8080;
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/todo")
const trySchema  = new mongoose.Schema({
    name:String,
    check:Boolean
});

const item = mongoose.model("task",trySchema)

const todo = new item({
    name:"create some videos",
    check:true
})
// todo.save()
app.use('/Resources', express.static(path.join(__dirname, 'Resources')));


app.get('/',function(req,res){
   item.find({})
        .then(function(items1) {
            res.render("index.ejs", { ejes: items1 });
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error fetching items");
        });
    
});


app.post('/',function(req,res){
    var iteminput = req.body.InputField
    if (iteminput && iteminput.trim() !== '') {
        const todo = new item({
            name:iteminput.trim(),
            
        })   
        todo.save()
    }
    
    
    res.redirect('/')
})

app.post('/delete',function(req,res){
    var inum = req.body.index;
    if(inum){
        item.deleteOne({ name: inum })
        .then(() => res.redirect("/"))
        .catch(err => {
            console.error("Delete failed:", err);
            res.status(500).send("Failed to delete item");
        });

    }
   

})

app.post('/submit-edit',function(req,res){
    const oldName = req.body.oldName.trim();
    const newName = req.body.newName.trim();

    if (!newName) {
        return res.redirect("/");
    }

    item.updateOne({ name: oldName }, { name: newName })
        .then(() => res.redirect("/"))
        .catch(err => {
            console.error("Update failed:", err);
            res.status(500).send("Failed to update item");
        });
    
})

app.post('/checked',function(req,res){
    var oldcheck=req.body.oldcheckName
    const newcheck=  req.body.checkbox1=== "on"
    item.updateOne({name:oldcheck},{check:newcheck})
    .then(()=>res.redirect("/"))
    .catch(err=>{
        console.error("Update failed:", err);
        res.status(500).send("Failed to update item");
    })

})

app.listen(port,function(){
    console.log("Started")
})


