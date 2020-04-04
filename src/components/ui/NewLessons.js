import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {renderField} from '../formsParts';

const NewLessons=({newLessons=f=>f, lang, keyv})=>{
    
    let lname=(keyv!==undefined)?`lname-${keyv}`:'lname';
    let ldesc=(keyv!==undefined)?`ldesc-${keyv}`:'ldesc';
    
    
    return(
 
        <div className="form-row">
            <div className="col form-group" >
                
                <Field name={lname} component={renderField} type="text" placeholder={lang.name} />
            </div>
            <div className="col form-group" >
                
                <Field name={ldesc} component={renderField} type="text" placeholder={lang.desc} />
            </div>
            <div className="col form-group"><button className="btn btn-outline-secondary my-2 my-sm-0" onClick={newLessons}>+</button></div>
        </div>        
    
    );   
};

NewLessons.propTypes={
    refName: PropTypes.func,
    refDesc: PropTypes.func,
    newLessons: PropTypes.func,
    lang: PropTypes.object,
    keyv: PropTypes.string
};


export default NewLessons;