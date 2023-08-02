import React,{useState} from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import '../styles/criar.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Steps , Result,Select } from 'antd';
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
 
function Criar() {
    const [form] = Form.useForm();
    const [phase1,setPhase1]=useState('sd');
    const [phase2,setPhase2]=useState(null);
    const [phase3,setPhase3]=useState(null);
    const [phase4,setPhase4]=useState(null);
    const [nome,setNome]=useState(null)
    const history = useHistory();
    const [pass,setPass]=useState(null)
    const [details, setDetails] = useState({ nome: "", nome_empresa: "",provincia:"",cidade:"" ,nuit:"",endereco:"",vocacao:"",cell:"",mail:""})
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };


  const Registarempresa=()=>{
   
    axios({
        method:"post",
        url:`${localStorage.getItem('url')}/web/Registar_empresa/`,
        headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
        data:details
    }).then(dat=>{ if(dat.status!==200){
        throw Error('Dados de acesso invalidos');  
            }
        return dat
     } ).then( d=>{
       message.success("Registrado com sucesso!")
       setPhase3(null)
       setPhase4('df')
       setNome(d.data.username)
       setStep(2)
       setPass(d.data.password)
     }
   
       ).catch(e=>{
        message.error("Registrado sem sucesso!")
    })

}
const handleChange = (value: string) => {
  setDetails({ ...details, provincia: value });
};
const handleChange2 = (value: string) => {
  setDetails({ ...details, cidade: value });
};


    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const { Step } = Steps;
      const [step,setStep]=useState(0)

   
  return (
    <div className='homeclass'>
          <div className='Cabecario'>
                <img  src={require('../images/rep-removebg-preview.png')} />
                <div className='texto_cabecario'>Tribunal Supremo de Moçambique</div>
        </div>
       <div className='passos_l'> 
       <Steps current={step}>
        
        <Step title="Dados Basicos" />
       
       <Step title="Resumo" />
       <Step title="Concluido" />
    
      
   
     </Steps>


       </div>
        

   <Form
    name="basic"
    className='formulario_123'
    form={form}
    layout="horizontal"
    initialValues={{ requiredMarkValue: requiredMark }}
    onValuesChange={onRequiredTypeChange}
    requiredMark={requiredMark}
  >
 { phase1
 &&
 <>
    <Form.Item
      label="Nome do Representante"
      name="username"
      rules={[{ required: true, message: 'introduza nome do representante!' }]}
    >
      <Input onChange={e => setDetails({ ...details, nome: e.target.value })} value={details.nome}   />
    </Form.Item>
    <Form.Item
      label="Nome da Empresa"
      name="empname"
      rules={[{ required: true, message: 'introduza nome da empresa!' }]}
    >
      <Input onChange={e => setDetails({ ...details, nome_empresa: e.target.value })} value={details.nome_empresa}/>
    </Form.Item>
    <Form.Item
      label="NUIT"
      name="nuit"
      rules={[{ required: true, message: 'introduza NUIT!' }]}
    >
      <Input onChange={e => setDetails({ ...details, nuit: e.target.value })} value={details.nuit}/>
    </Form.Item>
    <Form.Item
      label="Actividades"
      name="business"
      rules={[{ required: true, message: 'vocacao da empresa!' }]}
    >
      <Input onChange={e => setDetails({ ...details, vocacao: e.target.value })} value={details.vocacao} />
    </Form.Item>

  
 
 </>
 }
 
    { phase2 && <>
   
   
    </>


    }


 


{phase2 && <>

<Form
form={form}
layout="inline"
className='provinicas_'
initialValues={{ requiredMarkValue: requiredMark }}
onValuesChange={onRequiredTypeChange}
disabled={false}
requiredMark={requiredMark}
>

{ 21
&&
<>
      <Form.Item className='asq1' label="Provincia" required tooltip="This is a required field">
      <Select
      defaultValue="Selecione a provincia"
      style={{ width: 180 }}
      onChange={handleChange}
      options={[
        {
          "value": "Niassa",
          "label": "Niassa"
        },
        {
          "value": "Manica",
          "label": "Manica"
        },
        {
          "value": "Gaza",
          "label": "Gaza"
        },
        {
          "value": "Inhambane",
          "label": "Inhambane"
        },
        {
          "value": "Maputo",
          "label": "Maputo cidade"
        },
        {
          "value": "MPM",
          "label": "Maputo provincia"
        },
        {
          "value": "Nampula",
          "label": "Nampula"
        },
        {
          "value": "Cabo Delgado",
          "label": "Cabo Delgado"
        },
        {
          "value": "Zambezia",
          "label": "Zambezia"
        },
        {
          "value": "Sofala",
          "label": "Sofala"
        },
        {
          "value": "Tete",
          "label": "Tete"
        }
      ]}
    />
 
  </Form.Item>
  <Form.Item className='asq1' label="Cidade" required tooltip="This is a required field">
      <Select
      defaultValue="Selecione a cidade"
      style={{ width: 180 }}
      onChange={handleChange2}
      options={[
        {
          "label": "Maputo",
          "value": "Maputo",
          "province": "Maputo"
        },
        {
          "label": "Matola",
          "value": "Matola",
          "province": "Maputo"
        },
        {
          "label": "Beira",
          "value": "Beira",
          "province": "Sofala"
        },
        {
          "label": "Nampula",
          "value": "Nampula",
          "province": "Nampula"
        },
        {
          "label": "Chimoio",
          "value": "Chimoio",
          "province": "Manica"
        },
        {
          "label": "Nacala",
          "value": "Nacala",
          "province": "Nampula"
        },
        {
          "label": "Quelimane",
          "value": "Quelimane",
          "province": "Zambezia"
        },
        {
          "label": "Tete",
          "value": "Tete",
          "province": "Tete"
        },
        {
          "label": "Lichinga",
          "value": "Lichinga",
          "province": "Niassa"
        },
        {
          "label": "Pemba",
          "value": "Pemba",
          "province": "Cabo Delgado"
        }
      ]
      }
    />
 
  </Form.Item>
  <Form.Item className='asq1'
      label="Telefone"
      name="phone"
      rules={[{ required: true, message: 'cell' }]}
    >
      <Input onChange={e => setDetails({ ...details, cell: e.target.value })} value={details.cell}/>
    </Form.Item>
    <Form.Item className='asq1'
      label="E-mail"
      name="mail"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input onChange={e => setDetails({ ...details, mail: e.target.value })} value={details.mail} />
    </Form.Item>
   
 
  <Form.Item className='asq1'  label="Morada" required tooltip="This is a required field">
    <Input style={{ width: 490 }} placeholder="" onChange={e => setDetails({ ...details, endereco: e.target.value })} value={details.endereco} />
  </Form.Item>
 



</>




}   



</Form>


</>}


 
 {phase1   && <Form.Item>

<div className='avancarR'> 
<Button className='avanca1' onClick={()=>{history.push('/')}}  ><LeftCircleOutlined /></Button>

<Button className='avancar2' onClick={()=>{setPhase1(null);setPhase2('sdsd')}}  ><RightCircleOutlined /></Button>
</div>

</Form.Item>}
{phase2 && <Form.Item >
<div className='avancarR'>  
<Button className='avanca1' onClick={()=>{setPhase1('dfdf');setPhase2(null)}}  ><LeftCircleOutlined /></Button>
  
<Button className='avancar2' onClick={()=>{setPhase2(null);setPhase3('sdsd');setStep(1)}}  ><RightCircleOutlined /></Button>
</div>
      
    </Form.Item>}


  </Form>

{phase3 && <>

    <Form
  form={form}
  layout="inline"
  initialValues={{ requiredMarkValue: requiredMark }}
  onValuesChange={onRequiredTypeChange}
  disabled={true}
  className='resumobb'
  requiredMark={requiredMark}
    >

{ 21
 &&
 <>
          <Form.Item className='resumo_items' label="Nome" required tooltip="This is a required field">
        <Input placeholder="" onChange={e => setDetails({ ...details, nome: e.target.value })} value={details.nome} />
      </Form.Item>
      <Form.Item className='resumo_items' label="Nome da Empresa" required tooltip="This is a required field">
        <Input placeholder="" onChange={e => setDetails({ ...details, nome_empresa: e.target.value })} value={details.nome_empresa} />
      </Form.Item>
     
      <Form.Item className='resumo_items' label="Nuit" required tooltip="This is a required field">
        <Input placeholder="" onChange={e => setDetails({ ...details, nuit: e.target.value })} value={details.nuit} />
      </Form.Item>
     

      <Form.Item className='resumo_items' label="Endereco" required tooltip="This is a required field">
        <Input placeholder="" onChange={e => setDetails({ ...details, endereco: e.target.value })} value={details.endereco} />
      </Form.Item>
     

 
 </>
 }  
 
    { 21 && <>
   
        <Form.Item className='resumo_items'  label="Vocacao" required tooltip="This is a required field">
        <Input placeholder="" onChange={e => setDetails({ ...details, vocacao: e.target.value })} value={details.vocacao} />
      </Form.Item>
     
      <Form.Item className='resumo_items' label="Telefone" required tooltip="This is a required field">
        <Input placeholder="" onChange={e => setDetails({ ...details, cell: e.target.value })} value={details.cell} />
      </Form.Item>
      <Form.Item className='resumo_items' label="E-mail" required tooltip="This is a required field">
        <Input placeholder="" onChange={e => setDetails({ ...details, mail: e.target.value })} value={details.mail} />
      </Form.Item>
      <Form.Item className='resumo_items'  label="Provincia" required tooltip="This is a required field">
      <Select
      defaultValue={details.provincia}
      style={{ width: 180 }}
      onChange={handleChange}
      options={[
        {
          "value": "Niassa",
          "label": "Niassa"
        },
        {
          "value": "Manica",
          "label": "Manica"
        },
        {
          "value": "Gaza",
          "label": "Gaza"
        },
        {
          "value": "Inhambane",
          "label": "Inhambane"
        },
        {
          "value": "Maputo",
          "label": "Maputo cidade"
        },
        {
          "value": "MPM",
          "label": "Maputo provincia"
        },
        {
          "value": "Nampula",
          "label": "Nampula"
        },
        {
          "value": "Cabo Delgado",
          "label": "Cabo Delgado"
        },
        {
          "value": "Zambezia",
          "label": "Zambezia"
        },
        {
          "value": "Sofala",
          "label": "Sofala"
        },
        {
          "value": "Tete",
          "label": "Tete"
        }
      ]}
    />
 
  </Form.Item>
  <Form.Item  className='resumo_items' label="Cidade" required tooltip="This is a required field">
      <Select
      defaultValue={details.cidade}
      style={{ width: 180 }}
      onChange={handleChange2}
      options={[
        {
          "label": "Maputo",
          "value": "Maputo",
          "province": "Maputo"
        },
        {
          "label": "Matola",
          "value": "Matola",
          "province": "Maputo"
        },
        {
          "label": "Beira",
          "value": "Beira",
          "province": "Sofala"
        },
        {
          "label": "Nampula",
          "value": "Nampula",
          "province": "Nampula"
        },
        {
          "label": "Chimoio",
          "value": "Chimoio",
          "province": "Manica"
        },
        {
          "label": "Nacala",
          "value": "Nacala",
          "province": "Nampula"
        },
        {
          "label": "Quelimane",
          "value": "Quelimane",
          "province": "Zambezia"
        },
        {
          "label": "Tete",
          "value": "Tete",
          "province": "Tete"
        },
        {
          "label": "Lichinga",
          "value": "Lichinga",
          "province": "Niassa"
        },
        {
          "label": "Pemba",
          "value": "Pemba",
          "province": "Cabo Delgado"
        }
      ]
      }
    />
 
  </Form.Item>   
      
   
    </>


    }   
    
 

    </Form>

    {phase3 && <>
        <div className='avancarR'>  
        <Button className='avanca1' onClick={()=>{setPhase3(null);setPhase2('dfdf');setStep(0)}}  ><LeftCircleOutlined /></Button>

<Button className='avancar2' onClick={Registarempresa}>Registar</Button>
</div>
    <div className='dfa'></div>
 
 </>}   

</>}

{phase4 && <div className='Registado_com_sucesso'>
    <Result
    status="success"
    title="Registrado com Sucesso"
    subTitle={`nome de usuario:${nome},password:${pass}`} 
    extra={[
        
        <Button key="buy" onClick={()=>{history.push('/')}} >Login</Button>,
      ]}
  
  />
    
    </div>}



      
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

export default Criar