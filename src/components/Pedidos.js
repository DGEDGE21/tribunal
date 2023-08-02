import React,{useEffect,useState,useRef} from 'react'
import '../styles/pedidos.css'
import { Input, Space,Card,Button,Select,message,Steps,QRCode} from 'antd';
import { Col, Row,List } from 'antd';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { format,subMonths, } from 'date-fns';
import { pt } from 'date-fns/locale';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
    PayCircleOutlined,
    ProfileOutlined,
    CameraOutlined,
    RightCircleOutlined,
    LeftCircleOutlined,
    UserOutlined,
    CheckOutlined,
    DownloadOutlined,
    CloudDownloadOutlined 
    
  } from '@ant-design/icons';
function Pedidos() {
    const { Search } = Input;
    const history = useHistory();
    const [data,setData]=useState(null);
    const [data_empresa,setData_empresa]=useState(null);
    const { Step } = Steps;
    const [phase1,setPhase1]=useState('sd');
    const [phase2,setPhase2]=useState(null);
    const [text, setText]=useState('https://ant.design/')
    const hoje = new Date();
    const htmlRef = useRef(null);
  
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
      };

      useEffect(()=>{
        axios({
            method:"post",
            url:`${localStorage.getItem('url')}/web/pedidos_empresa/`,
            headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
            data:{id:1}
        }).then(dat=>{ if(dat.status!==200){
            throw Error('Dados de acesso invalidos');  
                }
            return dat
         } ).then( df=>{
            setData(df.data)
          console.log(df.data);
          message.success('dados Carregados com sucesso!');
         
           
          }
       
           ).catch(e=>{
            message.error("Servidor Indisponivel")
          
        })

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
            setData_empresa(df.data)
          console.log(df.data);
          message.success('dados Carregados com sucesso!');
         
           
          }
       
           ).catch(e=>{
            message.error("Servidor Indisponivel")
          
        })
      
    },[])
