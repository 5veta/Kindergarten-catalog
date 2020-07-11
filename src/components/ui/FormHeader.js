
import PropTypes from 'prop-types';

const FormHeader=({header})=>{

    return( <h5 className="textnavy">{header}</h5>);
};

FormHeader.propTypes={
    header: PropTypes.string.isRequired,
};

export default FormHeader;