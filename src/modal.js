import React from 'react';
import './modal.css';

const Modal =({open, close, id, title ,info,homepage,img})=> {
  //console.log(open, close)
  
  console.log(typeof info);
  return (
    <div className={open ? 'openModal modal':'modal'}>
    {open ?(
     <section className="modal_container">
       <main>
          <div className="modal_title">{title}</div>
          <img className="modal_img" src={img} alt={id}/>
          <section className="modal_info">
            <div>
              {typeof info ==="string"?info.length>200?<div className="modal_context">{`${info.slice(0,200)}...`}</div>:<div className="modal_context">{info}</div>:
              
              info.map(data => {
                if(data.length>=150){
                  return <div className="modal_context">{`${data.slice(0,100)}...`}</div>
                }
                else{
                  return <div className="modal_context">{data}</div>
                }
              
            })
          }
            </div>
            <a className="modal_link" href={homepage} target="_blank" rel="noreferrer noopener">자세히 알아보기</a>
          </section>
      </main>
      <footer>
        <button className ="close_button" onClick={close}> 닫기</button>
      </footer>
      
      </section>
    ): null}
     </div>
    
  )
    }

export default Modal;