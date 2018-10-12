import React from 'react';
import '../../styles/main.css';

const VideoDetail = (props) => {
    const video = props.video;
    if(!video){
        return <div></div>;
    }
    var is
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    const commenturl=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=5&videoId=${videoId}&textFormat=plainText&key=AIzaSyBdHthZLS_lrhNDyavV7Rxm5jrS-oNLD3c`

    function viewComments()
    {
        fetch(commenturl).then((res)=>{props.comments=res.json();console.log(comments)});
    }

    return (

        <div className="video-detail col-md-4 offset-md-4">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
            </div>
            <button className="btn btn-primary comment" >Like</button>
            <div>
                <input type="text" className="form-control comment" placeholder="Type comment"/>
                <button className="btn btn-primary comment">Add Comment</button>
                <button className="btn btn-primary comment" onClick={viewComments}>Display Comments</button>
            </div>
        </div>
    );
};

export default VideoDetail;