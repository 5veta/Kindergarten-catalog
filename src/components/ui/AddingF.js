import PropTypes from 'prop-types';
import NewLessons  from './NewLessons';
import { renderToString } from 'react-dom/server';
import {Redirect} from 'react-router-dom';
import { Field, reduxForm, FieldArray } from 'redux-form';
import {hoursarray, agev} from '../../lib/utils';
import {required, muxlengthCreator, minlengthCreator, emailvalid, number, sitevalid, phoneNumber, houseapptNumber, lettersPointDash, normalizePhone} from '../../lib/validators';
import {renderField, renderSelectField, renderAutocompleteField, renderFileField} from '../formsParts';
import { SubmissionError } from 'redux-form';

const muxlength200=muxlengthCreator(200);
const minlength8=minlengthCreator(8);


const hours=hoursarray(6, 22, []);

const AddingForm=(props)=>{
   
  return(
    <form onSubmit={props.handleSubmit} id="addform" encType="multipart/form-data">
      <div className="form-row">
        <div className="col form-group">
          <Field name="file_name" component={renderFileField} type="file" value="null" />
          
        </div>
      </div>
       <div className="form-row">
        <div className="col form-group">
          <Field name="name" component={renderField} type="text" label={props.lang.name} placeholder={"Name"} validate={[required, muxlength200]}/>
        </div>
      </div>
            
      <div className="form-row">
        <div className="col form-group">
          <Field name="descr" component={renderField} type="textarea" label={props.lang.description} placeholder={"Description"} validate={[required]}/>    
        </div>
      </div>
            
      <div className="form-row">
        <div className="col form-group">      
          <Field name="site" component={renderField} type="text" label={props.lang.site} placeholder={"http: or https://site"} validate={[sitevalid]}/>
        </div>
        <div className="col">
          <Field name="phnumb" component={renderField} type="text" label={props.lang.phonen.header} placeholder={props.lang.phonen.placeholder}  validate={[required, phoneNumber]} normalize={normalizePhone}/>
        </div>
      </div>
            
      <div className="row">
        <div className="col-6" >
          <label  htmlFor="timefrom">{props.lang.time.header}</label>
        </div>
        <div className="col-6" >
          <label  htmlFor="agefrom">{props.lang.age.header}</label>
        </div>
      </div>
            
      <div className="form-row">
        <div className="col-6 col-sm-6 col-md-3 form-group" >
          <Field name="timef" component={renderSelectField} type="text" arrv={hours} firstoption={props.lang.time.from} validate={[required]}/>
        </div>
        <div className="col-6 col-sm-6 col-md-3 form-group">
          <Field name="timet" component={renderSelectField} type="text" arrv={hours} firstoption={props.lang.time.till}  validate={[required]}/>
        </div>
        <div className="col-6 col-sm-6 col-md-3 form-group" >
          <Field name="agef" component={renderSelectField} type="text" arrv={agev} firstoption={props.lang.age.from} validate={[required]}/>
        </div>
        <div className="col-6 col-sm-6 col-md-3 form-group">
          <Field name="aget" component={renderSelectField} type="text" arrv={agev} firstoption={props.lang.age.to} validate={[required]}/>
        </div>
      </div>
            
      <div className="form-row">
        <div className="col-12 col-sm-12 col-md-2 form-group" >        
          <Field name="prperhday" component={renderField} type="text" label={props.lang.price.perhday} placeholder={props.lang.price.perhday} validate={[number]}/>
        </div>
        <div className="col-12 col-sm-12 col-md-2 form-group" >
          <Field name="prperday" component={renderField} type="text" label={props.lang.price.perday} placeholder={props.lang.price.perday} validate={[number]}/>
        </div>
        <div className="col-12 col-sm-12 col-md-2 form-group" >
          <Field name="prpem" component={renderField} type="text" label={props.lang.price.permonth} placeholder={props.lang.price.permonth} validate={[number]}/>
        </div>
        <div className="col-12 col-sm-12 col-md-3 form-group" >
          <Field name="prpery" component={renderField} type="text" label={props.lang.price.peryear} placeholder={props.lang.price.peryear} validate={[number]}/>
        </div>
        <div className="col-12 col-sm-12 col-md-3 form-group" >
          <Field name="prann" component={renderField} type="text" label={props.lang.price.annual} placeholder={props.lang.price.annual}  validate={[number]}/>
        </div>              
      </div>
      <div className="form-row">
        <div className="col-12 col-sm-12 col-md-4 form-group" >
          <Field name="pcurrency" component={renderSelectField} type="text"  opvalsh="1" label={props.lang.price.currency} arrv={props.currency} firstoption={props.lang.price.currency} validate={[required]}/>
        </div>               
      </div>
  
      <div className="form-row">
        <div className="col form-group" >      
          <Field name="countryv" component={renderSelectField} type="text" optval="cid" opvalsh="name" arrv={props.countries} onChange={props.changecountry} label={props.lang.address.country}  validate={[required]}/>
        </div>
        <div className="col form-group" >      
          <Field name="regv" component={renderSelectField} type="text" optval="rid" opvalsh="name" onChange={props.changereg} arrv={props.regions} label={props.lang.address.region} validate={[required]}/>
        </div>
        <div className="col form-group" >                    
          <Field name="regdv" component={renderSelectField} type="text" optval="rdid" opvalsh="name"  onChange={props.changeregdts} arrv={props.regdistrs} label={props.lang.address.regd} validate={[required]}/>
        </div>
      </div>
            
      <div className="form-row">
        <div className="col-12 col-sm-12 col-md-3 form-group">                    
          <Field name="locv" component={renderAutocompleteField} optionarr={props.locations} actionBlur={props.changeloc} opid="lid" opvalf="lstatus" opval="name" type="text" label={props.lang.address.loc} placeholder={props.lang.address.loc} locid={props.locid}/>
        </div>
        {
          props.towndist[0]?
          <div className="col-12 col-sm-12 col-md-3 form-group" >
            <Field name="tdv" component={renderSelectField} type="text" optval="tdid" opvalsh="name" onBlur={props.changetowndts} arrv={props.towndist} label={props.lang.address.dt} validate={[required]}/>
          </div>:
          <div></div>
        }
        <div className="col-12 col-sm-12 col-md-3 form-group ">
          <Field name="stv" component={renderAutocompleteField} type="text" optionarr={props.streets} actionBlur={props.changestreet} opid="stid" opvalf="streettype" opval="streetname" label={props.lang.address.street} placeholder={props.lang.address.street}  streetid={props.streetid} />
        </div>  
      </div>
            
      <div className="form-row">
        <div className="col form-group">
          <Field name="house" component={renderField} type="text"  label={props.lang.address.house} placeholder={props.lang.address.house} validate={[required, houseapptNumber]}/>
        </div>
        <div className="col form-group">
          <Field name="appt" component={renderField} type="text"  label={props.lang.address.appt} placeholder={props.lang.address.appt}  validate={[houseapptNumber]}/>
        </div>
        <div className="col form-group">
          <Field name="floor" component={renderField} type="text"  label={props.lang.address.floor} placeholder={props.lang.address.floor}  validate={[number]}/>
        </div>
      </div>
      <div className="row">
        <div className="col-12" >
          <label  htmlFor="timefrom">{props.lang.nlesson.header}</label>
        </div>
      </div>
      <FieldArray name="lessons" component={NewLessons} lang={props.lang.nlesson} />
            
      <div className="form-row">
        <div className="col form-group" >
          <button className="btn btn-outline-secondary my-2 my-sm-0 mr-2 mbuttons" disabled={props.submitting} >{props.lang.addbutton}</button>
          <button className="btn mbuttons" type="button" disabled={props.pristine || props.submitting} onClick={props.reset}>
            {props.lang.clearbutton}
          </button>
        </div>
      </div>
            
    </form>
  );
};

