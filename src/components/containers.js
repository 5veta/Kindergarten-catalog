import { connect } from 'react-redux';
import Home from './ui/Home';
import Countries from './ui/Countries';
import SelForm from './ui/SelForm';
import Kgardens from './ui/Kgardens';
import AddingF from './ui/AddingF';
import KidsGarden from './ui/KidsGarden';
import Kgarden from './ui/Kgarden';
import Login from './ui/Login';
import Logout from './ui/Logout';
import CreateAccount from './ui/CreateAccount';
import Menu from './ui/Menu';
import NewKgs from './ui/NewKgs';
import PassRecovery from './ui/PassRecovery';
import Attantion from './ui/Attantion';
import ForgotPassword from './ui/ForgotPassword';
import ListOfUserKgs from './ui/ListOfUserKgs';
import {Accaunt, AdminAccaunt} from './ui/Accaunt';
import DropdownLang from './ui/DropdownLang';
import UserProfile from './ui/UserProfile';
import Footer from './ui/Footer';
import {getCountry, getSelval, addKgarden, checkUser, checkAUser, addUser, logoutUser, logoutAUser, countLessons, changeLocale, getListNewKg, moderateNewKg, forgotPassword, recoveryPassword, checkLink, changePass, deleteKg} from '../actions';
import {kgardensList, oneKgarden, filterRegions, filterLocation, getTranslation} from '../lib/utils.js';

export const HomePage=connect(
    (state) =>
        ({
            lang: getTranslation(state, 'selkg')
        })
)(Home);

export const FormtoSel=connect(
    (state, props) =>
        ({
            countries: state.countries,
            regions: filterRegions(state, props.match.cids),
            rdiloc: filterLocation(state, props.match.regids),
            lang: props.lang,
            history: props.history,
            match: props.match
        })
)(SelForm);

export const KGList=connect(
    (state, props) =>
        ({
            kgardens: kgardensList(state, props.match.regids, props.match.locids),
            lang: props.lang,
            match: props.match
        })
)(Kgardens)

export const FooterC=connect(
    state=>({
        isLogin: state.useradm.isAdm,
        lang: getTranslation(state, 'menu')
    })
)(Footer);

export const AdmNewKgsList=connect(
    state=>({
        isLogin: state.useradm.isAdm,
        newkglist: state.useradm.newkglist,
        lang: getTranslation(state, 'admin')
    }),
    dispatch=>
    ({
        onModerateNewKg(data){
            dispatch(moderateNewKg(data));
        },
        ongetListNewKg(){
            dispatch(getListNewKg());
        },
        onDeleteKg(data){
            dispatch(deleteKg(data));
        }
    })
)(NewKgs);

export const UserKGs=connect(
    state=>({
        kgslist: state.user.userskgs,
        lang: getTranslation(state, 'accaunt')
    })
)(ListOfUserKgs);

export const UserAccaunt=connect(
    state=>({
        isLogin: state.user.islogined,
        lang: getTranslation(state, 'accaunt')
    })
)(Accaunt);

export const AdmAccaunt=connect(
    state=>({
        isAdm: state.useradm.isAdm,
        lang: getTranslation(state, 'admin')
    })
)(AdminAccaunt);

export const MenuC=connect(
    state=>({
        isLogin: state.user.islogined,
        login: state.useradm.isAdm?state.useradm.login:state.user.login,
        lang: getTranslation(state, 'menu')
    })
)(Menu);

export const CUserProfile=connect(
    state=>({
        isLogin: state.user.islogined,
        login: state.useradm.isAdm?state.useradm.login:state.user.login,
        lang: getTranslation(state, 'accaunt')
    }),
    dispatch=>({
        onChangePass(data){
            dispatch(changePass(data));
        }
    })
)(UserProfile);

export const LangMenu=connect(
    state=>({
        items: state.translator.langs,
        locale: state.translator.locale
    }),
    dispatch=>({
        onChangeLocale(data){
            dispatch(changeLocale(data));
        }
    })
)(DropdownLang);

