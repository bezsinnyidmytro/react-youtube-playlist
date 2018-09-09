import * as React from 'react';
import PropsTypes from 'prop-types';

import api from "../utilities/ApiAxios";
import '../styles/youtube-search.css';

const YouTubeSearchItem = (props) => {
    const {
        thumb,
        title,
        videoId,
        onPlayPress,
        resultRef
    } = props;

    return (
        <div className={'yt-search__item'}>
            <div className={'yt-search__item__info'}>
                <img alt={'video-thumbnail'} src={thumb.url}/>
                <div className={'yt-search__item__title'}>{title}</div>
            </div>
            <div
                className={'button'}
                onClick={() => {
                    onPlayPress({videoId, title});
                    resultRef.current.hidden = true;
                }}
            >Play</div>
        </div>
    );
};

YouTubeSearchItem.propTypes = {
    thumb: PropsTypes.object,
    title: PropsTypes.string,
    videoId: PropsTypes.string,
    onPlayPress: PropsTypes.func,
    resultRef: PropsTypes.object
};

export class YouTubeSearchBar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.searchResultRef = React.createRef();
        this.searchTimeout = null;
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidUpdate() {
        this.searchResultRef.current.scrollTop = 0;
    }

    renderSearchItems(items, resultRef) {
        const { onSearchItemPress } = this.props;

        items = items.map((item) => (
            <YouTubeSearchItem
                {...item}
                videoId={item.key}
                onPlayPress={onSearchItemPress}
                resultRef={resultRef}
            />
        ));

        return (
            <React.Fragment>
                {items}
            </React.Fragment>
        );
    }

    proceedSearchResult(res, query) {
        const newItems = [];
        for (let item of res.data.items) {
            if (item.id.videoId) {
                newItems.push({
                    title: item.snippet.title,
                    key: item.id.videoId,
                    thumb: item.snippet.thumbnails.default,
                });
            }
        }

        localStorage.setItem('nextSearchPageToken', res.data.nextPageToken);
        localStorage.setItem('storedSearchResult', JSON.stringify(newItems));

        localStorage.setItem('searchQuery', query);
        this.props.setSearchResult(newItems, res.data.nextPageToken, query);
        this.searchResultRef.current.hidden = false;
    }

    runSearch(query, pageToken = '') {
        return (async () => {

            this.props.searchMore();

            try {
                const res = await api.get('/search', {
                    params: {
                        maxResults: 10,
                        part: 'snippet',
                        q: query,
                        type: 'video',
                        pageToken
                    }
                });

                this.proceedSearchResult(res, query);

            } catch(e) {
                console.warn('YouTube Search API Error', e);
            }
        });
    }

    handleSearchChange(e) {
        const query = e.target.value;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(this.runSearch(query), 1200);
    }

    render() {
        const {
            searchItems,
            searching,
            nextPage,
            query,
        } = this.props;
        const { searchResultRef } = this;

        const showNextButton = searching ?
            null :
            <span
                className={'button show-more'}
                onClick={this.runSearch(query, nextPage)}
            >Show Next</span>;

        return (
            <div className={'yt-search'}>
                <input
                    type={'text'}
                    placeholder={'Search on YouTube...'}
                    onChange={this.handleSearchChange}
                    onFocus={() => {
                        if (searchItems && searchItems.length) {
                            searchResultRef.current.hidden = false;
                        }
                    }}
                />
                <div hidden={true} ref={searchResultRef} className={'yt-search__results'}>
                    <span
                        onClick={() => searchResultRef.current.hidden = true}
                        className={'button search-close'}
                    >Hide</span>
                    { this.renderSearchItems(searchItems, searchResultRef) }
                    { showNextButton }
                </div>
            </div>
        );
    }
}

YouTubeSearchBar.propTypes = {
    searchItems: PropsTypes.array,
    onSearchItemPress: PropsTypes.func,
    query: PropsTypes.string,
    setSearchResult: PropsTypes.func,
    searching: PropsTypes.bool,
    nextPage: PropsTypes.string,
    searchMore: PropsTypes.func,
};

export default YouTubeSearchBar;
