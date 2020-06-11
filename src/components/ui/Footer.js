import PropTypes from 'prop-types';
import Button from './Button';
import {LogoutF} from '../containers';
import {Link} from 'react-router-dom';

const Footer=({lang, isLogin})=>{
    
    return (
    <div className="row justify-content-md-center bgstyle h-100">
        <div className="d-flex flex-column flex-md-row align-items-md-center bgstyle p-3 pl-md-3 w-75 ml-2 ml-md-0">
            <div className="flex-fill " >
                <div>
                {
                    (isLogin)?
                        <LogoutF/>:
                        <Button text={lang.login.text} link={lang.login.link} />
                }
                </div>
                
            </div>
            <div className="flex-fill" >kindergartens.pro@gmail.com</div>
            <div className="d-flex justify-content-start justify-content-md-end " >Copyright: 5vet@</div>
        </div>
    </div>
    );
};

Footer.propTypes={
    isLogin: PropTypes.bool,
    lang: PropTypes.object
};

export default Footer;