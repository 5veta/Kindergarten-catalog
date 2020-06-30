import PropTypes from 'prop-types';
import {LogoutF, LangMenu} from '../containers';
import Button from './Button';

const Menu=({isLogin, login, lang})=>{
    
  return (
  
    <nav class="navbar navbar-expand-md row">
    
      <button class="navbar-toggler d-block d-sm-block d-md-none ml-5" data-toggle="collapse" data-target="#mainmenu" >
        &#9776;
      </button>
      <div id="mainmenu" class="collapse navbar-collapse">
        <div>
      <a className="navbar-brand text-reset text-uppercase" href="/">
        <img class="childrenimg mr-5" src="/children.png" />
        
      </a></div>
        <span class="navbar-text textnavy text-uppercase">Приватний дитячий садок</span>
        <ul className="navbar-nav navbar-center text-nowrap text-black  my-4 textnavy">
      
          <li className="nav-item ">
          {
          (login==='admin')?
             <a className="nav-link text-reset" href="/admin">{lang.enter}</a>:
            isLogin?
              <a className="text-reset nav-link" href="/accaunt">{lang.enter}</a>:
              <Button text={lang.login.text} link={lang.login.link} />
          }
          </li>
          <li className="nav-item">
          {
            (login==='admin')?
              <LogoutF />:
              (isLogin)?<LogoutF />:
                <div></div>
          }
          </li>
          <li className="nav-item mx-sm-0 mx-md-2 my-2 my-sm-2 my-md-0">
            <LangMenu />
          </li>
        </ul>

      </div>
    </nav>

  );
};

Menu.propTypes={
    isLogin: PropTypes.bool,
    login: PropTypes.string,
    lang: PropTypes.object
};

export default Menu;