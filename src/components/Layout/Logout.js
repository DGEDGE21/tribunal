import React from 'react'
import {
    LogoutOutlined
  
    
  } from '@ant-design/icons';
import './estilo.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Logout() {
  const history=useHistory();
  const sair=()=>{
    history.push('/')
      
  }
  return (
 

    <div className='log' onClick={sair}>
        <LogoutOutlined/>
        <label>.Sair</label>


    </div>
  )
}

export default Logout