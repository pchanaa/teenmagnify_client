
import React, {useState, Fragment} from 'react';
import Modal from './modal';
import "./trend.css";
const Trend=({ key, title ,local,info ,img,part, date, host,homepage,total_reward, first_reward})=> {
  //console.log(title)
  const openModal=()=>{
    setOpenState(true);
  }
  const closeModal=()=>{
    setOpenState(false);
  }
  const partArray=(data)=>{
    if(data.length >= 3){
      return `${data[0]}, ${data[1]}, ${data[2]}`;
    }
    else if(data.length === 2){    
      return `${data[0]}, ${data[1]}`;
    }
    else{
      return `${data[0]}`;
    }

  }
  const splitInfo=(ele)=>{
    let array;
    if(ele.includes('■'))
      array = ele.split('■').slice(1,4);
    else array = ele;
    return array;
  }
  
  const [openState, setOpenState] = useState(false);

  
  return (
    <>

      <section className="info" onClick={openModal}>
        <img src={img} alt={key} className="trend_img"/>
        <div className="trend_container">
          <section className="trend_box">
            <div className="trend_title"><div>{title}</div></div>
            <div className="trend_host">주최/주관 : {host}</div>
            <div className="trend_part">분야 : {partArray(part)}</div>
            <div className="trend_local">지역 : {local}</div>
            <div className="total_reward">총 상금 : {total_reward}</div>
            <div className="first_reward">1등 상금 : {first_reward}</div>
            <div className="trend_day">접수 기간 : {date}</div>

          </section>
        </div>
      </section>
        <Modal open={openState} close={closeModal} id={key} title={title} info={splitInfo(info)} homepage={homepage} img={img} /> 
      
    </>
   
  )
}

export default Trend;

