import { Form } from "redux-form";

const FormHeader=header=>{

    return <h5 className="textnavy">{header}</h5>;
};

FormHeader.propTypes={
    header: PropTypes.string.isRequired
};

export default FormHeader;