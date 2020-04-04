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
import {createObjectforState} from '../initialState.js';
import session from 'express-session';
const app=express();

const staticCSS = fs.readFileSync(path.join(__dirname, '../../node_modules/bootstrap/dist/css/bootstrap.min.css'));
//const staticJQCSS = fs.readFileSync(path.join(__dirname, '../../node_modules/jquery-ui-1.12.1/jquery-ui.min.css'));
const staticJQ=fs.readFileSync(path.join(__dirname, '../../node_modules/jquery/dist/jquery.min.js'));
//const staticJQUI=fs.readFileSync(path.join(__dirname, '../../node_modules/jquery-ui-1.12.1/jquery-ui.min.js'));
const staticJS = fs.readFileSync(path.join(__dirname, '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'));
const fileAssets = express.static(path.join(__dirname, '../../dist/assets/'));

let initialState={
 kgardens: [],
 countries:[],
 regions:[],
 regiondistricts:[],
 locations:[],
 towndistricts:[],
 streets:[],
 selectedforadd:{scountry:"",sregions:"",sregiondistricts:"",slocations:"",stowndists:"", addkgid:"", lessons:[]},
 findKgardens:{countries:[],regions:[],locations:[], submit:""},
 currency: [["грн.", "₴"], ["USD", "$"]], 
 user: {login: "",  islogined: false, userskgs: []},
 useradm: {login: "", isAadm: false, newkglist: []},
 translator:{
  locale: "ua",
  langs: ["ua", "en", "ru"],
  ua:{
   
   admin: {adminmenuiterms:[{name: "Нові", link: "/admin/added"},{name: "Додати", link: "/admin/newkg"}], headerskglist:{num: "№", name: "Назва", user: "User", action: "Дія"}},
   accaunt: {menuitems:[{name: "Додані садочки", link: "/accaunt/yourkg"},{name: "Додати садочок", link: "/accaunt/newkg"}], headerskglist:{num: "№", name: "Назва", status: "Статус"}},
   addkg:{
    header: "Додати садочок",
    name: "Назва",
    description: "Опис",
    site: "Веб-сторінка",
    phonen: {
     header: "Номери телефонів",
     placeholder: "через кому +38095 111-11-11,+38095 111-11-11"
    },
    time:{
     header: "Робочий день:",
     from: "З...",
     till: "До...",
    },
    age:{
     header: "Вік:",
     from: "З...",
     to: "До..."
    },
    price:{
     header: "Ціни:",
     perhday: "Ціна за пів дня",
     perday: "Ціна за день",
     permonth: "Ціна за місяць",
     peryear: "Ціна за рік",
     annual: "Одноразовий внесок",
     currency: "Валюта"
    },
    address:{
     header: "Адреса:",
     country: "Країна",
     region: "Область",
     regd: "Район",
     loc: "Населений пункт",
     dt: "Район міста",
     street: "Вулиця",
     house: "Будинок",
     appt: "кв.",
     floor: "Поверх"
    },
    nlesson:{
     header: "Заняття:",
     name: "Назва",
     desc: "Опис"
    },
    addbutton: "Додати"
   },
   kg:{
    address: {
     appt: "кв.",
     floor: "поверх"
    },
    timeage: {
    time: "Час:",
    age: "Вік:",
    yearsold: "років"
    },
    price:{
     header: "Ціни:",
     perhday: "за пів дня",
     perday: "за день",
     permonth: "за місяць",
     peryear: "за рік",
     annual: "одноразовий внесок за рік"
    },
    lessons: {
     header: "Заняття:"
    }
   },
   login:{
    header: "Авторизація:",
    email: "E-mail",
    passw: "Пароль",
    loginbutton: "Авторизуватися",
    clearbutton: "Очістити"
   },
   signup:{
    header: "Реєстрація:",
    email: "E-mail",
    passw: "Пароль",
    cpassw: "Підтвердити пароль",
    signupbutton: "Зареєструватися",
    clearbutton: "Очістити"
   },
   logout:{
    logout: "Вийти"
   },
   menu:{
    logo: "KIDS GARDENS",
    about: "Про нас",
    newkg: "Додати новий",
    login: "Увійти",
    signup: "Зареєструватися",
    logout: "Вийти"
   },
   selkg:{
    maineheader: "Знайди свій дитячий садок",
    form:{
     country: "Країна",
     region: "Область",
     location: "Населений пункт"
    },
    kgs:{
     headers:['№', 'Назва', 'Опис', 'Веб-сторінка', 'Телефони', 'Час', 'Вік', 'Ціна/м.', 'Адреса']
    },
   }
  },
  en:{

   accaunt: {menuitems:[{name: "Added Kids gardens", link: "/accaunt/yourkg"},{name: "Add Kid garden", link: "/accaunt/newkg"}], headerskglist:{num: "#", name: "Name", status: "Status"}},
   admin: {adminmenuiterms:[{name: "New Kids gardens", link: "/admin/added"},{name: "Add Kid garden", link: "/admin/newkg"}], headerskglist:{num: "#", name: "Name", user: "User", action: "Action"}},
   addkg:{
    header: "Add kids garden",
    name: "Name",
    description: "Description",
    site: "Web page",
    phonen: {
     header: "Phone numbers",
     placeholder: "join through comma +38095 111-11-11,+38095 111-11-11"
    },
    time:{
     header: "Time:",
     from: "From",
     till: "Till",
    },
    age:{
     header: "Age:",
     from: "From",
     to: "To"
    },
    price:{
     header: "Price:",
     perhday: "Price per haft a day",
     perday: "Price per a day",
     permonth: "Price per a month",
     peryear: "Price per a year",
     annual: "Annual price",
     currency: "Currency"
    },
    address:{
     header: "Address:",
     country: "Country",
     region: "Region",
     regd: "Region District",
     loc: "Location (town, village and etc.)",
     dt: "Town district",
     street: "Street",
     house: "House",
     appt: "Appatment.",
     floor: "floor"
    },
    nlesson:{
     header: "Lessons:",
     name: "Name",
     desc: "Descriptions"
    },
    addbutton: "Add"
   },
   kg:{
    address: {
     appt: "Appt.",
     floor: "floor"
    },
    timeage: {
    time: "Time:",
    age: "Age:",
    yearsold: "years old"
    },
    price:{
     header: "Price:",
     perhday: "per haft a day",
     perday: "per a day",
     permonth: "per a month",
     peryear: "per a year",
     annual: "annual"
    },
    lessons: {
     header: "Lessons:"
    }
   },
   login:{
    header: "Login:",
    email: "E-mail",
    passw: "Password",
    loginbutton: "Login",
    clearbutton: "Clear Values"
   },
   signup:{
    header: "Sign up:",
    email: "E-mail",
    passw: "Password",
    cpassw: "Confirm password",
    signupbutton: "Signup",
    clearbutton: "Clear Values"
   },
   logout:{
    logout: "Logout"
   },
   menu:{
    logo: "KIDS GARDENS",
    about: "About",
    newkg: "New kids garden",
    login: "Login",
    signup: "Signup",
    logout: "Logout"
   },
   nlesson:{},
   selkg:{
    maineheader: "Find your kids garden",
    form:{
     country: "Select country",
     region: "Select region",
     location: "Select location",
    },
    kgs:{
     headers:['#', 'Name', 'Descr', 'site', 'Phone n.', 'Time', 'Age', 'Price/m.', 'Address'],
    }
   }
   
  },
  ru:{
   
   accaunt: {menuitems:[{name: "Добавленные садики", link: "/accaunt/yourkg"},{name: "Добавить садик", link: "/accaunt/newkg"}], headerskglist:{num: "№", name: "Название", status: "Статус"}},
   admin: {adminmenuiterms:[{name: "Новые", link: "/admin/added"},{name: "Добавить", link: "/admin/newkg"}], headerskglist:{num: "№", name: "Название", user: "User", action: "Действие"}},
   addkg:{
    header: "Добавить садик",
    name: "Название",
    description: "Описание",
    site: "Веб-страница",
    phonen: {
     header: "Номера телефонов",
     placeholder: "через запятую +38095 111-11-11,+38095 111-11-11"
    },
    time:{
     header: "Рабочее время:",
     from: "С",
     till: "До",
    },
    age:{
     header: "Возраст:",
     from: "С",
     to: "До"
    },
    price:{
     header: "Цены:",
     perhday: "Цена за пол дня",
     perday: "Цена за день",
     permonth: "Цена за месяц",
     peryear: "Цена за год",
     annual: "Ежегодный взнос",
     currency: "Валюта"
    },
    address:{
     header: "Адрес:",
     country: "Страна",
     region: "Область",
     regd: "Район",
     loc: "Населенный пункт",
     dt: "Район города",
     street: "Улица",
     house: "Дом",
     appt: "кв.",
     floor: "Этаж"
    },
    nlesson:{
     header: "Развивающие занятия:",
     name: "Название",
     desc: "Описание"
    },
    addbutton: "Добавить"
   },
   kg:{
    address: {
     appt: "кв.",
     floor: "этаж"
    },
    timeage: {
    time: "Время:",
    age: "Возраст:",
    yearsold: "лет"
    },
    price:{
     header: "Цены:",
     perhday: "за пол дня",
     perday: "за день",
     permonth: "за месяц",
     peryear: "за год",
     annual: "ежегодный взнос"
    },
    lessons: {
     header: "Занятия:"
    }
   },
   login:{
    header: "Авторизация:",
    email: "E-mail",
    passw: "Пароль",
    loginbutton: "Авторизироваться",
    clearbutton: "Очистить"
   },
   signup:{
    header: "Регистрация:",
    email: "E-mail",
    passw: "Пароль",
    cpassw: "Подтвердить пароль",
    signupbutton: "Зарегистрироваться",
    clearbutton: "Очистить"
   },
   logout:{
    logout: "Выйти"
   },
   menu:{
    logo: "KIDS GARDENS",
    about: "О нас",
    newkg: "Добавить новый",
    login: "Войти",
    signup: "Регистрация",
    logout: "Выйти"
   },
   selkg:{
    maineheader: "Найди свой детский садик",
    form:{
     country: "Страна",
     region: "Область",
     location: "Населенный пункт"
    },
    kgs:{
     headers:['№', 'Название', 'Описание', 'Веб-страница', 'Телефоны', 'Время', 'Возраст', 'Цена/м.', 'Адрес']
    }
   }
  }
 }
};

const serverStore = storeFactory(true, initialState);
//const changeinitState=()=>{
 //initialState.kgardens=[1,2,3];
 createObjectforState(serverStore);
 //.then(sobj=>{console.log('Sobj:'+JSON.stringify(sobj));
   //serverStore.dispatch({kgardens: sobj.kgardens, countries: sobj.countries, regions: sobj.regions, regiondistricts: sobj.regiondistricts, locations: sobj.locations, towndistricts: sobj.towndistricts, streets: sobj.streets, type:C.ALL_KEYS});
 // });
 //.then(result=>{initialState=result; console.log(initialState);});
 
 //next();
//};
//changeinitState();
//console.log(JSON.stringify(serverStore.getState()));



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
        
    </head>
    <body>
        <div id="react-container">${html}</div>
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
