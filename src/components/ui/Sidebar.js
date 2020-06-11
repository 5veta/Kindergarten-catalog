import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const Sidebar=({items})=>{
    
    return (
        <nav className="nav nav-pills flex-row flex-sm-row flex-md-column">
            {items.map((item, i)=>
                <NavLink key={i} className="nav-link flex-fill " exact to={item.link}><nobr>{item.name}</nobr></NavLink>
            )}
        </nav>
    );
};

Sidebar.propTypes={
    items: PropTypes.array
};

export default Sidebar;