const atribuir=()=>{
    const pedo = new Date(phase2.data_submisa);
    const dataPorExtenso_submissao = format(pedo, "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt });
    const dataDiminuida = subMonths(pedo, 3);
    const dataPorExtenso_submissao_passdo=format(dataDiminuida, "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt });
    
}
   
const  handleUpload = () => {
    // Get the HTML element
    const html = htmlRef.current;
  
    // Create a new instance of jsPDF
    const pdf = new jsPDF();
  
    // Convert the HTML element to PDF using html2canvas
    html2canvas(html).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0,pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`Quitacao-${data_empresa.nome}.pdf`)
      
  
      // Upload the PDF file to the server using Axios
     
    });
      // Create a FormData object to send the PDF file to the server
      
    };
    const [download,setDownload]=useState(null);
  const handle=(item)=>{
    if (parseInt(item.estado)==2){
        setDownload('wew')
    }

  }
      
  return (
    <div className='comp'>
        <div className='Cabecario'>
                <img  src={require('../images/rep-removebg-preview.png')} />
                <div className='titles'>
                <div className='texto_cabecari'>República De Moçambique</div>
                <div className='texto_cabecari'>Tribunal Supremo</div>
                <div className='texto_cabecari'>Secretaria geral</div>

                </div>
                
        </div>

      <h1 className='nome_empresa'> Pedidos</h1>
    <Space className='espaco'
    align='vertical'
    >
{phase1 && <>
    {data && <>


<List
className='lista_pedidos'
grid={{ gutter: 16, column: 3 }}
dataSource={data}
renderItem={(item) => (
  <List.Item>
    <Card title={'Pedido de Quitação'}><p>
     <text>
     Data de submissão:
        </text> 
        {item.data_submisao}
        </p>
        <p>
            <text>Metodo de Pagamento:</text>
    
        {item.data_submisao}
        </p>
        <p>
            <text>Valor:</text>

        1000
        </p>
        <p>
            <text>estado:</text>
        {item.estado_info}
        </p>

        <Button onClick={()=>{setPhase2(item);handle(item);setPhase1(null)}
    }  >  Ver detalhes</Button>
        </Card>
        
  </List.Item>
)}
/>
</>


}


</>}






  
    </Space>

{phase1  && 
<div className='foot233'>
            
            <Button className='step' onClick={()=>{history.push('/home/Certidoes')}}><LeftCircleOutlined/></Button>
            </div>


 }


    {phase2 && <>
    
        <div className='Resumo_pedido'>
    <div className='passos_pedidos'>
    <Steps current={parseInt(phase2.estado)}>
        
        <Step title="PENDENTE PAGAMENTO" />
       
       <Step title="EM PRODUÇÃO" />
       <Step title="TERMINADO" />
    
      
   
     </Steps>
     </div>
  <div className='lista_pedidoss-s'>
    
    <Card   className='d' title={'Informação do pedido'}><p>
     <text>
     Data de submissão:
        </text> 
        {phase2.data_submisao}
        </p>
        <p>
            <text>Metodo de Pagamento:</text>
    
        {'M-pesa'}
        </p>
        <p>
            <text>Valor:</text>

        1000
        </p>
        <p>
            <text>estado:</text>
        {phase2.estado_info}
        </p>

        </Card>
        
    
    <Card   className='d' title={'Informação da Empresa'}><p>
     <text>
     Nome:
        </text> 
        {data_empresa.nome}
        </p>
        <p>
            <text>Endereco:</text>
    
        {data_empresa.endereco}
        </p>
        <p>
            <text>Nuit:</text>

        {data_empresa.nuit}
        </p>
        <p>
            <text>Atividades:</text>
        {data_empresa.vocacao}
        </p>
        </Card>
        

    



  </div>





  <div className='foot23'>
            
            <Button className='step' onClick={()=>{setPhase1('dsd');setDownload(null);setPhase2(null)}}><LeftCircleOutlined/></Button>
            
            {download && <>
                <Button className='stp' onClick={handleUpload}>Baixar<DownloadOutlined/></Button>
           
            </>}
           
       
  
            </div>

</div>
        <div className='whites' ref={htmlRef}>
        <div className='A4'>
        <img  src={require('../images/rep-removebg-preview.png')} />

        <div>
            <h3> República de Moçambique</h3>
       <h3>Tribunal Judicial da Cidade de Maputo</h3>
       <h3>
Secretaria-Geral
</h3>
        <h3 className='h3numero'>CERTIDÃO N° 4326/{data_empresa.provinvia}/SG/0{phase2.idPedido}</h3>


        </div>
        <div className='body'>
        <p>SEVERINO RICARDO DE CARVALHO, Administrador Judicial do Tribunal Judicial da
Cidade de Maputo</p>
<p>CERTIFICA QUE, compulsando os livros de entrada de acções e papéis diversos existentes nesta Secretaria - Geral, <text>não</text> consta ter dado entrada no período de {format(subMonths(new Date(phase2.data_submisao),3), "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt })} a {format(new Date(phase2.data_submisao), "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt })}, qualquer acção em que a empresa  <text>{data_empresa.nome}</text> , decreta falência ou requer concordata.</p>
<p>É tudo quanto me cumpre certificar em face ao requerimento e do que os referidos livros
reportam.</p>      
       
<p>
Secretaria - Geral do Tribunal Judicial da Cidade de Maputo, aos {format(hoje, "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt })}.


</p>




        </div>
        <div className='infos_09'>
        <text className='a'>
O Administrador Judicial,

</text>
  <img className='sad'  src={require('../images/Papel .png')} />

<text className='a'>Severino Ricardo de Carvalho.</text>


        </div>
            

        
        <div >

        <QRCode className='Qrcode_place' value={`http://localhost:3000/opera/home/documento/${phase2.serialNumber}`} />
        
        </div>
        </div>


        </div>
        

    </>





}







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

export default Pedidos