import PropTypes from 'prop-types';
import Button from './Button';
import {LogoutF} from '../containers';
import {Link} from 'react-router-dom';

const Footer=({lang, isLogin})=>{
    
    return (
        <div class="d-flex bgstyle justify-content-center">
            <div className="flex-fill bgstyle d-flex flex-row justify-content-start justify-content-md-between ">
            <div className=" " >
                <div>
                {
                    (isLogin)?
                        <LogoutF/>:
                        <Button text={lang.login.text} link={lang.login.link} />
                }
                </div>
                
            </div>
            <div className="" >kindergartens.pro@gmail.com</div>
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