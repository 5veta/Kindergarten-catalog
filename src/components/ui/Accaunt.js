import PropTypes from 'prop-types';
import {AddKgardens, KgardenDetails, KgardenDetailsAccaunt, AdmNewKgsList, UserKGs} from '../containers';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';


const PageTemplate=({children, items})=>{
    
    return (
        
          <div className="container-fluid">
          <div className="d-flex flex-row justify-content-center ">
        <div className="d-flex col-8 ">
            
            <div className="p-2 col-2">
                <Sidebar items={items} />
            </div>
            <div className="p-2 flex-fill " >
                {children}
            </div>
         </div>   
        </div>
        
        </div>
    );
};

const UserKG=()=>{
    return (
        <p>You have not added kids gardens</p>
    );
};



export const Accaunt=({isLogin, lang})=>{
    return (
        (isLogin)?
        <PageTemplate items={lang.menuitems} >
            <Route exact path="/accaunt" component={UserKG} />
            <Route path="/accaunt/newkg" component={AddKgardens} />
            <Route  path="/accaunt/yourkg" component={UserKGs} />
            <Route exact path="/accaunt/yourkg/:id" component={KgardenDetailsAccaunt} />
        </PageTemplate>:
        <Redirect to="/login" />
    );
};

export const AdminAccaunt=({isLogin, lang})=>{
    return (
        
        (isLogin)?
        <PageTemplate items={lang.adminmenuiterms} >
            <Route exact path="/admin" component={UserKG} />
            <Route exact path="/admin/added" component={AdmNewKgsList} />
            <Route exact path="/admin/added/:id" component={KgardenDetailsAccaunt} />
            <Route path="/admin/newkg" component={AddKgardens} />
        </PageTemplate>:
        <Redirect to="/moder" />
        
        
    );
};
