import { connect } from 'react-redux';
import { compose } from 'redux';
import Countries from './ui/Countries';
import Regions from './ui/Regions';
import SelForm from './ui/SelForm';
import Kgardens from './ui/Kgardens';
import AddingF from './ui/AddingF';
import KidsGarden from './ui/KidsGarden';
import Kgarden from './ui/Kgarden';
import Login from './ui/Login';
import Logout from './ui/Logout';
import Signup from './ui/Signup';
import Menu from './ui/Menu';
import NewKgs from './ui/NewKgs';
import ListOfUserKgs from './ui/ListOfUserKgs';
import {Accaunt, AdminAccaunt} from './ui/Accaunt';
import DropdownLang from './ui/DropdownLang';
import {getCountry, getKgardens, getSelval, addKgarden, getSeltofined, checkUser, checkAUser, addUser, logoutUser, logoutAUser, countLessons, changeLocale, getListNewKg, moderateNewKg} from '../actions';
import {kgardensList, oneKgarden, filterRegions, filterLocation, getTranslation} from '../lib/utils.js';


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
        isLogin: state.useradm.isAdm,
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

export const SignupF=connect(
    state=>({
        islogined: state.user.islogined,
        lang: getTranslation(state, 'signup')
    }),
    dispatch=>
    ({
        onAddUser(data){
            dispatch(addUser(data));
        }
    })
)(Signup);


export const AddKgardens=connect(
    state=>({
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



export const FormtoSel=connect(
    (state, props) =>
        ({
            countries: state.countries,
            regions: filterRegions(state, props.match.params.cids),
            rdiloc: filterLocation(state, props.match.params.regids),
            kgardens: kgardensList(state, props.match.params.regids, props.match.params.locids),
            lang: getTranslation(state, 'selkg')
        }),
    dispatch=>
    ({
        onSeltofined(data){
            dispatch(getSeltofined(data));
        },
        onKgardens(data){
            dispatch(getKgardens(data));
        }
    })
)(SelForm);

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