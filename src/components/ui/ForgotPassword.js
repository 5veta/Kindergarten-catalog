import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {Redirect} from 'react-router-dom';
import {required, emailvalid} from '../../lib/validators';
import {renderField} from '../formsParts';
import { SubmissionError } from 'redux-form';
import {AttantionLogined} from '../containers';
import Massage from './Massage';

const ForgotPasswordForm=props=>{
    
    return (
            
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <Field name="email" component={renderField} type="email" label={"Email"} placeholder={"Email"} validate={[required, emailvalid]}/>
        </div>
               
        <div className="form-row">
          <div className="col form-group" >
            <button className="btn  mr-1 mbuttons"  type="submit" disabled={props.submitting}>
              {props.lang.recoverbutton}
            </button>
          </div>
        </div>
                
      </form>
    );
};


const ForgotPasswordReduxForm = reduxForm({
  // a unique name for the form
  form: 'fogotpassword'
})(ForgotPasswordForm);

const ForgotPassword=({islogined, status, onForgotPassword=f=>f, lang})=>{
    
    const onSubmit=(formData)=>{
        
        onForgotPassword({email:formData.email});
    };
    return (
      <div>
      {(islogined)?
        <AttantionLogined  />:
        (status==='sent')?
        <Massage massage={lang.sent} />:
        <div className="row justify-content-center">
          <div className="flex-row p-2  col-5 ">
            <h5 className="" style={{color: "#3b5f82"}}>{lang.header}</h5>
            <ForgotPasswordReduxForm onSubmit={onSubmit} lang={lang}/>
          </div>
        </div>
              
      }
      </div> 
         
    );
};

ForgotPassword.propTypes={
    islogined: PropTypes.bool,
    onRecover: PropTypes.func
};

export default ForgotPassword;