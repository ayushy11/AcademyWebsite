const express = require("express"); // express module imported
const path = require("path");   // path imported
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;


// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Address: String,
    Desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC CONFIG
app.use('/static',express.static('static')); // Set the static files directory
app.use(express.urlencoded()); // form data -> express.

// PUG SPECIFIC CONFIG
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views',path.join(__dirname,'views')); // Set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{    
    const param = { };
    res.status(200).render('index.pug',param);
});

app.get('/contact',(req,res)=>{    
    const param = { };
    res.status(200).render('contact.pug',param);
});

app.post('/contact',(req,res)=>{    

    var myData = new Contact(req.body); //object
    myData.save().then(()=>{
        res.send("This item has been saved in the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');

});


// START THE SERVER
app.listen(port,()=>{
    console.log(`The application successfully started on port ${port}`);
});