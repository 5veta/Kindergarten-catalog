import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const Sidebar=({items})=>{
    
    return (
        <ul className="tabs nav nav-pills flex-column">
            {items.map((item, i)=>
                <li className="nav-item"><NavLink key={i} className="nav-link" to={item.link}>{item.name}</NavLink></li>
            )}
        </ul>
    );
};

Sidebar.propTypes={
    items: PropTypes.object
};

export default Sidebar;