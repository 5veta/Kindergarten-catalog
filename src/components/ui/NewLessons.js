import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {renderField} from '../formsParts';

const NewLessons=({fields, meta: { error, submitFailed}, lang })=>{
    
    return(
        <div>
            <div className="form-row">
                <div className="col form-group" >
                    <button type="button" onClick={() => fields.push({})} className="btn btn-outline-secondary">
                        Add Lessons
                    </button>
                    {submitFailed && error && <span>{error}</span>}
                </div>
            </div>
            {fields.map((lesson, index) => (
            <div className="form-row" key={index}>
                <div className="col form-group" >
                    <Field
                      name={`${lesson}.lname`}
                      type="text"
                      component={renderField}
                      placeholder={lang.name}
                    />
                </div>
                <div className="col form-group" >
                    <Field
                      name={`${lesson}.ldesc`}
                      type="text"
                      component={renderField}
                      placeholder={lang.desc}
                    />
                </div>
                <div className="col form-group" >
                    <button
                        type="button"
                        title="Remove Lesson"
                        onClick={() => fields.remove(index)}
                        className="btn btn-outline-secondary my-2 my-sm-0"
                    >-</button>
                </div>
                
            </div>
            ))}
        </div>  
    );   
};

NewLessons.propTypes={
    lang: PropTypes.object,
    fields: PropTypes.object,
    meta: PropTypes.object
};


export default NewLessons;