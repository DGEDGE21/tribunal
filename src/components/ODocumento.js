
import { useParams } from 'react-router-dom';
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

function ODocumento() {
    const { id } = useParams();
    const [dados,setDados]=useState(null)
    const hoje = new Date();
    const htmlRef = useRef(null);
    const [dados1,setDados1]=useState('ds');
    useEffect(()=>{
      axios({
        method:"post",
        url:`${localStorage.getItem('url')}/web/get_quitacao/`,
        headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
        data:{serialNumber:id}
    }).then(dat=>{ if(dat.status!==200){
        throw Error('Dados de acesso invalidos');  
            }
        return dat
     } ).then( df=>{
      setDados(df.data);
      console.log(df.data);
      message.success('dados Carregados com sucesso!');
      setDados1(null)
     
       
      }
   
       ).catch(e=>{
        message.error("Servidor Indisponivel")
      
    })





  },[])
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
      pdf.save(`Quitacao-${dados.nome}.pdf`)
      
  
      // Upload the PDF file to the server using Axios
     
    });
      // Create a FormData object to send the PDF file to the server
      
    };

  return (
    <div>
      
      
        {dados &&  <>
          <div className='Cabecario'>
                <img  src={require('../images/rep-removebg-preview.png')} />
                <div className='texto_cabecario'>Tribunal Supremo de Moçambique</div>
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
           <h3 className='h3numero'>CERTIDÃO N° 4326/{dados.provinvia}/SG/0{dados.idPedido}</h3>
   
   
           </div>
           <div className='body'>
           <p>SEVERINO RICARDO DE CARVALHO, Administrador Judicial do Tribunal Judicial da
   Cidade de Maputo</p>
   <p>CERTIFICA QUE, compulsando os livros de entrada de acções e papéis diversos existentes nesta Secretaria - Geral, <text>não</text> consta ter dado entrada no período de {format(subMonths(new Date(dados.data_emissao),3), "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt })} a {format(new Date(dados.data_emissao), "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt })}, qualquer acção em que a empresa  <text>{dados.nome}</text> , decreta falência ou requer concordata.</p>
   <p>É tudo quanto me cumpre certificar em face ao requerimento e do que os referidos livros
   reportam.</p>      
          
   <p>
   Secretaria - Geral do Tribunal Judicial da Cidade de Maputo, aos {format(new Date(dados.data_emissao), "dd 'do mês de' MMMM 'do ano de' yyyy", { locale: pt })}.
   
   
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
   
           <QRCode className='Qrcode_place' value={dados.serialNumber} />
           
           </div>
           </div>
   
   
           </div>
           <div className='lista_pedidoss-s'>
    
    <Card   className='d' title={'Certidao de Quitacao'}><p>
     <text>
     Data de Emissao:
        </text> 
        {dados.data_emissao}
        </p>
        <p>
            <text>Data de Expiracao:</text>
    
        {dados.data_expiracao}
        </p>
        <p>
            <text>Numero de Serie:</text>

        {dados.serialNumber}
        </p>
        

        </Card>
        
    
    <Card   className='d' title={'Informação da Empresa'}><p>
     <text>
     Nome:
        </text> 
        {dados.nome}
        </p>
        <p>
            <text>Endereco:</text>
    
        {dados.endereco}
        </p>
        <p>
            <text>Nuit:</text>

        {dados.nuit}
        </p>
        <p>
            <text>Atividades:</text>
        {dados.vocacao}
        </p>
        </Card>
        

    



  </div>





  <div className='foot23'>
            
            
                <Button className='stps' onClick={handleUpload}>Baixar<DownloadOutlined/></Button>
           
        
           
       
  
            </div>


   <div className='sdsd112'>

   </div>
        
        </>}
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

export default ODocumento