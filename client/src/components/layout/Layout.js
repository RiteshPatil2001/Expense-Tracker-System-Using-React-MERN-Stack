import React, { Children } from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className='content'> {children}</div>
            <Footer />
        </div>
    )
}

export default Layout