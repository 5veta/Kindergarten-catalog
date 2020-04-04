import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {Redirect} from 'react-router-dom';
import {required, muxlengthCreator, minlengthCreator, emailvalid} from '../../lib/validators';
import {renderField} from '../formsParts';
import { SubmissionError } from 'redux-form';

const muxlength30=muxlengthCreator(30);
const minlength8=minlengthCreator(8);
const minlength6=minlengthCreator(6);

const SignupForm=props=>{
    
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
                <div className="form-group">
                    <Field name="confirmpassword" component={renderField} type="password" label={props.lang.cpassw} placeholder={"Confirm password"}
                        validate={[required, muxlength30, minlength6]}/>
                </div>
                {props.error && <div className="text-danger">{props.error}</div>}
                <div className="form-row">
                  <div className="col form-group" >
                    <button className="btn btn-outline-secondary mr-1" style={{background: "#3b5f82", color: "white"}} type="submit" disabled={props.submitting}>
                        {props.lang.signupbutton}
                    </button>
                    <button className="btn btn-outline-secondary" style={{background: "#3b5f82", color: "white"}} type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
                        {props.lang.clearbutton}
                    </button>
                  </div>
                  
                </div>
                
            </form>
          
    );
};

SignupForm.propTypes={
    
};

const SignupReduxForm = reduxForm({
  // a unique name for the form
  form: 'singup'
})(SignupForm);

const Signup=({islogined, onAddUser=f=>f, lang})=>{
    
    const onSubmit=(formData)=>{
        console.log(formData);
        if(formData.password!==formData.confirmpassword){
            throw new SubmissionError({
                confirmpassword: 'Passwords are not equal',
                _error: 'Login failed!'
            })
        }
        onAddUser(formData);
    };
    return (
      <div>
      {(islogined)?
        <Redirect to="/" />:
        <div className="row justify-content-center">
          <div className="flex-row p-2  col-5 ">
            <h5 className="" style={{color: "#3b5f82"}}>{lang.singup}</h5>
            <SignupReduxForm onSubmit={onSubmit} lang={lang}/>
          </div>
        </div>
              
      }
      </div> 
         
    );
};

Signup.propTypes={
    islogined: PropTypes.bool,
    onAddUser: PropTypes.func
};

export default Signup;