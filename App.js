import React from 'react';
import Header from "./Component/header";
import './app.css';
import {DogService} from "./Component/Service";



class App extends React.Component {
    dogService = new DogService();
    state = {
        currentImg:null,
        likedPictures:["https://images.dog.ceo/breeds/setter-irish/n02100877_2599.jpg", "https://images.dog.ceo/breeds/terrier-toy/n02087046_5383.jpg", "https://images.dog.ceo/breeds/brabancon/n02112706_106.jpg"],
        liked : false,
    }

    onPicLoaded = (dogPicture) => {
        this.setState({
            currentImg:"https://images.dog.ceo/breeds/setter-irish/n02100877_6728.jpg",
        })
        this.comparePics();

        console.log(this.state.likedPictures)
        console.log("checked")
    }

    comparePics (){

        let current = this.state.currentImg;
        let likedPics = [...this.state.likedPictures];

        for (let key of likedPics){

            if(current[key] !== current){
                return  this.setState({
                    liked: !this.state.liked,
                })
            } else {
            return this.setState({
                liked: this.state.liked,
            })
            }
        }


    }
    
    componentDidMount(){
        this.dogService.getRandomPics()
            .then(this.onPicLoaded);
    }
    nextPic = () => {
        this.dogService.getRandomPics()
            .then(this.onPicLoaded)
    }

   likedImg = (dogPicture) => {
        let likedPictures = [...this.state.likedPictures,dogPicture];

        this.setState({
            likedPictures: likedPictures
        })
        this.nextPic();

   }


    render() {
        const {likedPictures,liked,currentImg} = this.state;
        const button = !liked  ? (<button
            onClick = {()=>this.likedImg(currentImg)}
            className ="btn">Like</button>): (<button className="btn">Hello+++</button>) ;
        return (
            <div className="app">
                <Header/>
                <div className ='img-block'>
                    <img src={currentImg} alt="dog"/>
                </div>
                <div className = 'btn-group'>
                    <button
                        onClick={this.nextPic}
                        className="btn">Next picture</button>
                    {button}
                </div>
                <section className="container">
                    <div className="dropdown">
                        <select name="one" className="dropdown-select">
                            <label><h3>hello</h3></label>
                            <option value = "akita">Akita</option>
                            <option value = "african">African</option>
                            <option value = "beagle">Beagle</option>
                            <option value = "borzoi">Borzoi</option>
                            <option value = "boxer">Boxer</option>
                            <option value = "chow">Chow</option>
                            <option value = "cockapoo">Cockapoo</option>
                            <option value = "dingo">Dingo</option>
                            <option value = "husky">Husky</option>
                            <option value = "pug">Pug</option>
                            <option value = "whippet">Whippet</option>
                        </select>

                    </div>
                </section>


            </div>

        )
    }
}

export default App;

