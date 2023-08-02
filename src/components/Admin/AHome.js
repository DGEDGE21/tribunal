import React from 'react'
import './styles/certi.css'
import { Input, Space,Card,Button,Select} from 'antd';
import { Col, Row } from 'antd';
import { useHistory } from "react-router-dom";
import {
  LogoutOutlined

  
} from '@ant-design/icons';
function AHome() {
  const { Search } = Input;
    const history = useHistory();
   
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      
  return (
    <div>
        <div className='Cabecario'>
                <img  src={require('./images/rep-removebg-preview.png')} />
                <div className='titles'>
                <div className='texto_cabecari'>República De Moçambique</div>
                <div className='texto_cabecari'>Tribunal Supremo</div>
                <div className='texto_cabecari'>Secretaria geral</div>

                </div>


                <div className='logouts' onClick={()=>{history.push('/')}}>
                    <LogoutOutlined/>
                    Sair
                    </div>
                
        </div>

      <h1 className='nome_empresa'>Administrador </h1>
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
    
    <footer className='footera'>
    <img  className='assembl' src={require('./images/Emblem.png')} />
    <div className='texto_fo'>
    REPÚBLICA DE MOÇAMBIQUE
    </div>
    <div className='texto_fo'>
    COPYRIGHT © 2023 TRIBUNAL SUPREMO
    </div>
    <img className='icons' src={require('./images/Location.png')} />
    
    <div className='texto_fo'>
    103 Av. Vladimir Lenine, Maputo
    </div>
    <img className='icons' src={require('./images/icone horario.png')} />
    
    <div className='texto_fo'>
    +258 21 323 306
    </div>
    <img className='icons' src={require('./images/icone horario.png')} />
    
    <div className='texto_fo'>
    Horário de atendimento por telefone: 8:30h às 15:30h
    </div>
   
    </footer>

    </div>
  )
}

export default AHome