import * as React from 'react';
import '../styles/common.css';
import '../styles/main-page.css';
import {YouTubeHistory} from "../components/YouTubeHistory";

export class MainPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.player = null;
        this.selectHistoryItem = this.selectHistoryItem.bind(this);
    }

    componentDidMount() {
        if (!window.onYouTubeIframeAPIReady) {
            window.onYouTubeIframeAPIReady = () => {
                this.player = new window.YT.Player('youtube-player', {
                    height: '390',
                    width: '640',
                    videoId: 'MDE_9vm4pRI',
                    events: {
                        'onReady': onPlayerReady,
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

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        const tag = document.createElement('script');
        const firstScriptTag = document.getElementsByTagName('script')[0];
        let done = false;

        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }

    selectHistoryItem(key) {
        console.log(key);
        this.player.loadVideoById({ 'videoId': key });
    };

    render() {
        return (
            <section className={'content-container flex-row'}>
                <div id={'main-page__history-wrap'}>
                    <YouTubeHistory onItemClick={this.selectHistoryItem}/>
                </div>
                <div id={'main-page__player-wrap'}>
                    <div id={'youtube-player'}></div>
                </div>
            </section>
        );
    }
}

export default MainPage;