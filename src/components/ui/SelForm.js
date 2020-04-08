import PropTypes from 'prop-types';
import {CountrySel, RegionSel} from '../containers.js';
import Kgardens from './Kgardens';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router';
import imgbg from '../../images/bg6.jpg';

const KgSelForm=({countries=[], regions=[], rdiloc=[], changec=f=>f, changereg=f=>f, changeloc=f=>f, match, lang})=>{
    console.log('MATCH: '+ match.cids+' '+ match.regids );
    return(
       
        <form>
            <div className="flex-fill form-row mb-2">
                <div className="col">
                    <select  onChange={changec}  className="custom-select" style={{borderColor: "#3b5f82"}}>
                        <option>{lang.country}</option>
                        {countries.map((val, i)=>
                            <option selected={String(val.cid)===match.cids?true:false} key={val.cid} value={val.cid} >{val.name}</option>
                        )}
                    </select>
                </div>
                <div className="col">
                    <select  className="custom-select"  onChange={changereg} style={{borderColor: "#3b5f82"}}>
                        <option >{lang.region}</option>
                        {   regions.map((val, i)=>
                            <option selected={(String(val.rid)===match.regids)?true:false} key={val.rid} value={val.rid} >{val.name}</option>
                        )}
                    </select>
                </div>
                
                <div className="col">
                    <select  className="custom-select"  onChange={changeloc} style={{borderColor: "#3b5f82"}} >
                        <option >{lang.location}</option>
                        { rdiloc.map((v, i)=>
                                <optgroup key={i} data-id={JSON.stringify({regd: v.regdist.rdid})} label={v.regdist.name}  >
                                
                                    {
                                        v.locations.map((vl,y)=>
                                            <option selected={(String(vl.lid)===match.locids)?true:false} key={vl.lid} value={vl.lid} >{vl.name}</option>
                                        )
                                    }
                                
                                </optgroup>
                                
                            )
                        }
                    </select>
                </div>
                
            </div>
        </form>
        
    );
};

KgSelForm.propTypes={
    
    countries: PropTypes.array,
    regions: PropTypes.array,
    rdiloc: PropTypes.array,
    changec: PropTypes.func,
    changereg: PropTypes.func,
    changeloc: PropTypes.func
};


const SelForm=({countries=[], regions=[], rdiloc=[],  onSeltofined=f=>f, history, match, kgardens=[], lang})=>{
   
    const changec=(event)=>{
        let countriesl=event.target;
        if(!/Select\s\w+/.test(countriesl.value)){
            let arrc=Array.from(countriesl.options)
            .filter(option => option.selected)
            .map(option =>option.value);
            history.push(`/sel/${arrc.join("-")}`);
            //onSeltofined({countries: arrc});
        }
        else{
            //onSeltofined({countries: []});
        }
    };
    
    let couns=countries.map(v=>v.cid).join("-");
    let regs=regions.map(v=>v.rid).join("-");
    
    const changereg=(event)=>{
        let regionsl=event.target;
        if(!/Select\s\w+/.test(regionsl.value)){
           let arregions=Array.from(regionsl.options)
            .filter(option => option.selected)
            .map(option => option.value);
            
            history.push(`/sel/${match.params.cids}/${arregions.join("-")}`);
            //onSeltofined({regions: arregions});
        }
        else{
            
            //onSeltofined({regions: []});
        }
        
    };
    
    
    const changeloc=(event)=>{
        
        let locl=event.target;
        if(!/Select\s\w+/.test(locl.value)){
           let arrloc=Array.from(locl.options)
            .filter(option => option.selected)
            .map(option => option.value);
            history.push(`/sel/${match.params.cids}/${match.params.regids}/${arrloc.join("-")}`);
            //onSeltofined({locations: arrloc});
        }
        else{
            
            //onSeltofined({locations: []});
        }
    };
    
    return(
        <div className="row justify-content-center" >
        <div className="col-12 mb-3 align-middle text-center pt-5 font-weight-bold text-secondary text-uppercase" style={{backgroundImage: `url(/bg6.jpg)`, height: "200px"}}>
        <h3 className="mt-2" style={{color: "#3b5f82", fontFamily: "Serif"}}>{lang.maineheader}</h3>
        </div>
        <div className="flex-row p-2  col-10">
            <KgSelForm countries={countries} regions={regions} rdiloc={rdiloc} changec={changec} changereg={changereg} changeloc={changeloc} match={match.params} lang={lang.form} />
        {(rdiloc.length>0)?
            <Kgardens kgardens={kgardens} lang={lang.kgs} />:<div></div>
        }   
        
        </div>
        </div>
    );
};

SelForm.propTypes={
    countries: PropTypes.array,
    regions: PropTypes.array,
    rdiloc: PropTypes.array,
    onSeltofined: PropTypes.func,
    lang: PropTypes.object
};

export default withRouter(SelForm);
