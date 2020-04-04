import {Link} from 'react-router-dom';
import axios from 'axios';

const NewKgs=({newkglist, onModerateNewKg=f=>f, lang})=>{
    
    return (
        
            <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center"><div>{lang.headerskglist.num}</div><div>{lang.headerskglist.name}</div><div>{lang.headerskglist.user}</div><div>{lang.headerskglist.action}</div></li>
            {
                newkglist.map((kg, i)=>
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={kg.kgid}>
                        <div>{i+1}</div>
                        <div><Link to={`/admin/added/${kg.kgid}`} >{kg.name}</Link></div>
                        <div>{kg.uid}</div>
                        <div><button className="btn btn-info" onClick={()=>onModerateNewKg({kgid: kg.kgid})}>Checked</button></div>
                    </li>
                )
            }
            </ul>
        
    );    
};

export default NewKgs;