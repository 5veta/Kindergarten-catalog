import PropTypes from 'prop-types';
import {LogoutF, LangMenu} from '../containers';

const Menu=({isLogin, login, lang})=>{
    
  return (
    <div className="d-flex justify-content-md-center">
      <div className="w-75 d-flex flex-row justify-content-between">
        
        <nav className="navbar navbar-expand-md col-7 mt-2">
          <button className="navbar-toggler d-block d-sm-block d-md-none ml-5" data-toggle="collapse" data-target="#mainmenu" >
            &#9776;
          </button>
          <div id="mainmenu" className="collapse navbar-collapse">
            <ul className="nav flex-column my-4 textnavy">
              <li className="nav-item">
                <a className="d-none d-sm-none d-md-block text-reset text-decoration-none" href="/">
                  <h1 className="m-0 p-0 d-none d-sm-none d-md-block textnavy">{lang.maineheader}</h1>
                  <br />
                  <span>{lang.text}</span>
                </a>
              </li>
              <li className="nav-item ">
                <ul className="navbar-nav navbar-center text-nowrap text-black  my-4 textnavy">
                  <li className="d-block d-sm-block d-md-none nav-item ">
                    <a href="/"><u>{lang.home}</u></a>
                  </li>
                  <li className="nav-item ">
                  {
                    (login==='admin')?
                      <a className="nav-link text-reset" href="/admin">{lang.enter}</a>:
                      isLogin?
                        <a className="text-reset nav-link" href="/accaunt">{lang.enter}</a>:
                        <a className="text-reset" href={lang.login.link}><button className="btn btn-light textnavy" >{lang.login.text}</button></a>
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
        <nav className="navbar navbar-expand-md">
          <a className="navbar-brand text-reset " href="/">
            <img className="d-none d-sm-none d-md-block childrenimg mr-5" src="/children.png" />
            <img className="d-block d-sm-block d-md-none childrenimg-small mr-5" src="/children.png" />
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