//import React from 'react';
//import Mouse from './Mouse';
//import Girl from './Girl';
//import imgbg from '../../images/bg6.jpg';

const HeaderPicture=props=>{
    let {lang}=props;
    return (
        <div className="col-12 mb-3 align-middle text-center pt-5 font-weight-bold text-secondary text-uppercase" style={{backgroundImage: `url(/bg6.jpg)`, height: "200px"}}>
        <h3 className="mt-2" style={{color: "#3b5f82", fontFamily: "Serif"}}>{lang.maineheader}</h3>
        </div>
    );
};

export default HeaderPicture;