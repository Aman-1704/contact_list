const express = require('express');

const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join( __dirname, 'views'));
app.use(express.urlencoded());

// middleware
app.use(express.static('assets'));

// app.use(function(req, res, next){
//     req.myName="Aman";
//     // console.log('middleware 1');
//     next();
// })

var contactList = [
    {
        name:"Aman",
        phone:"1234567890"
    },
    {
        name:"Arun",
        phone:"1234098765"
    },
    {
        name:"Pawan",
        phone:"6789012345"
    },
    {
        name:"Atul",
        phone:"1237654890"
    }
    
];



app.get('/', function(req, res){
   
    Contact.find().then((contacts) => {
        return res.render('home',{
            title: "Aman Singh",
            contact_List: contacts
        });
      }).catch((err) => {
        console.log(err);
    });
});

    


app.get('/practice', async function(req, res){
    return await res.render('practice', {
        title:"Let us play with EJS"
    });
});

app.post('/create-contact', function(req, res,)
{  
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then((newContact)=>{
        console.log('*********', newContact);
        return res.redirect('back');
    }).catch((err) => {
        console.log(err);
        return;
    });

    // try {
    //     await Contact.create({
    //       name: req.body.name,
    //       phone: req.body.phone
    //     });
    //     console.log('*********', Contact);
    //     return res.redirect('back');
    // } catch (err) {
    //     console.log(err);
    //     return;
    // }
      

    // contactList.push({
    //     name:req.body.name,
    //     phone: req.body.phone
    // });

   

});

// for deleting a contact
app.get('/delete-contact/', async(req, res)=>{
    
    // get the id from query in the url
    let id = req.query.id;
    console.log(id);
    try {
    //  find the contact in the database using id and delete
    await Contact.findByIdAndDelete(id);
        console.log('deleted');
        return res.redirect('back'); 
    } catch (err) {
        console.log(err);
        return;
    } 
}); 

app.listen(port, function(err){
    if(err){console.log('error in running the server', err)}

    console.log('Yup! my server is running on the port: ', port);
});