import * as React from 'react';
import PropTypes from 'prop-types';

import '../styles/youtube-history.css';

export const YouTubeHistory = (props) => {
    console.log(props);
    const items = props.historyItems.map((item, idx) => {
        return (
            <div key={item.title} className={'history-list__item-wrap'}>
                <div
                    className={'history-list__item'}
                    onClick={() => props.onItemClick(item.videoId)}
                >{item.title}</div>
                <div className={'history-list__remove-item'}>
                    <div
                        className={'history-list__remove-button'}
                        onClick={() => props.onRemoveItemClick(item.videoId)}
                    >
                        <span role={'img'} aria-label={'remove'}>&#10060;</span>
                    </div>
                </div>
            </div>
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
    onRemoveItemClick: PropTypes.func,
};
YouTubeHistory.defaultProps = {
    historyItems: [],
    onItemClick: () => {},
    onRemoveItemClick: () => {}
};