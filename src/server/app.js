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
const mystaticCSS = fs.readFileSync(path.join(__dirname, '../../App.css'));
//const staticJQCSS = fs.readFileSync(path.join(__dirname, '../../node_modules/jquery-ui-1.12.1/jquery-ui.min.css'));
const staticJQ=fs.readFileSync(path.join(__dirname, '../../node_modules/jquery/dist/jquery.min.js'));
//const staticJQUI=fs.readFileSync(path.join(__dirname, '../../node_modules/jquery-ui-1.12.1/jquery-ui.min.js'));
const staticJS = fs.readFileSync(path.join(__dirname, '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'));
const fileAssets = express.static(path.join(__dirname, '../../dist/assets/'));

let initialState={
 files: {},
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
 user: {login: "",  islogined: false, userskgs: [], forgotpass:{status: "false", time: ""}},
 useradm: {login: "", isAdm: false, newkglist: []},
 translator:{
  locale: "ua",
  langs: ["ua", "en", "ru"],
  ua:{
   
   admin: {adminmenuiterms:[{name: "Нові", link: "/admin/added"},{name: "Додати", link: "/admin/newkg"}], headerskglist:{num: "№", name: "Назва", user: "User", action: "Дія"}},
   accaunt: {userprofile:{user: "Користувач", passchangebutton: "Змінити пароль", passw: "Пароль", cpassw: "Підтвердити пароль"}, menuitems:[{name: "Профіль", link: "/accaunt"}, {name: "Дитячі садочки", link: "/accaunt/yourkg"},{name: "Додати", link: "/accaunt/newkg"}], headerskglist:{num: "№", name: "Назва", status: "Статус"}},
   attantionlogined: "Ви вже авторизовані",
   addkg:{
    header: "Додати дитячий садок",
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
     perhday: "Ціна/пів дня",
     perday: "Ціна/день",
     permonth: "Ціна/місяць",
     peryear: "Ціна/рік",
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
    addbutton: "Додати",
    clearbutton: "Очістити"
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
     annual: "одноразовий внесок"
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
    clearbutton: "Очістити",
    forgotpass: "Відновити пароль",
    createaccount: "Зареєструватися"
   },
   createaccount:{
    header: "Реєстрація:",
    email: "E-mail",
    passw: "Пароль",
    cpassw: "Підтвердити пароль",
    createaccountbutton: "Зареєструватися",
    clearbutton: "Очістити"
   },
   logout:{
    logout: "Вийти"
   },
   forgotpass:{
    recoverbutton: "Відновити пароль",
    header: "Відновлення паролю",
    passchangebutton: "Змінити пароль",
    passw: "Пароль",
    cpassw: "Підтвердити пароль",
    sent: "Ссилка для відновлення паролю була відправлена на ваш email!",
    wronglink: "Невірна ссилка!",
    massage: "Пароль змінено."
   },
   menu:{
    logo: "KINDERGARTENS.pro",
    about: "Про нас",
    newkg: "Додати новий",
    login: {text: "Авторизуватися", link: "/login"},
    signup: "Зареєструватися",
    logout: "Вийти",
    enter: "Увійти"
   },
   selkg:{
    maineheader: "Приватні дитячі садочки",
    form:{
     country: "Країна",
     region: "Область",
     location: "Населений пункт"
    },
    kgs:{
     headers:['№', 'Назва', 'Опис', 'Телефони', 'Час', 'Вік', 'Ціна/м.', 'Адреса'],
     age: "років",
     price: {
      day: "д",
      halfday: "пів",
      month: "м",
      year: "р",
      annual: "одноразово"
     }
    }
   }
  },
  en:{
   attantionlogined: "You have logged in already",
   accaunt: {userprofile:{user: "User", passchangebutton: "Change password", passw: "Password", cpassw: "Confirm password"}, menuitems:[{name: "Profile", link: "/accaunt"}, {name: "Pre schools", link: "/accaunt/yourkg"},{name: "Add New", link: "/accaunt/newkg"}], headerskglist:{num: "#", name: "Name", status: "Status"}},
   admin: {adminmenuiterms:[{name: "Newly List", link: "/admin/added"},{name: "Add New", link: "/admin/newkg"}], headerskglist:{num: "#", name: "Name", user: "User", action: "Action"}},
   addkg:{
    header: "Add pre school",
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
     perhday: "Price/haft a day",
     perday: "Price/day",
     permonth: "Price/month",
     peryear: "Price/year",
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
    addbutton: "Add",
    clearbutton: "Clear Values"
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
    clearbutton: "Clear Values",
    forgotpass: "Forgot password",
    createaccount: "Create account"
   },
   createaccount:{
    header: "Create account:",
    email: "E-mail",
    passw: "Password",
    cpassw: "Confirm password",
    createaccountbutton: "Create account",
    clearbutton: "Clear Values"
   },
   logout:{
    logout: "Logout"
   },
   forgotpass:{
    recoverbutton: "Recover password",
    header: "Password recovery",
    passchangebutton: "Change password",
    passw: "Password",
    cpassw: "Confirm password",
    sent: "A password reset link has been sent to your email!",
    wronglink: "Wrong link!",
    massage: "Password have been changed."
   },
   menu:{
    logo: "KINDERGARTENS.pro",
    about: "About",
    login: {text: "Login", link: "/login"},
    signup: "Signup",
    logout: "Logout",
    enter: "Enter"
   },
   nlesson:{},
   selkg:{
    maineheader: "Private preschools.",
    form:{
     country: "Select country",
     region: "Select region",
     location: "Select location"
    },
    kgs:{
     headers:['#', 'Name', 'Descr', 'Phone n.', 'Time', 'Age', 'Price/m.', 'Address'],
     age: "years",
     price: {
      day: "d",
      halfday: "halfd",
      month: "m",
      year: "y",
      annual: "one time"
     }
    }
   }
   
  },
  ru:{
   attantionlogined: "Вы уже авторизованы",
   accaunt: {userprofile:{user: "Пользователь", passchangebutton: "Изменить пароль", passw: "Пароль", cpassw: "Подтвердить пароль"}, menuitems:[{name: "Профиль", link: "/accaunt"}, {name: "Садики", link: "/accaunt/yourkg"},{name: "Добавить", link: "/accaunt/newkg"}], headerskglist:{num: "№", name: "Название", status: "Статус"}},
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
     perhday: "Цена/пол дня",
     perday: "Цена/день",
     permonth: "Цена/месяц",
     peryear: "Цена/год",
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
    addbutton: "Добавить",
    clearbutton: "Очистить"
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
    clearbutton: "Очистить",
    forgotpass: "Восстановить пароль",
    createaccount: "Зарегистрироваться"
   },
   createaccount:{
    header: "Регистрация:",
    email: "E-mail",
    passw: "Пароль",
    cpassw: "Подтвердить пароль",
    createaccountbutton: "Зарегистрироваться",
    clearbutton: "Очистить"
   },
   logout:{
    logout: "Выйти"
   },
   forgotpass:{
    recoverbutton: "Восстановить пароль",
    header: "Восстановление пароля",
    passw: "Пароль",
    cpassw: "Подтвердить пароль",
    passchangebutton: "Изменить пароль",
    sent: "На ваш email была отправлена ссылка для восстановления пароля.",
    wronglink: "Неверная ссылка!",
    massage: "Пароль изменен."
   },
   menu:{
    logo: "KINDERGARTENS.pro",
    about: "О нас",
    newkg: "Добавить новый",
    login: {text: "Авторизироваться", link: "/login"},
    signup: "Регистрация",
    logout: "Выйти",
    enter: "Войти"
   },
   selkg:{
    maineheader: "Частные детские садики",
    form:{
     country: "Страна",
     region: "Область",
     location: "Населенный пункт"
    },
    kgs:{
     headers:['№', 'Название', 'Описание', 'Телефоны', 'Время', 'Возраст', 'Цена/м.', 'Адрес'],
     age: "лет",
     price: {
      day: "д",
      halfday: "пол",
      month: "м",
      year: "г",
      annual: "единожды"
     }
    }
   }
  }
 }
};

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
