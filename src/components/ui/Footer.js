import PropTypes from 'prop-types';
import Button from './Button';
import {LogoutF} from '../containers';
import {Link} from 'react-router-dom';

const Footer=({lang, isLogin})=>{
    
    return (
        <div class="d-flex justify-content-md-center bgstyle">
            <div className="bgstyle w-75 py-2 d-flex flex-row justify-content-start align-middle justify-content-md-between ">
                
                <div>
                {   
                    (isLogin)?
                        <LogoutF/>:
                        <a href={lang.login.link}><button className="btn btn-light textnavy">{lang.login.text}</button></a>
                }
                </div>    
                
                
                <div className="m-1" >kindergartens.pro@gmail.com</div>
                <div className="m-1 d-flex justify-content-start justify-content-md-end " >Copyright: 5vet@</div>
            </div>
        </div> 
    );
};

Footer.propTypes={
    isLogin: PropTypes.bool,
    lang: PropTypes.object
};

export default Footer;