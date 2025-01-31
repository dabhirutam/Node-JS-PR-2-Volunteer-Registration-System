const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
let volunteers = [];
let singleVolunteer;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {volunteers, singleVolunteer});
});

app.post('/add', (req, res) => {

    if(req.body.id){
        let upadatedRec = volunteers.map(rec => {
            if(rec.id == req.body.id){
                return req.body;
            }else return rec;
        });

        volunteers = upadatedRec;
        singleVolunteer = null;

        console.log(req.body.id, " Volunteer is Upadated..");
        
    }else{
        let newRec = req.body;
        newRec.id = parseInt(Math.random() * 10000);
    
        volunteers.push(newRec);
    }

    res.redirect('/');

    console.log("Volunteer is Created..");
});

app.get('/edit/:id', (req, res) => {
    singleVolunteer = volunteers.find(rec => rec.id == req.params.id);

    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    let upadatedRec = volunteers.filter(rec => rec.id != req.params.id);

    volunteers = upadatedRec;
    res.redirect('/');

    console.log(req.params.id," Volunteer is Deleted..");
});

app.listen(port, err => {
    !err && console.log('Server is running in port ', port);
});