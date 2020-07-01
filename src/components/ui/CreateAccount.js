import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {Redirect} from 'react-router-dom';
import {required, muxlengthCreator, minlengthCreator, emailvalid} from '../../lib/validators';
import {renderField} from '../formsParts';
import { SubmissionError } from 'redux-form';

const muxlength30=muxlengthCreator(30);
const minlength8=minlengthCreator(8);
const minlength6=minlengthCreator(6);

const CreateAccountForm=props=>{
    
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
                    <button className="btn  mr-1 mbuttons"  type="submit" disabled={props.submitting}>
                        {props.lang.createaccountbutton}
                    </button>
                    <button className="btn mbuttons"  type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
                        {props.lang.clearbutton}
                    </button>
                  </div>
                  
                </div>
                
            </form>
          
    );
};



const CreateAccountReduxForm = reduxForm({
  // a unique name for the form
  form: 'createaccount'
})(CreateAccountForm);

const CreateAccount=({islogined, onAddUser=f=>f, lang})=>{
    
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
        <Redirect to="/accaunt" />:
        <div className="min-vh-100 d-flex justify-content-md-center bg-light">
          <div className="p-2 w-50 d-flex flex-column justify-content-center">
          <div className="flex-fill"><h5 className="" style={{color: "#3b5f82"}}>{lang.header}</h5></div>
          <div className="flex-fill"><CreateAccountReduxForm onSubmit={onSubmit} lang={lang}/></div>
          </div>
        </div>
              
      }
      </div> 
         
    );
};

CreateAccount.propTypes={
    islogined: PropTypes.bool,
    onAddUser: PropTypes.func,
    lang: PropTypes.string
};

export default CreateAccount;