import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    // header with logo on left and menu on right
    <div className='header'>
      <div className="header-logo">
        <Link href="/">
          {/* <img src="/images/logo.png" alt="logo" /> */}
          the logo
        </Link>
      </div>
      <div className="header-right">
        {isAuthenticated ? <Image src={"/avatar-icon.jpg"} height={30} width={30} alt='' /> : <Button variant='outline-dark' onClick={() => console.log("this does not work!!")}>Get Started</Button>}
      </div>
    </div>
  )
}

export default Header