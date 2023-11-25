import React from 'react'
import './estilo.css'
function Header() {
  return (
    <div className='Cabecario'>
    <img  src={require('../images/rep-removebg-preview.png')} />
    <div className='texto_cabecario'>Tribunal Judicial </div>
</div>
  )
}

export default Header