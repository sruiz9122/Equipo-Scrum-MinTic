import Footer from 'components/Footer.jsx'
import Header from 'components/Header.jsx'
import React from 'react'

const PublicLayout = ({children}) => {
    return (
        <div>
            <Header/>
            <main className="h-full overflow-y-scroll">{children}</main>
            <Footer/>
        </div>
    )
}

export default PublicLayout