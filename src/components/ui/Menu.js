import PropTypes from 'prop-types';
import {LogoutF, LangMenu} from '../containers';

const Menu=({isLogin, login, lang})=>{
    
    return (
        <ul className="nav text-nowrap text-black justify-content-center my-4 " style={{color: "#3b5f82"}}>
        <li className="nav-item">
        <a className="navbar-brand text-reset text-uppercase" href="/">{lang.logo}</a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link text-reset" href="#">{lang.about}</a>
      </li>
      <li className="nav-item ">
      {
        (login==='admin')?
          <a className="nav-link text-reset" href="/admin">{lang.login}</a>:
          isLogin?
            <a className="nav-link text-reset" href="/accaunt">{lang.login}</a>:
            <a className="nav-link text-reset" href="/login"><u>{lang.login}</u></a>
      }
      </li>
      <li className="nav-item">
      {
        (login==='admin')?
          <LogoutF />:
            (!isLogin)?<button className="btn btn-light" style={{color: "#3b5f82"}} ><a className="text-reset" href="/signup">{lang.signup}</a></button>:
            <LogoutF />
      }
      </li>
      <li className="nav-item ml-2">
        <LangMenu />
      </li>
    
  
  </ul>

    );
};

Menu.propTypes={
    isLogin: PropTypes.bool,
    login: PropTypes.string,
    lang: PropTypes.object
};

export default Menu;