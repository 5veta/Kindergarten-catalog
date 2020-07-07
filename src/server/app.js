import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import router from './routes/clients';
import moder from './routes/admin';
import session from 'express-session';
import {respond, logger, addStoreToRequestPipeline} from './middlewares';
import {initialState} from '../initialState.js';
const app=express();

const staticCSS = fs.readFileSync(path.join(__dirname, '../../node_modules/bootstrap/dist/css/bootstrap.min.css'));
const mystaticCSS = fs.readFileSync(path.join(__dirname, '../../App.css'));
const staticJQ=fs.readFileSync(path.join(__dirname, '../../node_modules/jquery/dist/jquery.min.js'));
const staticJS = fs.readFileSync(path.join(__dirname, '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'));
const fileAssets = express.static(path.join(__dirname, '../../dist/assets/'));

const serverStore=storeFactory(true, initialState());

app.use(bodyParser.json());
app.use(logger);
app.use(fileAssets);
app.use(session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false,
                httpOnly: true
            } 
    }));
app.use(addStoreToRequestPipeline(serverStore));
app.use("/", router);
app.use("/moder", moder);
app.use(respond(serverStore));
    
    //catch 404 and forward to error handler
//    app.use(function(req, res, next){
//     var err=new Error('Not Found');
//     err.status=404;
//     next(err);
//    });
    
    // error handler
 //   app.use(function(err, req, res, next) {
    // set locals, only providing error in development
//  res.locals.message = err.message;
 //    res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
//     res.status(err.status || 500);
 //    res.render('error');
 //   });
    
    
    export default app;
