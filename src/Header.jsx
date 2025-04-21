import React from 'react'
import { Link } from 'react-router'

function Header() {
  return (
    <div>
      <Link to='/'>Home</Link>&nbsp;&nbsp;
      <Link to='/dynamicform'>Dynamic-Form</Link>&nbsp;&nbsp;
    </div>
  )
}

export default Header
