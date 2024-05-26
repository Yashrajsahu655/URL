const express = require('express');
const {connectToMongoDB} = require('./connect')
const app = express();
const path = require('path');
const URL = require('./models/url')
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUserOnly} = require('./middleware/auth')

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staicRouter')
const userRoute = require('./routes/user')

const PORT = 8001;



connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log('mongoDB connected'))

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use("/url",restrictToLoggedInUserOnly,urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);


app.get('/url/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const entry =  await URL.findOneAndUpdate({
        shortId
    },{$push:{visitHistory: {
         timestamp:Date.now(),
      },
    },
  })
  res.redirect(entry.redirectURL);
})


app.listen(PORT,console.log(`server started at PORT: ${PORT}`))