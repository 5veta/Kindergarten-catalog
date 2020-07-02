import PropTypes from 'prop-types';
import {LogoutF, LangMenu} from '../containers';
import Button from './Button';

const Menu=({isLogin, login, lang})=>{
    
  return (
    <div class="d-flex justify-content-md-center">
      <div class="w-75 d-flex flex-row justify-content-between">
        
        <nav class="navbar navbar-expand-md col-7">
          <button class="navbar-toggler d-block d-sm-block d-md-none ml-5" data-toggle="collapse" data-target="#mainmenu" >
            &#9776;
          </button>
          <div id="mainmenu" class="collapse navbar-collapse">
            <ul className="nav flex-column my-4 textnavy">
              <li className="nav-item">
                <a className=" text-reset text-decoration-none" href="/">
                  <h1 class="m-0 p-0 d-none d-sm-none d-md-block textnavy">{lang.maineheader}</h1>
                  <br />
                  <span>{lang.text}</span>
                </a>
              </li>
              <li className="nav-item ">
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
                      (isLogin)?
                        <LogoutF />:<div></div>
                  }
                  </li>
                  <li className="nav-item mx-sm-0 mx-md-2 my-2 my-sm-2 my-md-0">
                    <LangMenu />
                  </li>
                </ul>
              </li>
              
            </ul>
          </div>
        </nav>
        <nav className="navbar navbar-expand-md pb-2">
          <a className="navbar-brand text-reset " href="/">
            <img class="d-none d-sm-none d-md-block childrenimg mr-5" src="/children.png" />
            <img class="d-block d-sm-block d-md-none childrenimg-small mr-5" src="/children.png" />
          </a>
        </nav>
      </div>
    </div>
  );
};

Menu.propTypes={
    isLogin: PropTypes.bool,
    login: PropTypes.string,
    lang: PropTypes.object
};

export default Menu;