import React,{useState,useRef,useEffect} from 'react'
import './styles/certi.css'
import axios from 'axios';
import { Input, Space,Table,Card,Button,Select, message} from 'antd';
import { Segmented,Avatar } from 'antd';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import {
   
    FieldTimeOutlined,
    LeftCircleOutlined,
    SearchOutlined,
    LogoutOutlined,UserOutlined
  } from '@ant-design/icons';
  import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme,Alert,Tag } from 'antd';
import { set } from 'date-fns';
import { tr } from 'date-fns/locale';
  
  
function OPedidos() {
    const { Search } = Input;
    const history = useHistory();
    const { Header, Content, Footer, Sider } = Layout;
    const [error, setError] = useState();
    const [lista,setLista]=useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading,setLoading]=useState(21);
    const [text,setText]=useState('')
    const searchInput = useRef(null);
    const [phase1,setPhase1]=useState('ds');
    const { TextArea } = Input;
    const [phase2,setPhase2]=useState(null);
    const [data_empresa,setDadosEmpresa]=useState(null);
    const [usuario,setUsuario] = useState(13);
    const [pedido,setPedido] = useState(13);
    const [review,setReview]=useState(null);
    const [review2,setReview2]=useState(null);
    const onChangepay: SegmentedProps['onChange']=(value:string)=>{
        console.log(value)
  setUsuario(parseInt(value));
 
}
  const Search_empresa=(df)=>{
   
    const phase3=phase2
    axios({
        method: "post",
        url: `${localStorage.getItem('url')}/web/Pesquisar_empresa/`,
        headers: { 'Authorization': `token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
        data: { casa: df }
      }).then(dat => {
        if (dat.status !== 200) {
          throw Error('Dados de acesso invalidos');
        }
        return dat
      }).then(d => {
        message.success('Carregado com sucesso')
        setDadosEmpresa(d.data);
        if (d.data.assinalado_er==="0"){
              setReview2(null)
              setReview(true)
        }else{
          setReview(null)
          setReview2(true)
        }
      
      }
  
      ).catch(e => {
        console.log(df)
        message.error('Servidor indisponivel')
      })

  }

  const Submter_ao_arquivo=()=>{
    axios({
      method: "post",
      url: `${localStorage.getItem('url')}/web/Assinalar_Funcionario/`,
      headers: { 'Authorization': `token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
      data: { idPedido: pedido ,idUsuario:usuario }
    }).then(dat => {
      if (dat.status !== 200) {
        throw Error('Dados de acesso invalidos');
      }
      return dat
    }).then(d => {
      message.success('Carregado com sucesso')
      history.push('/opera/home/dash')
    
    }

    ).catch(e => {
      
      message.error('Servidor indisponivel')
    })

  }
  const NQuitar_Empresa=()=>{
    const phase3=phase2
        axios({
            method: "post",
            url: `${localStorage.getItem('url')}/web/Quitar_empresa_Chumbar/`,
            headers: { 'Authorization': `token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
            data: { casa: data_empresa.idPedido,text_anotacoes  :text }
          }).then(dat => {
            if (dat.status !== 200) {
              throw Error('Dados de acesso invalidos');
            }
            return dat
          }).then(d => {
            message.success('Empresa quitada com sucesso!!')
           setPhase2(null);
           history.push('/opera/home/dash')
          
          }
      
          ).catch(e => {
            
            message.error('Servidor indisponivel')
          })
    
    

  }
  const Quitar_Empresa=()=>{
        const phase3=phase2
        axios({
            method: "post",
            url: `${localStorage.getItem('url')}/web/Quitar_empresa_Rever/`,
            headers: { 'Authorization': `token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
            data: { casa: data_empresa.idPedido,text_anotacoes  :text }
          }).then(dat => {
            if (dat.status !== 200) {
              throw Error('Dados de acesso invalidos');
            }
            return dat
          }).then(d => {
            message.success('Empresa quitada com sucesso!!')
           setPhase2(null);
           history.push('/opera/home/dash');
          
          }
      
          ).catch(e => {
            
            message.error('Servidor indisponivel')
          })
    
     
  }
  
  useEffect(() => {
        axios({
            method: "post",
            url: `${localStorage.getItem('url')}/web/Todos_pedidos_empresa_por_rever/`,
            headers: { 'Authorization': `token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
            data: { text_anotacoes: "sds" }
          }).then(dat => {
            if (dat.status !== 200) {
              throw Error('Dados de acesso invalidos');
            }
            return dat
          }).then(d => {
            message.success('Carregado com sucesso')
            console.log(d.data)
            setLoading(null)
            setLista(d.data);
          
          }
      
          ).catch(e => {
            
            message.success('Servidor indisponivel')
          })
          
       
      }, [])
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
      
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const getColumnSearchProps = (dataIndex) => {
    
      
        const handleSearch = (selectedKeys, confirm, dataIndex) => {
          confirm();
          setSearchText(selectedKeys[0]);
          setSearchedColumn(dataIndex);
        };
      
        return {
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
              <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Search
                </Button>
                <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                  Reset
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    confirm({ closeDropdown: false });
                    setSearchText(selectedKeys[0]);
                    setSearchedColumn(dataIndex);
                  }}
                >
                  Filter
                </Button>
                <Button type="link" size="small" onClick={confirm}>
                  Close
                </Button>
              </Space>
            </div>
          ),
          filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
          onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => searchInput.current.select(), 100);
            }
          },
          render: (text) =>
            searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
              />
            ) : (
              text
            ),
        };
      };

    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
      }
      
      const columns: ColumnsType<DataType> = [
        {
          title: 'Id',
          dataIndex: 'idPedido',
          key: 'idEscola',
          render: (text) => <a >{text}</a>,
        },
        {
          title: 'Empresa',
          dataIndex: 'nome',
          key: 'nome',
          ...getColumnSearchProps('nome'),
        },
        {
          title: 'Localizaçao',
          dataIndex: 'endereco',
          key: 'localizacao',
         
         
        },
        {
            title: 'Província',
            dataIndex: 'provincia',
            key: 'provincia',
            filters: [
                {
                  text: 'Maputo',
                  value: 'Maputo',
                },
                {
                    text: 'Matola',
                    value: 'Matola',
                  },
                {
                  text: 'Gaza',
                  value: 'Gaza',
                },
                {
                    text: 'Inhambane',
                    value: 'Inhambane',
                  },
                  {
                    text: 'Sofala',
                    value: 'Sofala',
                  },

               ,
                  {
                    text: 'Manica',
                    value: 'Manica',
                  },
                  
                  {
                    text: 'Tete',
                    value: 'Tete',
                  },
                  {
                    text: 'Zambézia',
                    value: 'Zambézia',
                  },

                  {
                    text: 'Nampula',
                    value: 'Nampula',
                  },
                  
                  {
                    text: 'Cabo Delgado',
                    value: 'Cabo Delgado',

                  },
                  {
                    text: 'Niassa',
                    value: 'Niassa',
                    
                  },

                
              
                  
                  







              ],
              onFilter: (value: string, record) => record.provincia.indexOf(value)===0,
          }
        ,    
       
        {
            title: 'Data de Submissao',
            key: 'data_submisao',
            dataIndex: 'data_submisao',
            
          },
          {
            title: 'NUIT',
            key: 'nuit',
            dataIndex: 'nuit',
            
          },
          {
            title: 'Estado',
            key: 'info',
            dataIndex: 'info',
            render: (_, { info,color }) => (
                <Tag color={color}>
              {info}
            </Tag>
              ),
          },
          {
            title: 'accao',
            key: 'idPedido',
            dataIndex: 'idPedido',
            render: (text) => <a onClick={()=>{setPhase2(`${text}`);setPedido(text);setPhase1(null);Search_empresa(text)}}>Processar</a>,
          },
         
          
        
      
      ];
      

      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('sds');
      };


  
    type MenuItem = Required<MenuProps>['items'][number];
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
      ): MenuItem {
        return {
          key,
          label,
          icon,
          children,
        };
      }
      
      const items: MenuItem[] = [
          
        getItem('submissoes', '9.1', <
        FieldTimeOutlined />, [
          getItem('pendentes','9.2',<FieldTimeOutlined />),
          getItem('Rejeitadas', '9.3'),
          getItem('Arquivadas', '9.4'),
        ]),
        
       
        
        
       
      ];
      const [collapsed, setCollapsed] = useState(false);
      const [pagina,setPagina]=useState("home")
      const {
        token: { colorBgContainer },
      } = theme.useToken();
    
      const handleClick = (e) => {
        console.log('Clicked: ', e.key);
        if(e.key =="1"){
          setPagina("Captação de Dados")
            history.push("/admin/home/Captacao_dados")
           
        }
        if(e.key=="2"){
          setPagina("Lista das Escolas")
          history.push("/admin/home/lista_escolas")
    
        }
        if(e.key=="8"){
          setPagina("Registar Escola")
          history.push("/admin/home/registrar_escolas")
    
        }
    
    
        if(e.key=="7"){
          setPagina("Pesquisar Escola")
          history.push("/admin/home/Pesquisa_escola")
    
        }
        if(e.key=="3"){
          setPagina("Pesquisar Escola")
          history.push("/admin/home/Pesquisa_escola")
    
        }
    
    
    
    
      }
    
      const onSearch = (value: string) => {
          setText(value.target.value);
      }

            
  return (
    <div>
      
      <div >
    
    {phase1 && <>
        <Table columns={columns}  onChange={onChange}  dataSource={lista}     pagination={{
       
       pageSize: 4,
       
     }} />

    </>}

    {phase2 && <div >
  
  {data_empresa && 
  <div >
    
    <div className='lista_pedidoss-s'>
    
    <Card  style={{marginLeft:'6.5%'}}  className='d' title={'Informação do pedido'}><p>
     <text>
     Data de submissão:
        </text> 
        {data_empresa.data_submisao}
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
        {data_empresa.estado_info}
        </p>
      
        </Card>
        
    
    <Card  style={{marginLeft:'6.7%'}}  className='d' title={'Informação da Empresa'}><p>
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
            <text>Vocacao:</text>
        {data_empresa.vocacao}
        </p>
     
  
        </Card>
        
  
    
  
  
  
  </div>

   {review2 && <>
    <div className='campo'>
  <TextArea showCount rows={5} onChange={onSearch} placeholder="Observacoes comprimento máximo são 50 caracteres" maxLength={50} />

  </div>
  
  
  <div className='camposq'>
  <Button className='reprovar' onClick={NQuitar_Empresa} type="primary" danger>Reprovar</Button>
      
  <Button  className='aprovar' onClick={Quitar_Empresa} type="primary"  >submeter à aprovação</Button>
  
  </div>
  
   </>  
  
  }
 {review && <>
  <div className='top_info'>Assinale um Funcionário para rever o Arquivo </div>
  <Space className='klsa'   direction="vertical">
    <Segmented
    onChange={setUsuario}
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              
              <Avatar  shape="square" size={64} icon={<UserOutlined />}  />
              <div>Antonio Marcos</div>
            </div>
          ),
          value: 13,
        },
        {
          label: (
            <div style={{ padding: 4 }}>
                <Avatar  shape="square" size={64} icon={<UserOutlined />}  />
              <div>Ribeiro Tembe</div>
            </div>
          ),
          value: 14,
        },
     
      
      ]}
    />
 
  </Space>
  <div className='camposq'>

      
  <Button  className='aprovar' onClick={()=>{Submter_ao_arquivo()}} type="primary"  >submeter</Button>
  
  </div>
  
 </>}
 
  
  


  </div>






  }
  
    
    </div>}

    
{phase1 &&      <div className='foot2'>
        
        <Button className='step' onClick={()=>{history.push('/opera/home/dash')}}><LeftCircleOutlined/></Button>
        </div>}
        {phase2 &&      <div className='foot2'>
        
        <Button className='step' onClick={()=>{setPhase2(null);setPhase1('sd')}}><LeftCircleOutlined/></Button>
        </div>}
     
          </div>
    

    </div>
  )
}

export default OPedidos