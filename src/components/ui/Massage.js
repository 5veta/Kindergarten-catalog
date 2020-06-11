import PropTypes from 'prop-types';

const Massage=({massage})=>{
    return (
        <div className="row justify-content-center">
          <div className="flex-row p-2  col-5 ">
            <h5 className="" style={{color: "green"}}>{massage}</h5>
          </div>
        </div>
    );
};

Massage.propTypes={
    massage: PropTypes.string
};

export default Massage;