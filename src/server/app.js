import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import router from './routes/clients';
import moder from './routes/admin';
import App from '../components/App';
import storeFactory from '../store';
import C from '../constants';
//import initialState from '../initialState';
import {initialState, createObjectforState} from '../initialState.js';
import session from 'express-session';
const app=express();

const staticCSS = fs.readFileSync(path.join(__dirname, '../../node_modules/bootstrap/dist/css/bootstrap.min.css'));
const mystaticCSS = fs.readFileSync(path.join(__dirname, '../../App.css'));
//const staticJQCSS = fs.readFileSync(path.join(__dirname, '../../node_modules/jquery-ui-1.12.1/jquery-ui.min.css'));
const staticJQ=fs.readFileSync(path.join(__dirname, '../../node_modules/jquery/dist/jquery.min.js'));
//const staticJQUI=fs.readFileSync(path.join(__dirname, '../../node_modules/jquery-ui-1.12.1/jquery-ui.min.js'));
const staticJS = fs.readFileSync(path.join(__dirname, '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'));
const fileAssets = express.static(path.join(__dirname, '../../dist/assets/'));

const serverStore = storeFactory(true, initialState);

 createObjectforState(serverStore);



serverStore.subscribe(() =>{
 fs.writeFile(
  path.join(__dirname, '../initialState.json'),
  JSON.stringify(serverStore.getState()),
  error => (error) ? console.log("Error saving state!", error) : null
 );
    
});

const buildHTMLPage = ({html, state}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <title>Kids Gardens</title>
        <style>${staticCSS}</style>
        <style>${mystaticCSS}</style>
        
    </head>
    <body>
        <div id="react-container" >${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
        <script>${staticJQ}</script>
        <script>${staticJS}</script>
        
    </body>
</html>
`;

const renderComponentsToHTML = ({url, store}) =>({
        state: store.getState(),
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <App />
                </StaticRouter>
            </Provider>
        )
    });

const makeClientStoreFrom = store => url =>
    ({
        url,
        store: storeFactory(false, store.getState())
    });

const htmlResponse = compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom(serverStore)
);

const respond = ({url}, res) =>
    res.status(200).send(
      htmlResponse(url)
    );

const logger = (req, res, next) => {
    console.log(`Request: ${req.method} request for '${req.url}'`);
    next();
};

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore;
    next();
};

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
    app.use(addStoreToRequestPipeline);
    app.use("/", router);
    app.use("/moder", moder);
    app.use(respond);
    
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
