import PropTypes from 'prop-types';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Regions=({regions=[], onRegions=f=>f})=>{
    
    let _regions;
    const change=(event)=>{
        _regions=event.target;
        
        let arregions=Array.from(_regions.options)
        .filter(option => option.selected)
        .map(option => option.value);
        onRegions(arregions);
        
       
    };
    return(
        <select class="custom-select" multiple onChange={change} >
            <option >Select regions</option>
            {   regions.map(val=>val.map((v,i)=>
                <option key={i} value={v.id} >{v.name}</option>)
            )}
        </select>
    );
};

Regions.propTypes={
    regions: PropTypes.array,
    
};

export default Regions;
