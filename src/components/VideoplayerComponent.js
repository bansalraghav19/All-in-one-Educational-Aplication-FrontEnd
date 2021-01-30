import React,{Component} from 'react';
import Vimeo from '@u-wave/react-vimeo';

import './CSS/Videoplayer.css';
import {updateVideoTime,getVideoTime} from '../shared/http'

import Loader from './Loader';

const videos = 
[
      { 
            id: 115783408, name: 'Jambinai - Connection',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      {     id: 438166716, name: 'Jambinai - They Keep Silence',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 169408731, name: 'Hoody - Like You',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 438166716, name: 'Jambinai - They Keep Silence ',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 115783408, name: 'Jambinai - Connection',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 438166716, name: 'Jambinai - They Keep Silence',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 169408731, name: 'Hoody - Like You',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      },
      { 
            id: 438166716, name: 'Jambinai - They Keep Silence',
            image:"https://i.vimeocdn.com/video/924124243_640.jpg"
      }    
];
    

class Videoplayer extends Component{

      constructor(props){
            super(props);
            this.state = {
                  videoIndex: 0,
                  videoList:[],
                  progress:{},
                  startTime:0,
                  timeFetched:0,
                  // isLoading:true,
            };
            this.selectVideo=this.selectVideo.bind(this);
            this.handlePlayerPause=this.handlePlayerPause.bind(this);
            this.onProgressHandler=this.onProgressHandler.bind(this);
            this.onEnd=this.onEnd.bind(this);
      }

      async selectVideo(index) {
            // await this.setState({isLoading: true});
            await this.setState({ videoIndex: index });
            await this.setState({ timeFetched: 0 });
            var res= await getVideoTime(videos[this.state.videoIndex].id)
            
            if( res.message=='Success !' ) {
                  console.log(res,parseInt(res.data.time),"time!!")
                  await this.setState({startTime:parseInt(res.data.time)})
            }

            else await this.setState({startTime:0})
            await this.setState({timeFetched:1})
            // await this.setState({isLoading: false});
      }

      async handlePlayerPause() {
            var res= await updateVideoTime(videos[this.state.videoIndex].id,this.state.progress.seconds)
            console.log("Paused",res)
      }

      async componentDidMount(){

            var res= await getVideoTime(videos[this.state.videoIndex].id)
            
            if( res.data ) {
                  console.log(res,parseInt(res.data.time),"time!!")
                  await this.setState({startTime:parseInt(res.data.time)})
            }
            else await this.setState({startTime:0})
            await this.setState({timeFetched:1})
            // await this.setState({isLoading: false});
      }


      async onEnd() {
            var res= await updateVideoTime(videos[this.state.videoIndex].id,this.state.progress.duration-1)
            console.log("Ended!!!!")
      }

      onProgressHandler(e) {
            this.setState({progress:e})
            console.log(e)
      }

      render() {

      const { videoIndex } = this.state;
      const video = videos[videoIndex];
      
      if(this.state.timeFetched==0) return <Loader/>

      else{       
            return (
                  
            <div className="vid-component-container">
            <div className="vid-video-container">

                  
                  <div class="vid-video-vimeo-container">
                  
                  <Vimeo
                        video={video.id}
                        width={1000}
                        height={570}
                        autoplay
                        speed={true}
                        start={Math.max(0,this.state.startTime-15)}
                        // volume={volume}
                        // paused={paused}
                        onEnd={this.onEnd}
                        onPause={this.handlePlayerPause}
                        // onPlay={this.handlePlayerPlay}
                        onProgress={this.onProgressHandler}
                  />

                  </div>

                  <p className="vid-video-content"> 
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                  took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                  but also the leap into electronic typesetting, remaining essentially unchanged 
                  </p>
            
            </div>
      
            <div className="vid-other-videos-container">
            
            {
                  videos.map((choice, index) => (
                  <a
                        href={`#!/video/${index}`}
                        className={`${video === choice ? 'active' : ''}`}
                        onClick={() => this.selectVideo(index)}
                  >
                        <div className="vid-other-videos clearfix">
                              <img src={choice.image} />
                              <div class="vid-other-videos-text">{choice.name}</div>
                        </div>
                  </a>
                  ))
            }

            </div>
      
            </div>

            );
      }
      
      }
}

export default Videoplayer;