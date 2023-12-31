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
function Quitacao() {
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

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      const Pedido_quitacao=()=>{
        axios({
          method:"post",
          url:`${localStorage.getItem('url')}/web/Marcar_Pedido/`,
          headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
          data:{id:1}
      }).then(dat=>{ if(dat.status!==200){
          throw Error('Dados de acesso invalidos');  
              }
          return dat
       } ).then( df=>{
        setSucesso(df.data);
        setStep(3);
        setPhase2(null);
        setPhase4('sdsd')
        message.success('Pedido submetido com sucesso!');
        }
     
         ).catch(e=>{
          message.error("Servidor Indisponivel")
        
      })
    

      }

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
   
        <div className='passos_'>
              <Steps current={step}>
        
        <Step title="Resumo" />
       
       <Step title="Pagamento" />
       <Step title="Concluido" />
    
      
   
     </Steps>

              </div>
        <div className='corpo_tipo_certi'>
      
      {phase1 &&    
       <Space
                    className='spacew'
                    size='large' 
                    align='center'
                    direction='vertical'
                    >
                                        <div className='texto_certi'>Certidão de Quitação</div>

       {dados &&<>
        <Form
      className='froam'
      layout="inline"
      disabled='disabled'
    >
      
     
      <Form.Item label="Nome da Empresa">
        <Input value={dados.nome}/>
      </Form.Item>
           
      <Form.Item label="Endereço">
        <Input value={dados.endereco}/>
      </Form.Item>
           
      <Form.Item label="Actividade">
        <Input value={dados.vocacao}/>
      </Form.Item>
      <Form.Item label="Cidade">
        <Input value={dados.cidade}/>
      </Form.Item>
      <Form.Item label="NUIT">
        <Input  value={dados.nuit} />
      </Form.Item>
   
    </Form>

       </>}
       
       
                    
                    </Space>  }
              
       { phase1 &&

<div className='foot2'>
            
<Button className='step' onClick={()=>{history.push('/home/Certidoes')}}><LeftCircleOutlined/></Button>
<Button className='proximo_step' onClick={()=>{setPhase1(null);setPhase2('df');setStep(1)}}>Proximo</Button>
</div>
       }

 {phase1 && <>
 <div className='spaceBt'>
 
 </div>
 </>}      
        </div>

        {phase2 && <>
        
          <div className='pagamento'>
     <Space className='klsa'   direction="vertical">
    <Segmented
    onChange={onChangepay}
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              
              <Avatar  shape="square" size={64} src={ <img  src={require('../images/BIM.png')}/>}  />
              <div>BIM</div>
            </div>
          ),
          value: 'pay1',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
                <Avatar  shape="square" size={64} src={ <img src={require('../images/BCI.jpeg')}/>}  />
              <div>BCI</div>
            </div>
          ),
          value: 'pay2',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
                <Avatar  shape="square" size={64} src={ <img src={require('../images/MOZA.png')}/>}  />
              <div>MOZA</div>
            </div>
          ),
          value: 'pay2',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
                  <Avatar  shape="square" size={64} src={ <img src={require('../images/pos-terminal.png')}/>}  />
              <div>Pos</div>
            </div>
          ),
          value: 'pay3',
        },
      
      ]}
    />
 
  </Space>
     <div>
     <Descriptions title="Pagamento informacoes" className='opdc' bordered>
    <Descriptions.Item label="Servico">Certidao de Quitacao</Descriptions.Item>
    <Descriptions.Item label="Valor">1000 MZN</Descriptions.Item>

    
  </Descriptions>
  

  <div className='avancarRa'>  
  <Button className='avanca1'  onClick={()=>{setStep(0);setPhase1('dfdf');setPhase2(null)}}  ><LeftCircleOutlined /></Button>
  
  <Button type='primary' className='aas' onClick={Pedido_quitacao} >  Pagar</Button>
  
      </div> 
     </div>


     </div>
        
        
        </>
           
        }

        {phase4 && <>
          <div className='Registado_com_sucesso'>
    <Result
    status="success"
    title="Pedido submetido com sucesso!"
    extra={[
        
        <Button key="buy" onClick={()=>{history.push('/home/Certidoes')}} >Menu</Button>,
      ]}
  
  />
    <div className='separador_quitacao'>

    </div>
    </div>
        
        
        </>}

        
    


    </div>
  )
  }
export default Quitacao