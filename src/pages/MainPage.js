import * as React from 'react';
import { connect } from 'react-redux';

import '../styles/common.css';
import '../styles/main-page.css';
import {YouTubeHistory} from "../components/YouTubeHistory";
import YouTubeSearchBar from "../components/YouTubeSearchBar";
import ActionCreators from "../store/actions";

class MainPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.player = null;
        this.selectVideoItem = this.selectVideoItem.bind(this);
        this.selectAndAddToHistory = this.selectAndAddToHistory.bind(this);
    }

    componentDidMount() {
        const { history } = this.props;
        const initialVideoId = history[0].videoId;

        if (!window.onYouTubeIframeAPIReady) {
            window.onYouTubeIframeAPIReady = () => {
                this.player = new window.YT.Player('youtube-player', {
                    height: '390',
                    width: '640',
                    videoId: initialVideoId,
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
        }

        function onPlayerStateChange(event) {
            if (event.data === window.YT.PlayerState.PLAYING && !done) {
                done = true;
            }
        }

        const tag = document.createElement('script');
        const firstScriptTag = document.getElementsByTagName('script')[0];
        let done = false;

        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }

    selectVideoItem(key) {
        try {
            this.player.loadVideoById({ 'videoId': key });
        } catch(e) {
            console.warn("Problem Loading YouTube IFrame Player", e);
        }
    };

    selectAndAddToHistory(item) {
        this.props.addHistoryItem(item);
        this.selectVideoItem(item.videoId);
    }

    render() {
        const {
            history,
            query,
            searchResults,
            nextPage,
            searching,
            removeHistoryItem,
            setSearchResult,
            searchMore,
        } = this.props;

        return (
            <section className={'content-container flex-row'}>
                <div id={'main-page__history-wrap'}>
                    <YouTubeHistory
                        historyItems={history}
                        onItemClick={this.selectAndAddToHistory}
                        onRemoveItemClick={removeHistoryItem}
                    />
                </div>
                <div id={'main-page__player-wrap'}>
                    <YouTubeSearchBar
                        searchItems={searchResults}
                        onSearchItemPress={this.selectAndAddToHistory}
                        query={query}
                        setSearchResult={setSearchResult}
                        searching={searching}
                        nextPage={nextPage}
                        searchMore={searchMore}
                    />
                    <div id={'youtube-player'}></div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        history: state.history,
        query: state.query,
        searchResults: state.searchResult,
        nextPage: state.searchNextPage,
        searching: state.searching,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addHistoryItem: (item) => dispatch(ActionCreators.addHistoryItem({ item: item })),
        removeHistoryItem: (id) => dispatch(ActionCreators.removeHistoryItem({ id: id })),
        setSearchResult: (items, nextPage, query) => dispatch(ActionCreators.setSearchResult({
            query,
            searchResult: items,
            nextPage
        })),
        searchMore: () => dispatch(ActionCreators.searchMore()),
    };
};

const ConnectedMainPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainPage);

export default ConnectedMainPage;
