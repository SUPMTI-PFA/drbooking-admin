import React from 'react'
import { LayoutType } from '@utils/interfaces/Interfaces'
import Navbar from '@components/navbar/NavBar'
import Footer from '@/components/footer/footer'

const Layout: React.FC<LayoutType> = ({ children }) => {

    return (
        <React.Fragment>
            <main className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-1 p-4">
                    {children}
                </div>
                <Footer/>
            </main>
        </React.Fragment>
    )
}

export default Layout