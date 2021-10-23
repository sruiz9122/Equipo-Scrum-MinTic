import React from 'react'
import Header from 'components/Header.jsx';
import Footer from 'components/Footer.jsx'

const PublicLayout = ({children}) => {
    return (
        <>
        <Header/>
        <main>{children}</main> 
        <Footer/>   
        </>
    )
}

export default PublicLayout
