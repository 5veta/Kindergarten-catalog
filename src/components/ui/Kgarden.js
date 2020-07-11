import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const KgContacts=({site, phonenumber, address, lang})=>{
   
    return(
        <div className="card border-0 bg-light">
            <div className="card-body ">            
                <a href={site} className="card-link text-blac"><small>{site}</small></a>
                {phonenumber.map((v, i)=>
                   <div className="card-text" key={i}><small style={{color: "#3b5f82"}}>{v}</small></div>
                )}
                <p className="card-text" style={{color: "#3b5f82"}}><small >{address.country}, {address.location}, {address.strname}, {address.house}</small>{(address.appt)?<small>, {lang.appt}{address.appt},</small>:<small></small>}{(address.floor)?<small>{lang.floor}{address.floor}</small>:<small></small>}</p>
            </div>
        </div>
    );
};

KgContacts.propTypes={
    site: PropTypes.string,
    phonenumber: PropTypes.array.isRequired,
    address: PropTypes.object.isRequired,
    lang: PropTypes.object
};

const KgTimeAge=({time, age, lang})=>{
   
    return(
        <div className="card border-0 bg-light">
            <div className="card-body">
                <div className="card-text"><small style={{color: "#3b5f82"}}>{lang.time} {time.from} - {time.to}</small></div>
                <div className="card-text"><small style={{color: "#3b5f82"}}>{lang.age}{age.from} - {age.to} {lang.yearsold}</small></div>
            </div>
        </div>
    );
};
KgTimeAge.propTypes={
    time: PropTypes.object,
    age: PropTypes.object,
    lang: PropTypes.object
};

const KgPrice=({halfday, day, month, year, annual, lang})=>{
    
    return(
        <div>
            <h5 className="card-title" style={{color: "#3b5f82"}}>{lang.header}</h5>
            
            {(halfday)?<p className="card-text">{halfday} {lang.perhday}</p>:<p></p>}
            {(day)?<p className="card-text">{day} {lang.perday}</p>:<p></p>}
            {(month)?<p className="card-text">{month} {lang.permonth}</p>:<p></p>}
            {(year)?<p className="card-text">{year} {lang.peryear}</p>:<p></p>}
            {(annual)?<p className="card-text">{annual} {lang.annual}</p>:<p></p>}
        </div>
    );
};

KgPrice.propTypes={
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
    annual: PropTypes.string,
    lang: PropTypes.object
};

const KgLessons=({lessons, lang})=>{
    
    return(
        <div>
            {Array.isArray(lessons)?
                <div>
                    <h5 className="card-title" style={{color: "#3b5f82"}}>{lang.header}</h5>
                    {lessons.map((v, i)=>
                        <p className="card-text" key={i}><b>-{v.lname}: </b><span>{v.ldesc}</span></p>
                    )}
                </div>:
                <div></div>
            }
        </div>
    );
};

KgLessons.propTypes={
    lessons: PropTypes.array,
    lang: PropTypes.object
};

const KgDescription=({name, description})=>{
    
    return(
        <div>
            <h5 className="card-title" style={{color: "#3b5f82"}}>{name}</h5>
            <p className="card-text">{description}</p>
        </div>
    );
};

KgDescription.propTypes={
    name: PropTypes.string,
    description: PropTypes.string
};


const Kgarden=({kgarden, lang})=>{
    
    return(
    <div className="d-flex " >
        <div className=" flex-fill card mb-3" style={{borderColor: "#3b5f82"}}>
            <div className="card-header  bg-light border-light">
                <div className="card-group m-0">
                    <KgContacts site={kgarden.site} phonenumber={kgarden.phonen} address={kgarden.address} lang={lang.address} />
                    <KgTimeAge time={kgarden.time} age={kgarden.age} lang={lang.timeage}/>
                </div>
            </div>
            <div className="card-body">
                <KgDescription name={kgarden.name} description={kgarden.descr} />
                <hr className="my-4"/>
                <KgPrice {...kgarden.price} lang={lang.price}/>
                <hr className="my-4"/>
                <KgLessons lessons={kgarden.lessons} lang={lang.lessons} />
            </div>
        </div>
    </div>
    );
};

Kgarden.propTypes={
    kgarden: PropTypes.object,
    
};

export default withRouter(Kgarden);