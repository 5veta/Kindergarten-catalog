export const AddKgardens=connect(
    state=>({
        countries: state.countries,
        regions: state.countries.filter(vl=>vl.name===state.selectedforadd.scountry).map(rv=>rv.regions)[0],
        regdistrs: state.selectedforadd.sregions.length?state.countries.filter(vl=>vl.name===state.selectedforadd.scountry).map(rv=>{let arr=[]; for(let regid of state.selectedforadd.sregions){arr.push(rv.regions.filter(r=>String(r.id)===regid)[0]); } return arr;})[0].map(v=>v.regiondistricts):[],
        locations: state.selectedforadd.sregiondistricts.length?state.countries.filter(vl=>vl.name===state.selectedforadd.scountry).map(rv=>{let arr=[]; for(let regid of state.selectedforadd.sregions){arr.push(rv.regions.filter(r=>String(r.id)===regid)[0]); } return arr;})[0].map(r=>{let arr=[]; for(let rdid of state.selectedforadd.sregiondistricts){arr.push(r.regiondistricts.filter(rd=>String(rd.id)===rdid)[0]);} return arr;}).map(v=>[].concat(...v.map(rdv=>rdv?rdv.locations:[]))):[],
        towndist: state.selectedforadd.slocations.length?state.countries.filter(vl=>vl.name===state.selectedforadd.scountry).map(rv=>{let arr=[]; for(let regid of state.selectedforadd.sregions){arr.push(rv.regions.filter(r=>String(r.id)===regid)[0]); } return arr;})[0].map(r=>{let arr=[]; for(let rdid of state.selectedforadd.sregiondistricts){arr.push(r.regiondistricts.filter(rd=>String(rd.id)===rdid)[0]);} return arr;}).map(v=>[].concat(...v.map(rdv=>rdv?rdv.locations:[]))).map(l=>{let arr=[]; for(let lid of state.selectedforadd.slocations){arr.push(l.filter(lv=>String(lv.id)===lid)[0]);} return arr;}).map((v, i)=>{console.log('vval: '+v[i]+' length: '+v.length+' visArray:'+Array.isArray(v)+'typeof v:'+typeof v); let rs=(Array.isArray(v) && v.length>0)?v.filter(vl=>((vl!==undefined) && vl.hasOwnProperty('towndistricts'))).map(tdv=>{console.log('td: '+JSON.stringify(tdv.towndistricts)); return tdv.towndistricts;}):[]; return [].concat(...rs);}):[]
    }),
    dispatch=>
    ({
        onSelectval(data){
            dispatch(getSelval(data));
        }
    })
)(AddingF);


