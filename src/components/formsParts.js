import useAutocomplete from '@material-ui/lab/useAutocomplete';
import {lettersPointDashPattern} from '../lib/validators';


export const renderAutocompleteField=({input, label, type, meta: { touched, error, warning }, ...props})=>{
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: props.name,
    options: props.optionarr,
    getOptionLabel: option => `${option[props.opvalf]} ${option[props.opval]}`
  });
  return ( 
    <div>
      <div {...getRootProps()}>
        <label style={{color: "#3b5f82"}}>{label}</label>
        <input className={"form-control"+" "+((touched && error)?" border border-danger":"")} {...getInputProps()} onBlur={props.actionBlur} style={{borderColor: "#3b5f82"}} />
        {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
      </div>
      {groupedOptions.length > 0 ? (
        <ul className="list-group border-0" {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li className="list-group-item border-0" {...getOptionProps({ option, index })}>{option[props.opvalf]} {option[props.opval]}</li>
          ))}
        </ul>
      ) : null}
    </div>

    
    
  );
};

export const renderField = ({input, label, type, meta: { touched, error, warning }, ...props}) => (
  <div>
  {
    (label)?
    <div>
      <label style={{color: "#3b5f82"}}>{label}</label>
      <div>
        <input className={"form-control"+" "+((touched && error)?" border border-danger":"")} {...input} id={props.id} placeholder={label} type={type} style={{borderColor: "#3b5f82"}}/>
        {touched &&
          ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>:
    <div>
      <input className={"form-control"+" "+((touched && error)?" border border-danger":"")} {...input} id={props.id} placeholder={label} type={type} style={{borderColor: "#3b5f82"}} />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  }
 </div> 
)

export const renderSelectField = ({input, label, type, meta: { touched, error, warning }, ...props}) => (
  <div>
    {(label)?
    <div>
    <label style={{color: "#3b5f82"}}>{label}</label>
    <div>
      <select className={"custom-select my-1 mr-sm-2"+" "+((touched && error)?" border border-danger":"")} {...input} type={type} style={{borderColor: "#3b5f82"}} >
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
        <option selected>{props.firstoption}</option>
          {props.arrv.map((v,i)=>
            <option key={i} value={(props.optval)?v[props.optval]:v}>{(props.opvalsh)?v[props.opvalsh]:v}</option>
          )}
      </select>
    </div>
    </div>:
    <div>
      <select className={"custom-select my-1 mr-sm-2"+" "+((touched && error)?" border border-danger":"")} {...input} type={type} style={{borderColor: "#3b5f82"}} >
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
        <option selected>{props.firstoption}</option>
          {props.arrv.map((v,i)=>
            <option key={i} value={(props.optval)?v[props.optval]:v}>{(props.opvalsh)?v[props.opvalsh]:v}</option>
          )}
      </select>
    </div>
    
    }
  </div>
)