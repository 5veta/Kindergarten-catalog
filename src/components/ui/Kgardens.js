import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

const Kgardens=({kgardens=[], lang})=>{
    
    return(
        <div class="table-responsive table-responsive-sm">
            {(kgardens.length>0)?
            <table className="table table-hover"> 
                <tbody>
        
                    {
                        kgardens.map((v, i)=>{
                            
                            return (<tr key={v.kgid} >
                                <th scope="col">{i+1}</th>
                                
                                <td >
                                    <Link to={`/kgardens/${v.kgid}`}>
                                        <div className="mb-3 mt-3">
                                            {(v.img)?
                                                <img className="kgimgsize" src={`/uploads/${v.img}`} />:
                                                <div>{v.name}</div>
                                            }
                                        </div>
                                    </Link>
                                </td>
                                <td className="col-4 align-middle" >
                                    <Link to={`/kgardens/${v.kgid}`}><div>{v.name}</div></Link>
                                    <div className="tddesc" >{v.descr}</div>
                                </td>
                                <td>
                                    <p><nobr>{v.time.from+' - '+v.time.to}</nobr></p>
                                    <p><nobr>{v.age.from+' - '+v.age.to} {lang.age}</nobr></p>
                                </td>
                                <td>
                                    {Object.keys(v.price).map(k=>v.price[k]!==""&&k!=="currency"?<p><nobr>{v.price[k]} {v.price.currency[0]}/{lang.price[k]}</nobr></p>:null)}
                                </td>
                                <td>
                                    <p><nobr>{v.address.locname}, </nobr></p>
                                    <p>{v.address.strname+', '+v.address.house}</p>
                                    {
                                        (v.address.appt===""||v.address.appt==="0")?null:<span>, {v.address.appt}</span>
                                    }
                            
                                </td>
                             </tr>);}
                        )
                    }
                   
    
                </tbody>
            </table>:
            <div></div>}
        </div>
    );
};

Kgardens.propTypes={
    kgardens: PropTypes.array,
    lang: PropTypes.object
    
};

export default withRouter(Kgardens);
