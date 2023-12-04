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
          localStorage.setItem("status_", true);
          
          message.success(`Bem vindo(a) ${details.username}`)
          
          
          if (data.grupo == "empresa") {
            localStorage.setItem("log", true);
            localStorage.setItem("nivel", "operador");
            history.push("/home/Certidoes");
          }
          if (data.grupo == "arquivo") {
            localStorage.setItem("log", true);
            localStorage.setItem("nivel", "operador");
            history.push("/procura/home/dash");
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
        {localStorage.setItem("url", "http://10.0.255.37:8000")
       
        }
       
    <div className='Login_class'>
    <div className='dados'>
    <div className='a'>
      
    <label >Nome de usuário ou endereço do email</label>
      <Input  style={{ width: '80%'}} onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} className='inputs' size="large"  prefix={<UserOutlined />} />
      <label>Senha</label>
      <Input.Password  style={{ width: '80%'}}  onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}  className='inputs'   size="large"  prefix={<KeyOutlined />} />
     

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
        
    


    </div>
  )
}

export default Home