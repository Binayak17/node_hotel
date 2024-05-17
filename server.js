const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to ${req.originalUrl}`);
    next();
}
app.use(logRequest);

passport.use( new LocalStrategy(async (USERNAME, PASSWORD, done) => {
    // authentication logic
    try{
        const user = await Person.findOne({username : USERNAME});
        if(!user)
            return done(null, false, {message: 'Incorrect username'});
        const isPasswordMatch = PASSWORD === user.password;
        if(!isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, {message: 'Incorrect password'});
    }catch(err){
        return done(err);
    }
    
}))

app.use(passport.initialize());

app.get('/',passport.authenticate('local', {session: false}) ,function (req, res){
    res.send('Welcome')
})

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})
//comment added

