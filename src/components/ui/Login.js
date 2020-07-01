import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { SubmissionError } from 'redux-form';
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
          <Field name="email" component={renderField} type="email" label={props.lang.email} placeholder={"Email"} validate={[required, muxlength30, minlength8, emailvalid]}/>
        </div>
        <div className="form-group">
          <Field name="password" component={renderField} type="password" label={props.lang.passw} placeholder={"Password"} validate={[required, muxlength30, minlength6]}/>
        </div>
        {props.error && <div className="text-danger">{props.error}</div>}
         <div className="form-row">
          <div className="col form-group" >
            <button className="btn mbuttons mr-1 mb-1"  type="submit" disabled={props.submitting}>
             {props.lang.loginbutton}
            </button>
            <button className="btn mbuttons mb-1" type="button"  disabled={props.pristine || props.submitting} onClick={props.reset}>
              {props.lang.clearbutton}
            </button>
          </div>
          <div className="form-group">
            <a href="/forgotpass">{props.lang.forgotpass}</a>
          </div>          
        </div>
        <div className="form-group">
          <button className="btn col-12 textnavy bordercolor p-1" ><a className="text-reset" href="/createaccount">{props.lang.createaccount}</a></button>
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
      
        onCheckUser(formData);
    };
    
    return (
      <div className="min-vh-100 d-flex flex-row justify-content-md-center align-items-start bg-light">
      
      {(islogin && login==='admin')?
        <Redirect to="/admin" />:(islogin)?<Redirect to="/accaunt" />:
        <div className="p-2 col-12 col-sm-12 col-md-5 d-flex flex-column justify-content-center">
          
            <div className="flex-fill"><h5 className="textnavy">{lang.header}</h5></div>
            <div className="flex-fill"><LoginReduxForm onSubmit={onSubmit} lang={lang} /></div>
          
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