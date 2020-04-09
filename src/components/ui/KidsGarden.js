import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Kgarden from './Kgarden';

const KidsGarden=({kgarden, lang})=>{
    return(
        <div className="row justify-content-center">
            <div className="flex-row p-2 col-6">
                <Kgarden kgarden={kgarden} lang={lang} />
            </div>
        </div>
    );    
};

KidsGarden.propTypes={
    kgarden: PropTypes.object,
    lang: PropTypes.object
};

export default withRouter(KidsGarden);