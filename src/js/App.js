import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { userInfo } from 'os';

const API_KEY='AIzaSyBdHthZLS_lrhNDyavV7Rxm5jrS-oNLD3c';
firebase.initializeApp({
    apiKey:"AIzaSyCWsPL-2QMCVd4UFh3d93hby6pKGbhyShw",
    authDomain:"fir-auth-d1e41.firebaseapp.com"
})
class App extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            videos:[],
            selectedVideo:null,
            comments:[],
            isSignedIn:false
        }
        this.uiConfig={
            signInFlow:"popup",
            signInOptions:[
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            callbacks:{
                signInSucess:()=>false
            }
        }
    }
    componentDidMount(){
        
        firebase.auth().onAuthStateChanged(user=>{
            this.setState({isSignedIn:!!user})
        })
    }
    videoSearch(term)
    {
        var url = new URL("https://www.googleapis.com/youtube/v3/search"),
            params = {
                part: 'snippet',
                maxResults: '10',
                q:term,
                key: API_KEY,
                type: 'video'
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(result => {
                console.log(result.items);
                this.setState({videos:result.items,selectedVideo:result.items[0]})
                return result.items;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
    }

    render() {


        return (
            <div>
                {this.state.isSignedIn?(
                    <div>
                        <div className="row">  
                            <div className="heading col-md-4 offset-md-4">
                                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                            </div>  
                            <div className="signoutprofile col-md-4">
                                <img 
                                    alt="profile picture" 
                                    src={firebase.auth().currentUser.photoURL} />
                                <button className="btn btn-info signoutbutton" onClick={()=>{
                                                                                                this.setState({videos:[],selectedVideo:null},function(){
                                                                                                    firebase.auth().signOut();            
                                                                                                });                                                                      
                                                                                            }
                                                                                        }>Sign Out</button> 
                            </div>
                        </div>
                        <div>
                            <div className="space"></div>
                            <SearchBar onSearchTermChange={searchTerm => this.videoSearch(searchTerm)}/>
                            <hr/>
                            <VideoDetail video={this.state.selectedVideo} comments={this.state.comments}/>
                            <br/>
                            <VideoList 
                            onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
                            videos={this.state.videos} 
                            />
                        </div> 
                    </div>
                ):(
                    <StyledFirebaseAuth 
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                )}
            </div>     
        );
    }
}
export default App;