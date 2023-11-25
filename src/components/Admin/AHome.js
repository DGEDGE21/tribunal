import React from 'react'
import './styles/certi.css'
import { Input, Space,Card,Button,Select} from 'antd';
import { Col, Row } from 'antd';
import { useHistory } from "react-router-dom";
import {
  LogoutOutlined

  
} from '@ant-design/icons';
import Logout from '../Layout/Logout';
function AHome() {
  const { Search } = Input;
    const history = useHistory();
   
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      
  return (
    <div>
   
   <Logout/>
      
      <div className='dadaos'>
        <div className='items09'>
        <div className='itemsq'>
          <img src={require('./images/Circulos-20230708T205210Z-001/Circulos/PNG copy.png')}  />
          <div>
            <h3 onClick={()=>{history.push('/admin/home/pedidos')}}>Pedidos submetidos </h3>
            <text>Submeta um pedido para obtencao da quitacao</text>
          </div>
        </div>
        <div className='itemsq'>
          <img src={require('./images/Circulos-20230708T205210Z-001/Circulos/PNG 4.png')}  />
          <div>
            <h3  onClick={()=>{history.push('/home/Certidoes/pedidos')}}>Relatórios e análises </h3>
            <text>Monitorar o andamento de todos os processos no tribunal.</text>
          </div>
        </div>
        <div className='itemsq'>
        
        </div>
  

        </div>
        <div className='items09'>
        <div className='itemsq'>
         </div>
        <div className='itemsq'>
        </div>
        <div className='itemsq'>
        </div>
  

        </div>
        <div className='items09'>
        <div className='itemsq'>
        </div>
        <div className='itemsq'>
        </div>
        <div className='itemsq'>
         </div>
  

        </div>
        

      </div>
    


    </div>
  )
}

export default AHome