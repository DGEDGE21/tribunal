import React from 'react'
import './styles/certi.css'
import { Input, Space,Card,Button,Select} from 'antd';
import { Col, Row } from 'antd';
import { useHistory } from "react-router-dom";
import Logout from '../Layout/Logout';
import {
  LogoutOutlined

  
} from '@ant-design/icons';
function PHome() {
 
    const { Search } = Input;
    const history = useHistory();
   
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      
  return (
    <div>
    
      <div className='dadaos'>
      <Logout/>
        <div className='items09'>
 
        <div className='itemsq'>
        <img src={require('./images/Circulos-20230708T205210Z-001/Circulos/PNG 8.png')}  />
          <div>
            <h3  onClick={()=>{history.push('/opera/home/relatorios')}}>Gestão de antecedentes </h3>
            <text>Registrar, pesquisar e históricos de todas as requisições ...</text>
          </div>
        </div>
        <div className='itemsq'>
          <img src={require('./images/Circulos-20230708T205210Z-001/Circulos/PNG 4.png')}  />
          <div>
            <h3  onClick={()=>{history.push('/opera/home/relatorios')}}>Relatórios e análises </h3>
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

export default PHome