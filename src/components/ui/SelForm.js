import PropTypes from 'prop-types';
import {CountrySel, RegionSel} from '../containers.js';
import Kgardens from './Kgardens';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router';
import HeaderPicture from './HeaderPicture';
import classNames from "classnames";
import '../../../App.css';

const KgSelForm=({countries=[], regions=[], rdiloc=[], changec=f=>f, changereg=f=>f, changeloc=f=>f, match, lang, classHandler=f=>f})=>{
    
    return(
       
        <form>
            <div className="flex-fill form-row mb-2">
                <div className="col">
                    <select  onChange={changec}  className={classHandler(match.cids)} >
                        <option>{lang.country}</option>
                        {countries.map((val, i)=>
                            <option  selected={String(val.cid)===match.cids?true:false} key={val.cid} value={val.cid} >{val.name}</option>
                        )}
                    </select>
                </div>
                <div className="col">
                    <select onChange={changereg}  className={classHandler(match.regids)} >
                        <option >{lang.region}</option>
                        {   regions.map((val, i)=>
                            <option selected={(String(val.rid)===match.regids)?true:false} key={val.rid} value={val.rid} >{val.name}</option>
                        )}
                    </select>
                </div>
                
                <div className="col">
                    <select  onChange={changeloc} className={classHandler(match.locids)} >
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
   
    const classHandler=(matchv)=>{
        let cn=classNames({
        "custom-select text-success selform": matchv !== undefined,
        "custom-select selform": matchv === undefined
      });
        console.log('cn: ', cn);
        return cn;
    };
        
    const changec=(event)=>{
        let countriesl=event.target;
        let reg=new RegExp(`${lang.form.country}\\s*\\w*`);
        if(!reg.test(countriesl.value)){
            let arrc=Array.from(countriesl.options)
            .filter(option => option.selected)
            .map(option =>option.value);
            history.push(`/sel/${arrc.join("-")}`);
            //onSeltofined({countries: arrc});
        }
        else{
            history.push(`/`);
            //onSeltofined({countries: []});
        }
    };
    
    let couns=countries.map(v=>v.cid).join("-");
    let regs=regions.map(v=>v.rid).join("-");
    
    const changereg=(event)=>{
        let regionsl=event.target;
        let reg=new RegExp(`${lang.form.region}\\s*\\w*`);
        if(!reg.test(regionsl.value)){
           let arregions=Array.from(regionsl.options)
            .filter(option => option.selected)
            .map(option => option.value);
            
            history.push(`/sel/${match.params.cids}/${arregions.join("-")}`);
            //onSeltofined({regions: arregions});
        }
        else{
            history.push(`/sel/${match.params.cids}`);
            //onSeltofined({regions: []});
        }
        
    };
    
    
    const changeloc=(event)=>{
        
        let locl=event.target;
        let reg=new RegExp(`${lang.form.location}\\s*\\w*`);
        if(!reg.test(locl.value)){
           let arrloc=Array.from(locl.options)
            .filter(option => option.selected)
            .map(option => option.value);
            history.push(`/sel/${match.params.cids}/${match.params.regids}/${arrloc.join("-")}`);
            //onSeltofined({locations: arrloc});
        }
        else{
            history.push(`/sel/${match.params.cids}/${match.params.regids}`);
            //onSeltofined({locations: []});
        }
    };
    
    return(
        <div className="row justify-content-center" >
        <HeaderPicture lang={lang} />
        <div className="flex-row p-2  col-10">
            <KgSelForm countries={countries} regions={regions} rdiloc={rdiloc} changec={changec} changereg={changereg} changeloc={changeloc} match={match.params} lang={lang.form} classHandler={classHandler}/>
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
