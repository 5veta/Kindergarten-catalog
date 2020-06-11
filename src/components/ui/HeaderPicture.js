
const HeaderPicture=props=>{
    let {lang}=props;
    return (
        <div className="d-flex justify-content-center align-items-center  font-weight-bold text-secondary text-uppercase header_image" >
            <div><h3 className="headertext" >{lang.maineheader}</h3></div>
        </div>
    );
};

export default HeaderPicture;