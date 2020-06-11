const Button=props=>{
    
    return (
        <a className="text-reset" href={props.link}><button className="btn btn-light textnavy" >{props.text}</button></a>
    );
};

export default Button;