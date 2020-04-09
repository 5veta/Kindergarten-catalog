import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
//import img from '../../images/10.png';
//import Newman from '../../images/10.png';

const Kgardens=({kgardens=[], history, lang})=>{
    //console.log(require('../../images/10.png'));
    //const img = new Image();
    //img.src = Newman;
    let ex=['png', 'svg', 'jpg'];
    return(
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                    {
                        lang.headers.map((v, i)=>
                            <th scope="col" key={i}><nobr>{v}</nobr></th>                 
                        )
                    }
                    </tr>
                </thead>
                <tbody>
        
                    {
                        kgardens.map((v, i)=>{
                            let y=require(`../../images/${v.kgid}.${ex[0]||ex[1]||ex[2]}`); 
                            return (<tr key={v.kgid} >
                                <th scope="col">{i+1}</th>
                                
                                <td>
                                    <Link to={`/kgardens/${v.kgid}`}>
                                        <div>{v.name}</div>
                                        <div classNames="mb-3 mt-3">
                                            <img  src={`/${v.kgid}.${ex[0]||ex[1]||ex[2]}`} style={{width: "200px", hieght: "100px"}}/>
                                        </div>
                                    </Link>
                                </td>
                                <td scope="col-4 align-middle" ><div style={{height: "150px", overflow: "hidden", textOverflow: "ellipsis"}}>{v.descr}</div></td>
                                <td>{v.site}</td>
                                <td>{v.phonen.map((pn, k)=><p key={'pn'+k}><nobr>{pn}</nobr></p>)}</td>
                                <td><nobr>{v.time.from+'-'+v.time.to}</nobr></td>
                                <td><nobr>{v.age.from+'-'+v.age.to}</nobr></td>
                                <td><nobr>{v.price.month} {v.price.currency[0]}</nobr></td>
                                <td><span><nobr>{v.address.locname}, </nobr></span><br/><span>{v.address.strname+', '+v.address.house}</span>{(v.address.appt)?<span>, {v.address.appt}</span>:<span></span>}{(v.floor!==undefined)?<span>, floor {v.floor}</span>:<span></span>}</td>
                             </tr>);}
                        )
                    }
                   
    
                </tbody>
            </table>
        </div>
    );
};

Kgardens.propTypes={
    kgardens: PropTypes.array,
    lang: PropTypes.object
    
};

export default withRouter(Kgardens);
