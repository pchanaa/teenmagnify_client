import React, { Component } from 'react';

import Trend from "./trend";
import change from "./changeurl";
import './style.css';
import main from "./img/main.png";






class Home extends Component {
  state = {
    users : [],
    isLoading: true,
    openState : false,
    
  }
  changeStr=(data)=>{
    data = data.replace("신규","");
    data = data.replace("SPECIAL","");
    data = data.replace("주최/주관","");
    console.log(data);
    return data;
  }
   splitReward=(str)=>{
     return str.split('금')[1];
   }
  
  getApi= ()=>{
      fetch('http://localhost:3001/api')
        .then(res => {
          //console.log(res.body)
          return res.json();
        }
          )
        .then(res => {
          let data = [];
          if(res.length%2 !== 0){
           for(let index = 0;index<res.length -1;index++)
            data[index] = res[index];
          }
          else{
            for(let index = 0;index<res.length;index++)
            data[index] = res[index];
          }
          //console.log(res.length)
          this.setState(element =>  ({users : data.slice(0,8), isLoading:false}))})

        .catch(err=>console.log(err))
  }



  componentDidMount(){
    const {isLoading} = this.state;
    if(!isLoading){
      setTimeout(()=>{
        this.setState({isLoading: !isLoading});
      },6000);
    }
    this.getApi();
  }

  render() {
    const { users, isLoading} = this.state;
    
    

    console.log("state",this.props.location)
    
    //this.setState({users : data});
    
    //this.setState({users : data});
   // users.map(data => console.log(data.title))

    return (
      
      <>
      {isLoading ? (
        <div class="loading">
          <img alt="loading_img" src={main} className="loading_img"/> 
        </div>
      ): 
      <div className="App">
        <section className="top">
        <header>
          <section className="container_first">
            
            <h1>Teen 돋보기</h1>
            <img src={main} alt="main" className="main_img"/>
          </section>
          <section className="container_second">
            <div className ="local" onClick={change.area}>분야별로 골라보기</div>
            <div className ="area" onClick={change.local}>지역별로 골라보기</div>
            
          </section>
        </header>
          <section className="moto_container">
               <div className = "moto">
                 <div>모든 청소년들에게</div>
                 <div>세상을 바라볼 수 있는</div>
                 <div>넓은 시각을 제공하자</div>
                 
              </div>
               <img className ="moto_img" src="https://image.freepik.com/free-vector/hiring-agency-candidates-job-interview_1262-18940.jpg" alt="main"/>
          </section>
      </section>
        <section className="trends">
          <div className ="trends_container" >
          {users.map(data => {
            return(
              
                <Trend key={data._id} local ={data.local} title={this.changeStr(data.title)} info={data.info} img={data.img} part={data.part.slice(5).split(',')} date={data.dday.split('D')[0].split('간')[1]} host={this.changeStr(data.host)} homepage={data.hompage.split('지')[1]} total_reward={this.splitReward(data.reward)} first_reward={this.splitReward(data.price)}/>
            )
          })}
          </div>  
        </section>  
      </div>
        }
      </>
        
    );
  }
}

export default Home;

