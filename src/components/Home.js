import React,{useState} from 'react'
import '../styles/home.css'
import { Input, Space,Card,Button, Checkbox, message,Form} from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined,KeyOutlined } from '@ant-design/icons';

function Home() {
    const { Search } = Input;
    const [details, setDetails] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const history = useHistory();
   
    const handleClick = () => {
      fetch(`${localStorage.getItem("url")}/web/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      })
        .then((data) => {
          if (!data.ok) {
            throw Error("Dados de acesso invalidos");
          }
          return data.json();
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.nome_empresa);
          
          message.success(`Bem vindo(a) ${details.username}`)
          
          console.log(data)
  
          if (data.grupo == "empresa") {
            localStorage.setItem("log", true);
            localStorage.setItem("nivel", "operador");
            history.push("/home/Certidoes");
          }
          if (data.grupo == "tribunal") {
            localStorage.setItem("log", true);
            localStorage.setItem("nivel", "contabilidade");
            history.push("/admin/home/dash");
          }
          if (data.grupo == "operario") {
            localStorage.setItem("log", true);
            localStorage.setItem("nivel", "contabilidade");
            history.push("/opera/home/dash");
          }
          if (data.grupo=="recargatest"){
            localStorage.setItem("log", true);
            localStorage.setItem("nivel", "contabilidade");
            history.push("/test/home");    
        }}
        )
        .catch((e) => {
          setError(e.message);
          message.error('Credenciais invalidas! verifique o nome ou palavra passe')

        });
    };
  
  return (
    <div className='homeclass'>
        {localStorage.setItem("url", "http://127.0.0.1:8000")}
        <div className='Cabecario'>
                <img  src={require('../images/rep-removebg-preview.png')} />
                <div className='texto_cabecario'>Tribunal Supremo de Moçambique</div>
        </div>

    <div className='Login_class'>
    <img  src={require('../images/rep-removebg-preview.png')} />
    <div className='dados'>
    <div className='a'>
      
    <label >Nome de usuário ou endereço do email</label>
      <Input  onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} className='inputs' size="large"  prefix={<UserOutlined />} />
      <label>Senha</label>
      <Input.Password  onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}  className='inputs'   size="large"  prefix={<KeyOutlined />} />
     

    </div>
    <div className='ab'>
      
    <Button size='large' className='bnw' onClick={()=>{handleClick()}}  >Acessar</Button>
      </div>
      <div className='aba'>
      <Button size='large' type="link">
      Perdeu a senha ?
    </Button>

        </div>
    
 
    
    </div>
    <div className='fotn'>Não tem uma conta?  <Button size='large' type="link" onClick={()=>{history.push('/criar_conta')}}>
    Crie aqui.
    </Button></div>



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

export default Home