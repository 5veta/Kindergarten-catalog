import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import {required, muxlengthCreator, minlengthCreator, emailvalid} from '../../lib/validators';
import {renderField} from '../formsParts';
import {Redirect} from 'react-router-dom';

const muxlength30=muxlengthCreator(30);
const minlength8=minlengthCreator(8);
const minlength6=minlengthCreator(6);

const LoginForm=props=>{
    
    return (
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <Field name="email" component={renderField} type="email" label={props.lang.email} placeholder={"Email"}
                        validate={[required, muxlength30, minlength8, emailvalid]}/>
                </div>
                <div className="form-group">
                    <Field name="password" component={renderField} type="password" label={props.lang.passw} placeholder={"Password"}
                        validate={[required, muxlength30, minlength6]}/>
                </div>
                {props.error && <div className="text-danger">{props.error}</div>}
                <div className="form-row">
                  <div className="col form-group" >
                    <button className="btn mbuttons mr-1" style={{background: "#3b5f82", color: "white"}} type="submit" disabled={props.submitting}>
                        {props.lang.loginbutton}
                    </button>
                    <button className="btn mbuttons" type="button" style={{background: "#3b5f82", color: "white"}} disabled={props.pristine || props.submitting} onClick={props.reset}>
                        {props.lang.clearbutton}
                    </button>
                  </div>
                  
                </div>
            </form>
               
    );
};



const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(LoginForm);

const Login=({islogin, login, onCheckUser=f=>f, lang})=>{
    
    const onSubmit=(formData)=>{
      console.log('formData'+JSON.stringify(formData));
        onCheckUser(formData);
    };
    
    return (
      <div>
      
      {(islogin && login==='admin')?
        <Redirect to="/admin" />:(islogin)?<Redirect to="/accaunt" />:
        <div className="row justify-content-center">
          <div className="flex-row p-2  col-5 ">
            <h5 className="flex-row justify-content-center" style={{color: "#3b5f82"}}>{lang.header}</h5>
            <LoginReduxForm onSubmit={onSubmit} lang={lang} />
          </div>
        </div>
              
      }
      </div> 
    );
};

Login.propTypes={
    islogin: PropTypes.bool.isRequired,
    onCheckUser: PropTypes.func.isRequired
};

export default Login;