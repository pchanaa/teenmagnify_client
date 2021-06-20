import React, {useState} from 'react';
import Modal from "./modal";

//import "./area.css";

const Localinfo=({key,title,local,info,homepage,img,part, date, host,total_reward,first_reward })=> {

  
  const dateFunc=(str)=>{  
    if(str!==undefined){
      return  <div className="local_day">접수 기간 : {date}</div>
    }
    else{
      return null;
    }
}
  const openModal=()=>{
    setOpenState(true);
  }
  const closeModal=()=>{
    setOpenState(false);
  }


  
  
  const [openState, setOpenState] = useState(false);
  //console.log(typeof first_reward, title);
  return (
    <>

    <section className="local_info" onClick={openModal}>
      <img src={img} alt={key} className="local_img"/>
      <div className="local_items_container">
        <section className="local_item_box">
          <div className="local_title"><div>{title}</div></div>
          <div className="local_host">주최/주관 : {host}</div>
          <div className="local_part">분야 : {part.replace("분야 : ","")}</div>
          <div className="local_local">지역 : {local}</div>
          {total_reward!==undefined?
          (
          
              <div className="local_total">총 상금 : {total_reward}</div>
              ):null
            } 
            {first_reward!==undefined && first_reward.includes("만원")?
            (<div className="local_total">1등 상금 : {first_reward}</div>)
              :null
            }
          {dateFunc(date)}
         

        </section>
      </div>
    </section>
      <Modal open={openState} close={closeModal} key={key} title={title} info={info} homepage={homepage} img={img} /> 
    
  </>
  )
}

export default Localinfo;
