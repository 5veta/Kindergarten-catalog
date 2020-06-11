import { Field } from 'redux-form';
import {required, muxlengthCreator, minlengthCreator, emailvalid} from '../../lib/validators';
import {renderField} from '../formsParts';
const muxlength30=muxlengthCreator(30);
const minlength8=minlengthCreator(8);
const minlength6=minlengthCreator(6);

const ChangePassForm=props=>{

    return (
              
           <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <Field name="password" component={renderField} type="password" label={props.lang.passw} placeholder={"Password"}
                        validate={[required, muxlength30, minlength6]}/>
                </div>
                <div className="form-group">
                    <Field name="confirmpassword" component={renderField} type="password" label={props.lang.cpassw} placeholder={"Confirm password"}
                        validate={[required, muxlength30, minlength6]}/>
                </div>
                {props.error && <div className="text-danger">{props.error}</div>}
                <div className="form-group" >
                    <button className="btn  mr-1 mbuttons"  type="submit" disabled={props.submitting}>
                        {props.lang.passchangebutton}
                    </button>
                </div>
         
            </form>
          
    );
};

export default ChangePassForm;