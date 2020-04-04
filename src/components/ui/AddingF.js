import PropTypes from 'prop-types';
import NewLessons  from './NewLessons';
import { renderToString } from 'react-dom/server';
import {Redirect} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {hoursarray, agev} from '../../lib/utils';
import {required, muxlengthCreator, minlengthCreator, emailvalid, number, sitevalid, phoneNumber, houseapptNumber, lettersPointDash} from '../../lib/validators';
import {renderField, renderSelectField, renderAutocompleteField} from '../formsParts';


const muxlength200=muxlengthCreator(200);
const minlength8=minlengthCreator(8);


const hours=hoursarray(6, 22, []);

const AddingForm=(props)=>{
   
  return(
    <form onSubmit={props.handleSubmit} id="addform">
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
          <Field name="phnumb" component={renderField} type="text" label={props.lang.phonen.header} placeholder={props.lang.phonen.placeholder}  validate={[phoneNumber]}/>
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
        <div className="col form-group" >
          <Field name="timef" component={renderSelectField} type="text" arrv={hours} firstoption={props.lang.time.from} validate={[required]}/>
        </div>
        <div className="col form-group">
          <Field name="timet" component={renderSelectField} type="text" arrv={hours} firstoption={props.lang.time.till}  validate={[required]}/>
        </div>
        <div className="col form-group" >
          <Field name="agef" component={renderSelectField} type="text" arrv={agev} firstoption={props.lang.age.from} validate={[required]}/>
        </div>
        <div className="col form-group">
          <Field name="aget" component={renderSelectField} type="text" arrv={agev} firstoption={props.lang.age.to} validate={[required]}/>
        </div>
      </div>
            
      <div className="form-row">
        <div className="col form-group" >        
          <Field name="prperhday" component={renderField} type="text" label={props.lang.price.perhday} placeholder={props.lang.price.perhday} validate={[number]}/>
        </div>
        <div className="col form-group" >
          <Field name="prperday" component={renderField} type="text" label={props.lang.price.perday} placeholder={props.lang.price.perday} validate={[number]}/>
        </div>
        <div className="col form-group" >
          <Field name="prpem" component={renderField} type="text" label={props.lang.price.permonth} placeholder={props.lang.price.permonth} validate={[number]}/>
        </div>
        <div className="col form-group" >
          <Field name="prpery" component={renderField} type="text" label={props.lang.price.peryear} placeholder={props.lang.price.peryear} validate={[number]}/>
        </div>
        <div className="col form-group" >
          <Field name="prann" component={renderField} type="text" label={props.lang.price.annual} placeholder={props.lang.price.annual}  validate={[number]}/>
        </div>
        <div className="col form-group" >
          <Field name="pcarrency" component={renderSelectField} type="text"  opvalsh="1" label={props.lang.price.currency} arrv={props.currency} firstoption={props.lang.price.currency} validate={[required]}/>
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
        <div className="col form-group">                    
          <Field name="locv" component={renderAutocompleteField} optionarr={props.locations} actionBlur={props.changeloc} opvalf="lstatus" opval="name" type="text" label={props.lang.address.loc} placeholder={props.lang.address.loc} />
        </div>
        {
          props.towndist[0]?
          <div className="col form-group" >
            <Field name="tdv" component={renderSelectField} type="text" optval="tdid" opvalsh="name" onBlur={props.changetowndts} arrv={props.towndist} label={props.lang.address.dt} validate={[required]}/>
          </div>:
          <div></div>
        }
        <div className="col form-group ">
          <Field name="stv" component={renderAutocompleteField} type="text" optionarr={props.streets} actionBlur={props.changestreet} opvalf="streettype" opval="streetname" label={props.lang.address.street} placeholder={props.lang.address.street} />
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
            
      <NewLessons newLessons={props.newLessons} lang={props.lang.nlesson}/>
      {(props.lessons.length>0)?props.lessons.map((v, i)=>
        <NewLessons key={i} keyv={i} newLessons={props.newLessons} lang={props.lang.nlesson} />
        ):
        <div></div>
      }
            
      <div className="form-row">
        <div className="col form-group" >
          <button className="btn btn-outline-secondary my-2 my-sm-0" disabled={props.submitting} >{props.lang.addbutton}</button>
        </div>
      </div>
            
    </form>
  );
};