const AddReduxForm = reduxForm({
  // a unique name for the form
  form: 'addform'
})(AddingForm);

const AddingF=({formpicture, countries=[], regions=[], regdistrs=[], locations=[], towndist=[], streets=[], streetid="", locid="", ifadded, currency, onSelectval=f=>f, onNewKgarden=f=>f, lessons=[], onCountLessons=f=>f, isLogin, alogin, lang})=>{
  
  const submit=(reduxformData, dispatch, props)=>{
      
      if(locid===""){
        throw new SubmissionError({
           locv: 'Select location',
          _error: 'Field location is empty'
        })
      }
      if(streetid===""){
        throw new SubmissionError({
           stv: 'Select street',
          _error: 'The field street is empty'
        })
      }
      let formData = new FormData();
      let string_lessons=JSON.stringify(reduxformData.lessons);
      Object.keys(reduxformData).map(val=>{
        formData.append(val, reduxformData[val]);
      });
      formData.set("lessons", string_lessons);
      formData.append("upfile", formpicture);
      formData.append("locv", locid);
      formData.append("sid", streetid);
      
      onNewKgarden(formData);
      props.reset();
      onCountLessons({type: "added_kgarden", target_value: false});
     
  };
   
  const changecountry=(event, newValue, previousValue)=>{
    onSelectval({type: "sel_country", target_value: newValue});
  };
    
  const changereg=(event, newValue, previousValue)=>{  
    onSelectval({type: "sel_region", target_value: newValue});
  };
    
  const changeregdts=(event, newValue, previousValue)=>{
    onSelectval({type: "sel_regdst", target_value: newValue});
  };
      
  const changeloc=(event)=>{
    if(event.target.value){
      var re = /^\s*([\wА-Яа-яіїёЁІїЇґ][\wА-Яа-яіїёЁІїҐЇґ\.\s]*\.)\s+([\wА-Яа-яіїёЁІҐЇґ][\wА-Яа-яіїёЁІїҐЇґ\s'-]+?[\wА-Яа-яіїёЁІҐЇґ])\s*$/ig;
      var result = re.exec(event.target.value);
      let locationsv=locations.filter(v=>result[1]===v.lstatus && result[2]===v.name)[0];
      
      if(locationsv!==undefined)onSelectval({type: "sel_location", target_value: locationsv.lid});
    }
  };
    
  const changestreet=(event)=>{
    if(event.target.value){
      var re = /^\s*([\wА-Яа-яіїёЁІїЇґ][\wА-Яа-яіїёЁІїҐЇґ-]*\.)\s+([\wА-Яа-яіїёЁІҐЇґ][\wА-Яа-яіїёЁІїҐЇґ\s\d'-]+?[\wА-Яа-яіїёЁІҐЇґ\d])\s*$/ig;
      var result = re.exec(event.target.value);     
      let streetsv=streets.filter(v=>v.streettype===result[1] && v.streetname===result[2])[0];
      if(streetsv!==undefined)onSelectval({type: "sel_street", target_value: streetsv.sid});
    }
  };
    
  const changetowndts=(event, newValue, previousValue)=>{
    onSelectval({type: "sel_towndts", target_value: newValue});
  };
    
  const newLessons=(event)=>{
    event.preventDefault();
    event.stopPropagation();  
    onCountLessons({type: "count_lessons", target_value:1});      
  };
  
  return(
    <div>
    {
      (alogin || isLogin)?
      <div className="">
        <div>
          <h5>{lang.header}</h5>
          <AddReduxForm onSubmit={submit} lang={lang} currency={currency} countries={countries} regions={regions} regdistrs={regdistrs} locations={locations} towndist={towndist} streets={streets} changecountry={changecountry}  changereg={changereg} changeregdts={changeregdts} changeloc={changeloc} changetowndts={changetowndts} changestreet={changestreet} lessons={lessons} newLessons={newLessons} locid={locid} streetid={streetid} />
        </div>
      </div>:
      <Redirect to="/" />
    }
    </div>
  );
};

export default AddingF;
