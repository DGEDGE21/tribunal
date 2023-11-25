import React from 'react'
import './estilo.css'
function Footer() {
  return (
    <div className='footera'>
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
   
    </div>
     
  )
}

export default Footer