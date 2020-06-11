import PropTypes from 'prop-types';

const Attantion=({attantion})=>{
    return (
        <div className="row justify-content-center">
          <div className="flex-row p-2  col-5 ">
            <h5 className="" style={{color: "red"}}>{attantion}</h5>
          </div>
        </div>
    );
};



export default Attantion;