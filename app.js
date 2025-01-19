const express = require('express');
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv');
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');



// start_cloudinary 
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// end cloudinary 



// this line is used for mongo , db , env file setup 
dotenv.config();
// this line is used for the connection of DB (call)
connectToDB();
// this like is used for calling express 
const app = express();
// this line  is basically for cookie parser 
app.use(cookieParser())


// this line is to set ejs 
app.set('view engine','ejs');



// this line is to set router (compulsory)
app.use(express.json())
app.use(express.urlencoded({extended:true}))



// This line is simply importing all the routes from userRouter.routes.js and index.route.js
app.use('/', indexRouter)
app.use('/user',userRouter)


// start_cloudinary 



// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Replace with your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Replace with your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Replace with your Cloudinary API secret
  });
  
  // Configure storage
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Change folder name as needed
      allowed_formats: ['jpg', 'png', 'gif', 'svg'], // Allowed file formats
    },
  });
  
  const upload = multer({ storage });
  
  app.use(express.static('public'));
  app.set('view engine', 'ejs');
  
  // Route to render the home page
  app.get('/', (req, res) => {
    res.render('home');
  });
  
  // Route to handle file uploads
  app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send({
      message: 'File uploaded successfully!',
      fileUrl: req.file.path,
    });
  });



  
  
// end_cloudinary



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})