const AddReduxForm = reduxForm({
  // a unique name for the form
  form: 'addform'
})(AddingForm);

const AddingF=({countries=[], regions=[], regdistrs=[], locations=[], towndist=[], streets=[], streetid, locid, ifadded, currency, onSelectval=f=>f, onNewKgarden=f=>f, lessons=[], onCountLessons=f=>f, isLogin, alogin, lang})=>{
   
  const submit=(formData)=>{  
            
    let lessarr=Object.keys(formData).filter(v=>/^lname/.test(v)).map(vl=>{ if(vl==='lname'){ let arr=vl.split('-'); return {lname: formData[`lname-${arr[1]}`], ldesc: formData[`ldesc-${arr[1]}`]}; } return {lname: formData.lname, ldesc: formData.ldesc}; });
    console.log(JSON.stringify(formData)+'streetid:'+streetid+'locid: '+locid+'lessarr:'+JSON.stringify(lessarr));
    onNewKgarden({name: formData.name, descr: formData.descr, site: formData.site, phnumb: formData.phnumb, timef: formData.timef, timet: formData.timet, agef: formData.agef, aget: formData.aget, prperhday: formData.prperhday, prperday: formData.prperday, prpem: formData.prpem, prpery: formData.prpery, prann: formData.prann, countryv: formData.countryv, regv: formData.regv, regdv: formData.regdv, locv: locid, tdv: formData.tdv, stv: streetid, house: formData.house, appt: formData.appt, floor: formData.floor, lessons:lessarr, pcarrency:formData.pcarrency});
    onCountLessons({});
     
  };
   
  const changecountry=(event, newValue, previousValue)=>{       
    onSelectval({country: newValue});
  };
    
  const changereg=(event, newValue, previousValue)=>{  
    onSelectval({regions: newValue});
  };
    
  const changeregdts=(event, newValue, previousValue)=>{
    onSelectval({regiondts: newValue});
  };
      
  const changeloc=(event)=>{
    if(event.target.value){
      var re = /^\s*([\wА-Яа-яіїёЁІїЇґ][\wА-Яа-яіїёЁІїҐЇґ\.\s]*\.)\s+([\wА-Яа-яіїёЁІҐЇґ][\wА-Яа-яіїёЁІїҐЇґ\s'-]+?[\wА-Яа-яіїёЁІҐЇґ])\s*$/ig;
      var result = re.exec(event.target.value);
      console.log('event :'+result);
      let locationsv=locations.filter(v=>result[1]===v.lstatus && result[2]===v.name)[0];
      console.log('locationsv :'+JSON.stringify(locationsv)+'\n'+JSON.stringify({locationsv: locationsv.lid}));
      onSelectval({locationsv: locationsv.lid});
    }
  };
    
  const changestreet=(event)=>{
    if(event.target.value){
      var re = /^\s*([\wА-Яа-яіїёЁІїЇґ][\wА-Яа-яіїёЁІїҐЇґ-]*\.)\s+([\wА-Яа-яіїёЁІҐЇґ][\wА-Яа-яіїёЁІїҐЇґ\s\d'-]+?[\wА-Яа-яіїёЁІҐЇґ\d])\s*$/ig;
      var result = re.exec(event.target.value);
      console.log('street :'+result);      
      let streetsv=streets.filter(v=>v.streettype===result[1] && v.streetname===result[2])[0];
      onSelectval({streetsv: streetsv.sid});
    }
  };
    
  const changetowndts=(event, newValue, previousValue)=>{
    onSelectval({towndts: newValue});
  };
    
  const newLessons=(event)=>{
    event.preventDefault();
    event.stopPropagation();  
    onCountLessons({lessons:1});      
  };
   
  return(
    <div>
    {
      (alogin || isLogin)?
      <div className="">
        <div>
          <h5>{lang.header}</h5>
          <AddReduxForm onSubmit={submit} lang={lang} currency={currency} countries={countries} regions={regions} regdistrs={regdistrs} locations={locations} towndist={towndist} streets={streets} changecountry={changecountry}  changereg={changereg} changeregdts={changeregdts} changeloc={changeloc} changetowndts={changetowndts} changestreet={changestreet} lessons={lessons} newLessons={newLessons} />
        </div>
      </div>:
      <Redirect to="/" />
    }
    </div>
  );
};

export default AddingF;
