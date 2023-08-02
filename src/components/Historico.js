
import React,{useState,useEffect} from 'react'
import { Input, Space,
  Result,Card,Button,Form,Radio
  , Steps, message ,Avatar,Segmented
  ,Descriptions,SegmentedProps} from 'antd';  
import '../styles/quitacao.css'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
  PayCircleOutlined,
  ProfileOutlined,
  CameraOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
  UserOutlined,
  CheckOutlined,
  CloudDownloadOutlined 
  
} from '@ant-design/icons';
function Historico() {
    const { Search } = Input;
    const [value, setValue] = useState(1);
    const [phase1,setPhase1]=useState(1);
    const [phase2,setPhase2]=useState(null);
    const [phase4,setPhase4]=useState(null);
    const [step,setStep]=useState(0);
    const [sucesso,setSucesso]=useState(null);
    const { Step } = Steps;
    const[dados,setDados]=useState(null)
    const history = useHistory();
    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
    
    useEffect(()=>{
        axios({
            method:"post",
            url:`${localStorage.getItem('url')}/web/dados_empresa/`,
            headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
            data:{id:1}
        }).then(dat=>{ if(dat.status!==200){
            throw Error('Dados de acesso invalidos');  
                }
            return dat
         } ).then( df=>{
          setDados(df.data);
          console.log(df.data);
          message.success('dados Carregados com sucesso!');
         
           
          }
       
           ).catch(e=>{
            message.error("Servidor Indisponivel")
          
        })
      
    },[])

    const onChangepay: SegmentedProps['onChange']=(value:string)=>{

      console.log(value)
    }
    
 
  return (
    <div>
    <div className='Cabecario'>
            <img  src={require('../images/rep-removebg-preview.png')} />
            <div className='titles'>
            <div className='texto_cabecari'>República De Moçambique</div>
            <div className='texto_cabecari'>Tribunal Supremo</div>
            <div className='texto_cabecari'>Secretaria geral</div>

            </div>
            
    </div>
 
    <div className='corpo_tipo_certi'>
  
  {phase1 &&       <Space
                className='spacew'
                size='large' 
                align='center'
                direction='vertical'
                >
                                    <div className='texto_certi'>Perfil</div>

   {dados &&<>
    <Form
  className='froam'
  layout="horizontal"
 
>
  
 
  <Form.Item label="Nome da Empresa">
    <Input value={dados.nome}/>
  </Form.Item>
       
  <Form.Item label="Endereço">
    <Input value={dados.endereco}/>
  </Form.Item>
       
  <Form.Item label="Vocação">
    <Input value={dados.vocacao}/>
  </Form.Item>
  <Form.Item label="NUIT">
    <Input  value={dados.nuit} />
  </Form.Item>
  <Form.Item label="Representante">
    <Input  value={dados.Representante} />
  </Form.Item>

</Form>

   </>}
   
   
                
                </Space>  }
          
   { phase1 &&

<div className='foot2'>
        
<Button className='step' onClick={()=>{history.push('/home/Certidoes')}}><LeftCircleOutlined/></Button>
<Button className='proximo_step' >Submter Pedido</Button>
</div>
   }
   
    </div>

 

    

<footer className='footera'>
<img  className='assembl' src={require('../images/Emblem.png')} />
<div className='texto_fo'>
REPÚBLICA DE MOÇAMBIQUE
</div>
<div className='texto_fo'>
COPYRIGHT © 2023 TRIBUNAL SUPREMO
</div>
<img className='icons' src={require('../images/Location.png')} />

<div className='texto_fo'>
103 Av. Vladimir Lenine, Maputo
</div>
<img className='icons' src={require('../images/icone horario.png')} />

<div className='texto_fo'>
+258 21 323 306
</div>
<img className='icons' src={require('../images/icone horario.png')} />

<div className='texto_fo'>
Horário de atendimento por telefone: 8:30h às 15:30h
</div>

</footer>

</div>
  )
}

export default Historico