//SelForm
import PropTypes from 'prop-types';
import {CountrySel, RegionSel, ShowKgardens} from '../containers.js';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const SelForm=({countries=[], regions=[], rdiloc=[], onKgardens=f=>f, onSeltofined=f=>f})=>{
    
    let _countries, _regions, _locations;
    
    const submit=e=>{
        e.preventDefault();
        let arrloc=Array.from(_locations.options)
        .filter(option => option.selected)
        .map(option => option.value);
        //alert(JSON.stringify({countries: _countries.value, regions: _regions.value, locations: arrloc}));
        onKgardens({submit: true});
    };
    
    let _countriesl;
    const changec=(event)=>{
        _countriesl=event.target;
        if(!/Select\s\w+/.test(_countriesl.value)){
            let arrc=Array.from(_countriesl.options)
            .filter(option => option.selected)
            .map(option =>option.value);

            onSeltofined({countries: arrc});
        }
        else{
            onSeltofined({countries: []});
        }
        
        
    };
    
    let _regionsl;
    const changereg=(event)=>{
        _regionsl=event.target;
        if(!/Select\s\w+/.test(_regionsl.value)){
           let arregions=Array.from(_regionsl.options)
            .filter(option => option.selected)
            .map(option => option.value);
            onSeltofined({regions: arregions});
        }
        else{
            
            onSeltofined({regions: []});
        }
        
    };
    
    let _locl;
    const changeloc=(event)=>{
        //event.stopImmediatePropagation();
        //alert('hello');
        _locl=event.target;
        if(!/Select\s\w+/.test(_locl.value)){
           let arrloc=Array.from(_locl.options)
            .filter(option => option.selected)
            .map(option => option.value);
        //alert(JSON.stringify({locations: arrloc}));
            onSeltofined({locations: arrloc});
        }
        else{
            
            onSeltofined({locations: []});
        }
    };
    
    const seloptgroup=(event)=>{
        //(function($){event.stopImmediatePropagation();})(jQuery);
        //$(event).stopImmediatePropagation();
        let optgroup=event.target;
        
        let childslist=optgroup.children;
        //alert('optgroup');
        let arr=[];
        for (var i=0; i<childslist.length; i++) {
            //alert('childslist');
            if(childslist[i].getAttribute('selected')){
                childslist[i].removeAttribute('selected');
                //alert('true:'+childslist[i].getAttribute('selected'));
            }
            else{
                childslist[i].setAttribute('selected', 'true');
                arr.push(childslist[i].value);
                //alert('false:'+childslist[i].getAttribute('value'));
                
            }
            
        }
        if(arr.length>0){
            _locl=optgroup.parentNode;
            let arrloc=Array.from(_locl.options)
            .filter(option => option.selected && (!/Select\s\w+/.test(option.value)))
            .map(option =>option.value);
            //alert(JSON.stringify({locations: arrloc}));
            onSeltofined({locations: arrloc});
        
        }
    };
    
    const seloption=(event)=>{
        if (event.stopImmediatePropagation)
        event.stopImmediatePropagation();
        let option=event.target;
        
        alert(option.getAttribute('selected'));
        if(option.getAttribute('selected')){
            option.setAttribute('selected', 'false');
            alert('Remove'+option.getAttribute('selected'));
                //alert('true:'+childslist[i].getAttribute('selected'));
        }
        else{
            option.setAttribute('selected', 'true');
            alert('True'+option.getAttribute('selected'));
            //arr.push(childslist[i].value);
                //alert('false:'+childslist[i].getAttribute('value'));
        }
        
    };
    
    const removeSelection=(event)=>{
        alert("hello");
        $(event.target).siblings("option:selected").prop( "selected", null );
        
    };
    return(
        <div>
        <form onSubmit={submit}>
            <div className="form-row">
                <div className="col">
                    <select ref={input=>_countries=input} onChange={changec} multiple className="form-control" >
                        <option>Select country</option>
                        {countries.map((val, i)=>
                            <option key={i} value={val.cid} >{val.name}</option>
                        )}
                    </select>
                </div>
                <div className="col">
                    <select ref={input=>_regions=input} className="form-control" multiple onChange={changereg} >
                        <option >Select regions</option>
                        {   regions.map((val, i)=>
                            <option key={i} value={val.rid} >{val.name}</option>
                        )}
                    </select>
                </div>
                
                <div className="col">
                    <select ref={input=>_locations=input} className="form-control"  onChange={changeloc}  multiple>
                        <option >Select locations</option>
                        {   rdiloc.map((v, i)=>
                                <optgroup key={i} data-id={JSON.stringify({regd: v.regdist.rdid})} label={v.regdist.name}  >
                                
                                    {
                                        v.locations.map((vl,y)=>
                                            <option key={y} value={vl.lid} >{vl.name}</option>
                                        )
                                    }
                                
                                </optgroup>
                                
                            )
                        }
                    </select>
                </div>
                
                <div className="col">
                    <button className="btn btn-secondary">Show kids gardens</button>
                </div>
            </div>
        </form>
        {(rdiloc.length>0)?
            <ShowKgardens />:<div></div>
        }   
        
        </div>
    );
};

SelForm.propTypes={
    getKgardens: PropTypes.func,
    countries: PropTypes.array,
    regions: PropTypes.array,
    rdiloc: PropTypes.array,
    onSeltofined: PropTypes.func
};

export default SelForm;
