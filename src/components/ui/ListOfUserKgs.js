import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const ListOfUserKgs=({kgslist=[], lang})=>{
    
    return (
        
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center"><div>{lang.headerskglist.num}</div><div>{lang.headerskglist.name}</div><div>{lang.headerskglist.status}</div></li>
            {
                kgslist.map((kg, i)=>
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={kg.kgid}>
                        <div >{i+1}</div>
                        <div ><Link to={`/accaunt/yourkg/${kg.kgid}`} >{kg.name}</Link></div>
                        <div >{kg.checked?"Checked":"Not checked"}</div>
                    </li>
                )
            }
        </ul>
        
    );    
};

ListOfUserKgs.propTypes={
    kgslist: PropTypes.array,
    lang: PropTypes.object
    
};

export default ListOfUserKgs;