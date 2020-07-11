import PropTypes from 'prop-types';
import classNames from "classnames";

const SelectField=({changefun, header, array, matchid, id, match, className})=>{
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
                    <SelectField changefun={changec} matchid='cids' header={lang.country} array={countries} id='cid' match={match} className={classHandler(match.cids)}/>
                </div>
                <div className="col-12 col-sm-12 col-md mb-2">
                    <SelectField changefun={changereg} matchid='regids' header={lang.region} array={regions} id='rid'match={match} className={classHandler(match.regids)}/>
                </div>
                
                <div className="col-12 col-sm-12 col-md mb-2">
                    <select  onChange={changeloc} className={classHandler(match.locids)} >
                        <option >{lang.location}</option>
                        {rdiloc.map((v, i)=>
                            <optgroup key={v.regdist.rdid} data-id={JSON.stringify({regd: v.regdist.rdid})} label={v.regdist.name} >    
                                {v.locations.map((vl,y)=>
                                    <option selected={(String(vl.lid)===match.locids)?true:false} key={vl.lid} value={vl.lid} >{vl.name}</option>
                                )}
                            </optgroup>
                        )}
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


const SelForm=({countries=[], regions=[], rdiloc=[], lang, history, match})=>{
    console.log(match);
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
            
            history.push(`/sel/${match.cids}/${arregions.join("-")}`);
           
        }
        else{
            history.push(`/sel/${match.cids}`);
           
        }
        
    };
    
    
    const changeloc=(event)=>{
        
        let locl=event.target;
        let reg=new RegExp(`${lang.form.location}\\s*\\w*`);
        if(!reg.test(locl.value)){
           let arrloc=Array.from(locl.options)
            .filter(option => option.selected)
            .map(option => option.value);
            history.push(`/sel/${match.cids}/${match.regids}/${arrloc.join("-")}`);
           
        }
        else{
            history.push(`/sel/${match.cids}/${match.regids}`);
           
        }
    };
    
    return(
        <KgSelForm countries={countries} regions={regions} rdiloc={rdiloc} changec={changec} changereg={changereg} changeloc={changeloc} match={match} lang={lang} classHandler={classHandler}/>
    );
};

SelForm.propTypes={
    countries: PropTypes.array,
    regions: PropTypes.array,
    rdiloc: PropTypes.array,
    onSeltofind: PropTypes.func,
    lang: PropTypes.object
};

export default SelForm;
