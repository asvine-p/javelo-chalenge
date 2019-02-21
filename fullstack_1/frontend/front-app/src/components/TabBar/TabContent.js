import React from 'react';
import PropTypes from 'prop-types';

const TabContent = props => {
    return (
        <div className={"TabContent"}>
            {props.children}
        </div>
    );
};

TabContent.propTypes = {
    children: PropTypes.node.isRequired,

};

export default TabContent;
