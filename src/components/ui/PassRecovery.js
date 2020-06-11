import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import {Redirect} from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import {Logined} from '../containers';
import Attantion from './Attantion';
import Massage from './Massage';
import ChangePassForm from './ChangePassForm';



const PassRecoveryReduxForm = reduxForm({
  // a unique name for the form
  form: 'passrecovery'
})(ChangePassForm);

const PassRecovery=({islogined, link, status, onRecoverPassword=f=>f, onCheckLink=f=>f, lang})=>{
    let arr=link.split('_');
    
    const onSubmit=(formData)=>{
      if(formData.password===formData.confirmpassword){
        onRecoverPassword({pass:formData.password, user:arr[2]});
      }
      else{
        throw new SubmissionError({
          confirmpassword: 'Passwords are not equal',
         _error: 'Passwords are not equal!'
        })
      }
        
    };
    
    return (
      <div>
      {(islogined)?
        <AttantionLogined  />:
        (status==="sent")?
        onCheckLink({token: link, id: arr[2]}):
        (status==="false")?
        <Attantion attantion={lang.wronglink} />:
        (status==="")?
        <Massage massage={lang.massage} />:
        <div className="row justify-content-center">
          <div className="flex-row p-2  col-5 ">
            <h5 className="textnavy">{lang.header}</h5>
            <PassRecoveryReduxForm onSubmit={onSubmit} lang={lang}/>
          </div>
        </div>
              
      }
      </div> 
         
    );
};

PassRecovery.propTypes={
    islogined: PropTypes.bool,
    link: PropTypes.string,
    status: PropTypes.string,
    onRecoverPassword: PropTypes.func,
    onCheckLink: PropTypes.func,
    lang: PropTypes.string
};

export default PassRecovery;