import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const Logout=({onLogout=f=>f, login, lang})=>{
    
    const submit=(e)=>{
        e.preventDefault();
        console.log('logout inf');
        let logindata=(login==='admin')?true:false;
        onLogout({login: logindata});
    };
    
    return (
        
                <form onSubmit={submit}>
                    <div>
                        <button className="btn btn-light" type="submit">{lang.logout}</button>
                    </div>
                </form>
           
    );
};

Logout.propTypes={
    onLogout: PropTypes.func.isRequired,
    lang: PropTypes.object
};

export default Logout;