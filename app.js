const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

require('dotenv').config();
// import routes
const userRoutes = require('./routes/user');

// app
const app = express();
// db
mongoose
.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@server.kpngk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

`,
    {
    useNewUrlParser: true,  
    useCreateIndex: true,
    useUnifiedTopology: true,
   useFindAndModify: false
})
.then(() => console.log("Database is connected")
)
.catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
});
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});