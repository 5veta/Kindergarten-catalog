import {selectallcountries, selectallregions, selectallregsdistricts, selectalllocations, selectalltowndistricts, selectallstreets} from './db/addresses';
import {selectallkgardens} from './db/kindergartens';

export const initialState={
    files: {},
    kgardens: [],
    countries:[],
    regions: [],
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
                maineheader: "Приватні дитячі садочки",
                text: "Знайдить свій приватний садок, обравши країну та регіон. Зареєстровані користувачі можут додати новий садочок, якщо його немає в каталозі.",
                logo: "KINDERGARTENS.pro",
                about: "Про нас",
                home: "Головна",
                newkg: "Додати новий",
                login: {text: "Авторизуватися", link: "/login"},
                signup: "Зареєструватися",
                logout: "Вийти",
                enter: "Увійти"
            },
            selkg:{
                text: "Приватні дитячі садочки",
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
                maineheader: "Private preschools",
                text: "Find you Kindergarten. For this you should select the country and the region where you want to review preschools. It is also possible to add a new kindergarten for an authorized user.",
                logo: "KINDERGARTENS.pro",
                home: "Home",
                about: "About",
                login: {text: "Login", link: "/login"},
                signup: "Signup",
                logout: "Logout",
                enter: "Enter"
            },
            selkg:{
                text: "Private preschools",
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
                maineheader: "Частные детские садики",
                text: "Найдите свой частный детский сад. Для этого нужно выбрать страну и область. Зарегистрировавшись, можно добавить свой садик, если его нет в каталоге.",
                logo: "KINDERGARTENS.pro",
                home: "Главная",
                about: "О нас",
                newkg: "Добавить новый",
                login: {text: "Авторизироваться", link: "/login"},
                signup: "Регистрация",
                logout: "Выйти",
                enter: "Войти"
            },
            selkg:{
                text: "Частные детские садики",
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

const getDataFromDB=async()=>{
    initialState.kgardens=await selectallkgardens().catch(error => console.error(`Kgardens: ${error}`));
    initialState.countries=await selectallcountries().catch(error => console.error(`Country: ${error}`));
    initialState.regions=await selectallregions().catch(error => console.error(`Regions: ${error}`));
    initialState.regiondistricts=await selectallregsdistricts().catch(error => console.error(`Districts of regions: ${error}`));
    initialState.locations=await selectalllocations().catch(error => console.error(`Locations: ${error}`));
    initialState.towndistricts=await selectalltowndistricts().catch(error => console.error(`Towns districts: ${error}`));
    initialState.streets=await selectallstreets().catch(error => console.error(`Streets: ${error}`));
};

const getinitialState=()=>{
    getDataFromDB();
    return initialState;
};

