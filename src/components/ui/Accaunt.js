import PropTypes from 'prop-types';
import {AddKgardens, KgardenDetails, KgardenDetailsAccaunt, AdmNewKgsList, UserKGs, CUserProfile} from '../containers';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom';



const PageTemplate=({children, items})=>{
    
    return (
        <div className="container-fluid">
            <div className="d-flex flex-row justify-content-center ">
                <div className="d-flex flex-column flex-sm-column flex-md-row col-8 ">
                
                    <div className="p-2">
                        <Sidebar items={items} />
                    </div>
                    <div className="p-2 flex-fill h-100" >
                        {children}
                    </div>
                </div>   
            </div>
        </div>
    );
};

const UserKG=props=>{
    return (
        <div>Admin accaunt</div>
    );
};



export const Accaunt=({isLogin, lang})=>{
    return (
    
        (isLogin)?
        <PageTemplate items={lang.menuitems} >
            <Route exact path="/accaunt" component={CUserProfile} />
            <Route path="/accaunt/newkg" component={AddKgardens} />
            <Route exact path="/accaunt/yourkg" component={UserKGs} />
            <Route  path="/accaunt/yourkg/:id" component={KgardenDetailsAccaunt} />
        </PageTemplate>:
        <Redirect to="/login" />
    );
};

export const AdminAccaunt=({isAdm, lang})=>{
    return (
        
        (isAdm)?
        <PageTemplate items={lang.adminmenuiterms} >
            <Route exact path="/admin" component={UserKG} />
            <Route exact path="/admin/added" component={AdmNewKgsList} />
            <Route path="/admin/added/:id" component={KgardenDetailsAccaunt} />
            <Route path="/admin/newkg" component={AddKgardens} />
        </PageTemplate>:
        <Redirect to="/moder" />
        
        
    );
};
