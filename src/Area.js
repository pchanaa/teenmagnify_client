import React, { Component } from 'react';
import "./area.css";
import "./modal.css";
import image from "./img/loading.png";
import change from "./changeurl";
import Areainfo from "./areaInfo";
import {searchObject} from "./object";



export default class Area extends Component {

  state = {
    areas : [],
    isLoading: true,
    openState : false,
    
  }
 

  splitInfo=(ele)=>{
    let array;
    if(ele.includes('■'))
      array = ele.split('■').slice(1,4);
    else array = ele;
    return array;
  }
  splitReward=(str)=>{
    return str.split('금')[1];
  }
 
  changeStr=(data)=>{
    data = data.replace("신규","");
    data = data.replace("주최/주관","");
    data = data.replace("SPECIAL","");
    return data;
  }
  setDBdata=()=>{
   
   
    let str = window.location.pathname.split('/')[2]; 
    const {areas}=this.state;
      if(str!==undefined){
    
            let array = areas.filter(function(data){
              
              return data.part.includes(searchObject[str])
        });
          /* return (array.map(data => 
            <Areainfo id={data._id} title={this.changeStr(data.title)} info={data.info} link={data.object} img={"https://www.wevity.com/"+data.img} part={data.part.slice(5).split(',')} date={data.dday.split('D')[0].split('간')[1]} host={this.changeStr(data.host)}/>
          ));*/
            /*console.log(array);
            console.log(str);*/
          
          return (array.map(data => 
            <Areainfo key={data._id} local ={data.local} title={this.changeStr(data.title)} info={this.splitInfo(data.info)} homepage={data.hompage.split('지')[1]} img={data.img} part={data.part} date={data.dday.split('D')[0].split('간')[1]} host={this.changeStr(data.host)} first_reward={this.splitReward(data.price)} total_reward={this.splitReward(data.reward)}/>
          ));
      }
      else{
        return (areas.map(data => 
          <Areainfo key={data._id} local ={data.local} title={this.changeStr(data.title)} info={this.splitInfo(data.info)} homepage={data.hompage.split('지')[1]} img={data.img} part={data.part} date={data.dday.split('D')[0].split('간')[1]} host={this.changeStr(data.host)} first_reward={this.splitReward(data.price)} total_reward={this.splitReward(data.reward)}/>
        ));
      }
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
        this.setState(element =>  ({areas : data, isLoading:false}))})

      .catch(err=>console.log(err));
}

  componentDidMount(){
    const {isLoading} = this.state;
    //console.log(this.dbcondition)
    if(!isLoading){
      setTimeout(()=>{
        this.setState({isLoading: !isLoading});
      },6000);
    }
    this.getApi();
  }

  render() {
    const {isLoading} = this.state;
    
    return (
      <>
      {isLoading?
      (
        <div class="loading">
           <img alt="loading_img" src={image} className="loading_img"/>
        </div>
      )
      :
      <div className="area_box">
        <nav className="area_nav">
          <div className="area_nav_title">분야별 정보</div>
          <ul className="area_list">
          <li onClick={change.web}>웹/모바일/IT</li>
          <li onClick={change.advertise}>광고/마케팅</li>
          <li onClick={change.video}>영상/UCC/사진</li>
          <li onClick={change.arts}>예체능/미술/음악</li>
          <li onClick={change.supporters}>대외활동/서포터즈</li>
          <li onClick={change.idea}>기획/아이디어</li>
          <li onClick={change.report}>논문/리포트</li>
          <li onClick={change.job}>취업/창업</li>
          <li onClick={change.science}>과학/공학</li>
          <li onClick={change.literature}>문학/글/시나리오</li>
          <li onClick={change.game}>게임/소프트웨어</li>
          <li className="area_tag10" onClick={change.etc}>기타</li>
         </ul>
         <button className="home_button" onClick={change.home}>홈으로</button>
         <section className="area_down_buttons">
            <img alt="facebook" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEVCZ7L///+5w95GarM2YK80Xq+pttc+ZbFfe7s6YrCHmsmZqdA8Y7Ds8PdSdLlffr3V3OyQpNFrh8Lg5vIvW633+fyCmsxKb7fG0eier9WtutnAy+Ta4e91jsR8k8eMn8zP1ulvh8Dx9PkmVqvo7ff2SOu1AAAEYklEQVR4nO3da3uqOBSG4YDBmDYkHEStp1qn//83jqfuvWemoxGarBWu9/myP9XNfS0sIJGK7FpZ1Y0VY8k2dVXeZOL6T+6kNtTb9YMZLV3+h7B1cky8a0a69ktYWU29OUHStroKWzu+AV4ztr0I3TgneE67szCX1NsRMJlnonRj3UfPGVeKaswjPA2xEvV434XndC2aMe+kp920EeM5Vfu+sfsQQgghhBBCCCGEEPJJKWOM1lpKfc5cUkoo6g37mbQshG12+8XLe/1+6mWx3+8+GjezSyXnRXESq1SpyuhiPlmsq21bHrvudrc667ruWJafn227rQ6b9euisUWStySUFM3r6pfrfq/pEc18Oa2OfryzMLW7Lnry4Tu9JGeoin31DC+1GSrjDk/NL7UZmsn0aV9SM5R2+7wvoRmq4q3HABMSnoC9fMnspWqy6glMZIbKbPoCU5lhf2AaMyym/YFJzFDXA4ApzNA0/qfZSc5QyWfPRFOboR7yJkxBaNygfTSBvXTe+1CfyAyNGwjkPkOlhv2a4T9Ds+t3QZHODE0+FMh8hmo5eITMZygHna+lMEPZ63OLhITGlY8FD4Wc91LZ95OLfwgZz1ANufD9LWQ8Q2U/f0LIeIZm9gSk267y9Xo9/XfrD8bfFtELX95xs58tJ0rLb2IMFIXnCU05nRQmyRvbc7+jYTXTCeIuSa9r343ivB/eb+kjLJfpAk3jc9q9Y3wweJTZewhXyS4nEZ4XFu8Jj1Do18fA0iY8Qq/z7kNBvZVD8rkfM01aKNceb0PGFw6P8zlpS/tL2D7C2eiFSf8q9RIuqTdyUD7CCfVGDgpCCPkHIYT8gxBC/kEIIf8ghJB/EELIv1EI1Xc33r/6y0NoinuvcIr4E2Pl/rt24o88bnLf+/FLb7RE/fLYMLDP+diFK9pbNxGEa9o7qBGExKvaIghfxi7sdrQ3p8ILqR9FHl7YEt9+Cy+sJmMXHoiX24QX5sRrNcIL30Y/wz3xSobwQuq/WxFeSOuLIOxor50iCNvRCzfUC/uCC8mXLgYX1tQriIMLqQ+HwYUd+eLM0MLSUS9dDC3cki/ODC08EF8dhhduqN+GwYXEH5ZGENJ/BTiwsCM/HAYXkh8OQwuP9OvcQwupz7uDC7fUV4cn4XtQIfG9w3Nq6Wb/n/V4ZsS9n59x+LuG6l5zj5UKwtx5AWrdw0ax2uRuEELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8g/EEh0bMJogmtIHrMSyyhaURN8zCiWEJdi4rmgVKxhLISRA82jyQ0rhRZTjLESEKZZyLrHMU7MY5Qu+wkzFpLsJ9GERrbXoRZZeNPMYZQ2yq7CrPWydhjDC800rXZlzDrcid1VGRgodHS3f4HcXu1sqqbmCdwYYW2qavy9ip/A3YKUMidEST2AAAAAElFTkSuQmCC"/>
            <img alt="kakaotalk" src="data:image/png;base64,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"></img>
            <img alt="instagram" src="https://workingwithdog.com/wp-content/uploads/2016/05/new_instagram_logo-1024x1024.jpg"></img>

         </section>
        </nav>
        <section className="area_container">
          <div className="area_div">
          <header className="area_c_header">
            <section className="area_header_box">
              <div className="area_header_high">이 분야에선 이런 대회가 열리는구나~~</div>
              <div className="area_header_down">분야별로 열리는 다채로운 대회들을 확인해보자!</div>
            </section>
          </header>
          <section className="area_items">
            {this.setDBdata()}
            </section> 
          </div>
        </section>
      </div>
      }
      </>
    )
  }
}
