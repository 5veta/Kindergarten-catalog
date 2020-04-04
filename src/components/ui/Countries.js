import PropTypes from 'prop-types';
//import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Countries=({countries=[], onCountry=f=>f})=>{
    let _country;
    const change=(event)=>{
        //alert(event.target.value);
        _country=event.target.value;
        if(_country!=='Select country'){
            onCountry(_country);
        }
        
    };
    const selectop=(event)=>{
        //alert(event.target.getAttribute('selected'));
        let selop=event.target.getAttribute('selected');
        if(selop) event.target.setAttribute('selected', 'false');
            event.target.setAttribute('selected', 'true');
    };
    return(
        
        <select onChange={change} multiple class="custom-select" >
            <option >Select country</option>
            {countries.map((val, i)=>
                <option key={i} value={val.name} onClick={selectop}>{val.name}</option>
            )}
        </select>
       
    );
};

Countries.propTypes={
    countries: PropTypes.array,
    onCountry: PropTypes.func
};

export default Countries;
