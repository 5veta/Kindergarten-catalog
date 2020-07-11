import PropTypes from 'prop-types';
import Kgardens from './Kgardens';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {withRouter} from 'react-router';
import classNames from "classnames";
import {Articles} from "./Articles";

const SelectField=({changefun, header, array, matchid, id, className})=>{
    return (
        <select  onChange={changefun}  className={className} >
            <option>{header}</option>
                {array.map(val=>
                    <option  selected={String(val[id])===match[matchid]?true:false} key={val[id]} value={val[id]} >{val.name}</option>
                )}
        </select>
    );
    
};

const KgSelForm=({countries=[], regions=[], rdiloc=[], changec=f=>f, changereg=f=>f, changeloc=f=>f, match, lang, classHandler=f=>f})=>{
    
    return(
       
        <form>
            <div className="form-row my-2 ">
                <div className="col-12 col-sm-12 col-md mb-2">
                    <SelectField changefun={changec} matchid='cids' header={lang.country} array={countries} id='cid' className={classHandler(match.cids)}/>
                </div>
                <div className="col-12 col-sm-12 col-md mb-2">
                    <SelectField changefun={changereg} matchid='regids' header={lang.region} array={regions} id='rid'className={classHandler(match.regids)}/>
                </div>
                
                <div className="col-12 col-sm-12 col-md mb-2">
                    <select  onChange={changeloc} className={classHandler(match.locids)} >
                        <option >{lang.location}</option>
                        { rdiloc.map((v, i)=>
                                <optgroup key={v.regdist.rdid} data-id={JSON.stringify({regd: v.regdist.rdid})} label={v.regdist.name}  >
                                
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
    changeloc: PropTypes.func,
    classHandler: PropTypes.func
};


const SelForm=({countries=[], regions=[], rdiloc=[],  history, match, kgardens=[], lang})=>{
    
    const classHandler=(matchv)=>{
        let cn=classNames({
        "custom-select selform-selected": matchv !== undefined,
        "custom-select selform": matchv === undefined
      });
    
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
            
        }
        else{
            history.push(`/`);
        }
    };
    
    
    const changereg=(event)=>{
        let regionsl=event.target;
        let reg=new RegExp(`${lang.form.region}\\s*\\w*`);
        if(!reg.test(regionsl.value)){
           let arregions=Array.from(regionsl.options)
            .filter(option => option.selected)
            .map(option => option.value);
            
            history.push(`/sel/${match.params.cids}/${arregions.join("-")}`);
           
        }
        else{
            history.push(`/sel/${match.params.cids}`);
           
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
           
        }
        else{
            history.push(`/sel/${match.params.cids}/${match.params.regids}`);
           
        }
    };
    
    return(
        <div className="min-vh-100 d-flex bg-light pt-md-5 m-0 align-items-start" >
        <div className="flex-fill d-flex flex-column justify-content-md-center ">
            <div className="d-flex justify-content-md-center my-0 my-sm-0 my-md-4 mt-md-2 ml-2 ml-md-0">
                <div className="w-75" >
                    <KgSelForm countries={countries} regions={regions} rdiloc={rdiloc} changec={changec} changereg={changereg} changeloc={changeloc} match={match.params} lang={lang.form} classHandler={classHandler}/>
                </div>
            </div>
            <div className="d-block d-sm-block d-md-none d-flex justify-content-md-center mb-0 mb-sm-0 my-md-4 ml-2 ml-md-0">
                <div className="w-75 text-center p-md-2" >
                    <h5 className="textnavy">{lang.text}</h5>
                </div>
            </div>
            <div className="d-flex justify-content-md-center ml-2 ml-md-0">
            {(rdiloc.length>0)?
                <div className="w-75">
                    <Kgardens kgardens={kgardens} lang={lang.kgs} />
                </div>:<div></div>
            }    
            </div>
            <div className="d-flex justify-content-md-center my-0 my-sm-0 my-md-5 py-md-3 ml-2 ml-md-0">
                <div className="w-75" >
                    <Articles />
                </div>
            </div>
        </div>
        </div>
    );
};

SelForm.propTypes={
    countries: PropTypes.array,
    regions: PropTypes.array,
    rdiloc: PropTypes.array,
    onSeltofind: PropTypes.func,
    lang: PropTypes.object
};

export default withRouter(SelForm);
