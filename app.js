const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 8080;
const app = express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
var list=[]

app.use('/Resources', express.static(path.join(__dirname, 'Resources')));


app.get('/',function(req,res){
    res.render("index.ejs",{ejes:list})
})


app.post('/',function(req,res){
    var item = req.body.InputField
    if (item && item.trim() !== '') {
        list.push(item.trim());
    }
    
    
    res.redirect('/')
})

app.post('/delete',function(req,res){
    var inum = parseInt(req.body.index);
    if (!isNaN(inum) && inum >= 0 && inum < list.length) {
        list.splice(inum, 1);
    }
    res.redirect('/')

})

app.post('/submit-edit',function(req,res){
    var inum = parseInt(req.body.index);

    if (!isNaN(inum) && inum >= 0 && inum < list.length) {
        list[inum]=req.body.text_edite;
    }
   
    res.redirect('/')
    
})

app.listen(port,function(){
    console.log("Started")
})


