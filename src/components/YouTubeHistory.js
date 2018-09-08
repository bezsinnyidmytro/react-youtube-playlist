import * as React from 'react';
import PropTypes from 'prop-types';

import '../styles/youtube-history.css';

export const YouTubeHistory = (props) => {
    const items = props.historyItems.map((item, idx) => {
        return (
            <div
                key={item.title}
                className={'history-list__item'}
                onClick={() => props.onItemClick(item.title)}
            >{item.title}</div>
        );
    });

    return (
        <React.Fragment>
            <h2>Watch History</h2>
            <div className={'history-list'}>
                {items}
            </div>
        </React.Fragment>
    );
};

YouTubeHistory.propTypes = {
    historyItems: PropTypes.array,
    onItemClick: PropTypes.func,
};
YouTubeHistory.defaultProps = {
    historyItems: [
        { title: 'MDE_9vm4pRI' },
        { title: 'WOs84XQ0xT0' },
        { title: 'ShqrpeAWxFc' },
        { title: '2ipjIRimc2w' },
    ],
    onItemClick: () => {},
};