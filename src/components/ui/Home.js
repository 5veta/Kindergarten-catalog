import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Articles} from "./Articles";
import {FormtoSel, KGList} from "../containers";
import FormHeader from './FormHeader';

const Home=({match, history, lang})=>{
    
    return(
        <div className="min-vh-100 d-flex bg-light pt-md-5 m-0 align-items-start" >
            <div className="flex-fill d-flex flex-column justify-content-md-center ">
                <div className="d-flex justify-content-md-center my-0 my-sm-0 my-md-4 mt-md-2 ml-2 ml-md-0">
                    <div className="w-75" >
                        <FormtoSel match={match.params} lang={lang.form} history={history} />
                    </div>
                </div>
                <div className="d-block d-sm-block d-md-none d-flex justify-content-md-center mb-0 mb-sm-0 my-md-4 ml-2 ml-md-0">
                    <div className="w-75 text-center p-md-2" >
                        <FormHeader text={lang.text} />
                    </div>
                </div>
                <div className="d-flex justify-content-md-center ml-2 ml-md-0">
                    <div className="w-75">
                        <KGList match={match.params} lang={lang.kgs} />
                    </div>
                </div>
                <div className="d-flex justify-content-md-center my-0 my-sm-0 my-md-5 py-md-3 ml-2 ml-md-0">
                    <div className="w-75" >
                        <Articles />
                    </div>
                </div>
            </div>
        </div>
    );
};

Home.propTypes={
    match: PropTypes.object,
    history: PropTypes.object,
    lang: PropTypes.object
    
};

export default withRouter(Home);