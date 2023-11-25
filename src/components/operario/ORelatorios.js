import React, { useState,useRef } from 'react';
import { Segmented,Input, Space,Table,Card,Button, message,Tag,List } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './styles/quitacao.css'
import {
  LeftCircleOutlined, 
  SearchOutlined,
  } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
function ORelatorios() {
  const history=useHistory();
  const [value, setValue] = useState();
  const [registar,setRegistar]=useState(null);
  const [searchText, setSearchText] = useState('');
  const [pesquisar,setPesquisar]=useState(null)
  const [historico,setHistorico]=useState(null)
  const [lista,setLista]=useState(null);  
  const searchInput = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [fase1,setFase1]=useState(true)
  const [fase2,setFase2]=useState(null)
  const [phase1,setPhase1]=useState('ds');
  const { TextArea } = Input;
  const [phase2,setPhase2]=useState(null);
  const [text,setText]=useState('')
const [data_empresa,setDadosEmpresa]=useState(null);
  const nao_tem_nenhum=(id)=>{
    axios({
      method:"post",
      url:`${localStorage.getItem('url')}/web/Nao_tem_nenhum/`,
      headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
      data:{idpedido:id}
  }).then(dat=>{ if(dat.status!==200){
      throw Error('Dados de acesso invalidos');  
          }
      return dat
   } ).then( d=>{
    message.success("Nao possui")
     history.push('/procura/home/dash')
   }  
 
     ).catch(e=>{
      message.error("Registrado sem sucesso!")
  })

  }
  const Empresas_lista=()=>{

    axios({
      method:"post",
      url:`${localStorage.getItem('url')}/web/Arquivo_Gestao/`,
      headers:{'Authorization':`token ${localStorage.getItem('token')}`,'Content-Type':'application/json' },
      data:{id:1}
  }).then(dat=>{ if(dat.status!==200){
      throw Error('Dados de acesso invalidos');  
          }
      return dat
   } ).then( d=>{
      setLista(d.data);
   }  
 
     ).catch(e=>{
      message.error("Registrado sem sucesso!")
  })
  }
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
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
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('sds');
  };
  const Search_empresa=(df)=>{
   
    const phase3=phase2
    axios({
        method: "post",
        url: `${localStorage.getItem('url')}/web/Pesquisar_empresa_funcionario/`,
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
        setFase2(true);
      
      }
  
      ).catch(e => {
        console.log(df)
        message.error('Servidor indisponivel')
      })

  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Id',
      dataIndex: 'idPedido',
      key: 'idEscola',
      render: (text) =>   <a  >{text }</a>,
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
        dataIndex: 'provinvia',
        key: 'provinvia',
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
        title: 'NUIT',
        key: 'nuit',
        dataIndex: 'nuit',
        
      },
      {
        title: 'Estado',
        key: 'estado_info',
        dataIndex: 'estado_info',
        render: (_, { estado_info }) => (
            <Tag color='green'>
          Ativo
        </Tag>
          ),
      },
      {
        title: 'accao',
        key: 'idEmpresa',
        dataIndex: 'idEmpresa',
        render: (text) => <div className='df_ck'>
        <a onClick={()=>{setFase1(null);Search_empresa(text);Pesquisar_empresa_antecendetes(text)}}>Registar</a>
       
        </div>,
      },
      {
        title: '',
        dataIndex: 'idPedido',
        key: 'idPedido',
        render: (text) =>    <Tag color='green' className='aquela_cena' onClick={()=>{nao_tem_nenhum(text)}}>
        Nao possui nenhum Registro No arquivo
      </Tag>,
      },
      
    
  
  ];
  const columns_s: ColumnsType<DataType> = [
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
        dataIndex: 'provinvia',
        key: 'provinvia',
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
        title: 'NUIT',
        key: 'nuit',
        dataIndex: 'nuit',
        
      },
      {
        title: 'Estado',
        key: 'estado_info',
        dataIndex: 'estado_info',
        render: (_, { estado_info }) => (
            <Tag color='green'>
          Ativo
        </Tag>
          ),
      },
      {
        title: 'accao',
        key: 'idEmpresa',
        dataIndex: 'idEmpresa',
        render: (text) => <a onClick={()=>{setFase1(null);Search_empresa(text);Pesquisar_empresa_antecendetes(text)}}>Visualizar</a>,
      },
     
      
    
  
  ];
  const RegistarOcorrencia=()=>{
    axios({
      method: "post",
      url: `${localStorage.getItem('url')}/web/Registar_ocorrencia/`,
      headers: { 'Authorization': `token ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' },
      data: { Empresa:data_empresa.idEmpresa,texto: text}
    }).then(dat => {
      if (dat.status !== 200) {
        throw Error('Dados de acesso invalidos');
      }
      return dat
    }).then(d => {
      message.success('Ocorrencia Registrada com Sucesso!')
      
      setFase1('er');
      setFase2(null);
    
    }

    ).catch(e => {
   
      message.error('Servidor indisponivel')
    })
  }
  const Pesquisar_empresa_antecendetes=(df)=>{
    
    axios({
      method: "post",
      url: `${localStorage.getItem('url')}/web/Pesquisar_Antecedentes_Empresa/`,
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
      setFase2(true);
    
    }

    ).catch(e => {
      message.error('Servidor indisponivel')
    })
  }

  const handleSegmentChange = (newValue: string | number) => {
    setValue(newValue);
    if (newValue==='Registrar Antecedentes'){
        setRegistar(true);
        setPesquisar(null);
        setHistorico(null)
        Empresas_lista();
    }
    if (newValue==='Pesquisar Antecedentes'){
      setRegistar(null);
      setPesquisar(true);
      setHistorico(null)
  }
  if (newValue==='Histórico de Requisições'){
    setRegistar(null);
    setPesquisar(null);
    setHistorico(true)
}
  };
  const onSearch = (value: string) => {
    setText(value.target.value);
}

  return (
    <div>
      <Segmented
        options={['Registrar Antecedentes', 'Pesquisar Antecedentes']}
        value={value}
        onChange={handleSegmentChange}
      />
      {registar &&
       <>
        {lista && <>
     
     {fase1 &&     <Table columns={columns}  onChange={onChange}  dataSource={lista}     pagination={{
       
       pageSize: 4,
       
     }} />}
     {fase1 &&      <div className='foot2'>
        
        <Button className='step' onClick={()=>{history.push('/procura/home/dash')}}><LeftCircleOutlined/></Button>
        </div>}

     {fase2 && <>
      <div className='lista_pedidoss-s'>
    
  
        
    
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

  <div className='campo'>
  <TextArea showCount rows={5} onChange={onSearch}   placeholder="Observacoes comprimento máximo são 50 caracteres" maxLength={50} />

  </div>
  <div className='camposq'>
  <Button className='reprovar' onClick={()=>{setFase1(true);setFase2(null)}}  type="primary" danger>Cancelar</Button>
      
  <Button  className='aprovar' onClick={RegistarOcorrencia} type="primary"  >Registar</Button>
  
  </div>
     
     
     </>}


        </>}
      </>
      }
      {pesquisar &&    <>
        {lista && <>
     
     {fase1 &&     <Table columns={columns_s}  onChange={onChange}  dataSource={lista}     pagination={{
       
       pageSize: 4,
       
     }} />}
      {fase1 &&      <div className='foot2'>
        
        <Button className='step' onClick={()=>{history.push('/procura/home/dash')}}><LeftCircleOutlined/></Button>
        </div>}

     {fase2 && <>
      <div className='lista_pedidoss-s'>
    
  
        
    
      <List
className='lista_pedidos'
grid={{ gutter: 16, column: 3 }}
dataSource={data_empresa.lista}
renderItem={(item) => (
  <List.Item>
    <Card ><p>
     <text>
     Penalidade Cometida:
        </text> 
        {item.info}
        </p>
        <p>
            <text>Data de submissão:</text>
    
        {item.data_submisao}
        </p>
 
        </Card>
        
  </List.Item>
)}
/>
        
  
    
  
  
  
  </div>


  <div className='camposq'>
  <Button className='reprovar' onClick={()=>{setFase1(true);setFase2(null)}}  type="primary" danger>Cancelar</Button>
      
  <Button  className='aprovar' onClick={RegistarOcorrencia} type="primary"  >Registar</Button>
  
  </div>
     
     
     </>}


        </>}
      </>}




    </div>
  );
}

export default ORelatorios;
