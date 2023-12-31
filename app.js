const express = require('express')
const path = require('path');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid')
const { connectToServer } = require('./conf/mongo.config');
const app = express()
const PORT = process.env.PORT || 4000

const routeIndex = require('./routers/index');
const routeLogin = require('./routers/login');
const routeLogout = require('./routers/logout');
const routeRegister = require('./routers/register');
const bcrypt = require('bcrypt');


// //server start here
// connectToServer(err => { if (err) console.log(err); else console.log("server start") });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    if (!req.user) {
        res.header('cache-control', 'private,no-cache,no-store,must revalidate')
        res.header('Express', '-1')
        res.header('paragrm', 'no-cache')

    }
    next();
})

//session
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));


//routes
app.use('/', routeIndex);
app.use('/login', routeLogin);
app.use('/logout', routeLogout)
app.use('/register', routeRegister);

app.post('./routers/login.js',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user =await db("users").first('*').where ({email:email});
        if(user){
            const validPass = await bcrypt.compare(password,user.hash);
            if(validPass){
                res.status(200).json("Valid email password");
            }else{
                res.json("Wrong pass!");

            }

        }else{
            res.status(404).json("User not found");

        }
    }
    catch(e){
        console.log(e);
        res.status(500).send("Something broke!");
    }
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))