export const LogoutF=connect(
    state=>({
        login: state.useradm.login,
        lang: getTranslation(state, 'logout')
    }),
    dispatch=>
    ({
        onLogout(data){
            dispatch((data.login)?logoutAUser():logoutUser());
        }
    })
)(Logout);

export const LoginF=connect(
    state=>({
        islogin: state.user.islogined,
        login: state.user.login,
        lang: getTranslation(state, 'login')
    }),
    dispatch=>
    ({
        onCheckUser(data){
            dispatch(checkUser(data));
        }
    })
)(Login);

export const LoginAF=connect(
    state=>({
        islogin: state.useradm.isAdm,
        login: state.useradm.login,
        lang: getTranslation(state, 'login')
    }),
    dispatch=>
    ({
        onCheckUser(data){
            dispatch(checkAUser(data));
        }
    })
)(Login);

export const CreateAccountF=connect(
    state=>({
        islogined: state.user.islogined,
        lang: getTranslation(state, 'createaccount')
    }),
    dispatch=>
    ({
        onAddUser(data){
            dispatch(addUser(data));
        }
    })
)(CreateAccount);

export const ForgotPass=connect(
     state=>({
        islogined: state.user.islogined,
        status: state.user.forgotpass.status,
        lang: getTranslation(state, 'forgotpass')
    }),
    dispatch=>
    ({
        onForgotPassword(data){
            dispatch(forgotPassword(data));
        }
    })
)(ForgotPassword);

export const PasswordRecovery=connect(
    (state, props)=>({
        islogined: state.user.islogined,
        link: props.match.params.token,
        status: state.user.forgotpass.status,
        lang: getTranslation(state, 'forgotpass')
    }),
    dispatch=>
    ({
        onRecoverPassword(data){
            dispatch(recoveryPassword(data));
        },
        onCheckLink(data){
            dispatch(checkLink(data));
        }
    })
)(PassRecovery);

export const AttantionLogined=connect(
    state=>({
        attantion: getTranslation(state, 'attantionlogined')
    })
)(Attantion);

export const AddKgardens=connect(
    state=>({
        formpicture: (state.form.addform===undefined||state.form.addform.values===undefined || state.form.addform.values.file_name===undefined)?null:state.form.addform.values.file_name[0],
        countries: state.countries,
        regions: state.regions.filter(v=>String(v.cid)===state.selectedforadd.scountry),
        regdistrs: state.regiondistricts.filter(v=>String(v.rid)===state.selectedforadd.sregions),
        locations: state.locations.filter(v=>String(v.rdid)===state.selectedforadd.sregiondistricts),
        towndist: state.towndistricts.filter(v=>v.lid===state.selectedforadd.slocations),
        streets: (state.selectedforadd.stowndists)?state.streets.filter(v=>String(v.tdid)===state.selectedforadd.stowndists):state.streets.filter(v=>v.lid===state.selectedforadd.slocations),
        locid: state.selectedforadd.slocations,
        streetid: state.selectedforadd.sstreet,
        ifadded: state.selectedforadd.addkgid,
        currency: state.currency,
        lessons: state.selectedforadd.lessons,
        isLogin: state.user.islogined,
        alogin: state.useradm.isAdm,
        lang: getTranslation(state, 'addkg'),
    }),
    dispatch=>
    ({
        onSelectval(data){
            dispatch(getSelval(data));
        },
        onNewKgarden(data){
            dispatch(addKgarden(data));
        },
        onCountLessons(data){
            dispatch(countLessons(data));
        }
        
    })
)(AddingF);



export const CountrySel = connect(
    state=>({
        countries: state.countries,
    }),
    dispatch=>
    ({
        onCountry({country}){
            dispatch(getCountry(country));
        }
    })
)(Countries);

export const KgardenDetails=connect(
    (state, props)=>({
        kgarden: oneKgarden(state, props),
        lang: getTranslation(state, 'kg')
    })
)(KidsGarden);

export const KgardenDetailsAccaunt=connect(
    (state, props)=>({
        kgarden: oneKgarden(state, props),
        lang: getTranslation(state, 'kg')
    })
)(Kgarden);