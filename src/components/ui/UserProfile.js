import PropTypes from 'prop-types';
import { useState } from 'react';
import { reduxForm } from 'redux-form';
import { SubmissionError } from 'redux-form';
import ChangePassForm from './ChangePassForm';

const PassRecoveryReduxForm = reduxForm({
  // a unique name for the form
  form: 'passchange'
})(ChangePassForm);

const UserProfile=({isLogin, login, lang, onChangePass=f=>f })=>{
  
  const [chstatus, setStatus] = useState(false);
  
  const onSubmit=formData=>{
    if(formData.password===formData.confirmpassword){
      onChangePass({pass:formData.password, user:login});
    }
    else{
      throw new SubmissionError({
        confirmpassword: 'Passwords are not equal',
       _error: 'Passwords are not equal!'
      });
    }
    
  };
  
  return (
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-left align-items-center border-0">
          <div >{lang.userprofile.user}: </div>
          <div className="mx-2">{login}</div>
        </li>
        <li className="list-group-item d-flex justify-content-left align-items-center border-0">
          <div>
            {(chstatus)?
              <PassRecoveryReduxForm onSubmit={onSubmit} lang={lang.userprofile} />:
              <button className="btn col-12 textnavy bordercolor" onClick={() => setStatus(true)} >{lang.userprofile.passchangebutton}</button>
            }
          </div>
        </li>        
      </ul>
  );
};

UserProfile.propTypes={
    isLogin: PropTypes.bool,
    login: PropTypes.string,
    lang: PropTypes.object
};

export default UserProfile;