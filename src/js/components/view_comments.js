import React from 'react';
import '../../styles/main.css';

const ViewComments = (props) => {
    const video = props.video;
    if(!video){
        return <div></div>;
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    const commenturl=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=5&videoId=${videoId}&textFormat=plainText&key=AIzaSyBdHthZLS_lrhNDyavV7Rxm5jrS-oNLD3c`

    return (
        <div>
            
        </div>
    );
};

export default VideoDetail;