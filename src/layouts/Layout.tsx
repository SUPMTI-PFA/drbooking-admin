import React from 'react'
import { LayoutType } from '@utils/interfaces/Interfaces'
import Navbar from '@components/navbar/NavBar'

const Layout: React.FC<LayoutType> = ({ children }) => {

    return (
        <React.Fragment>
            <main>
                <Navbar />
                {children}
            </main>
        </React.Fragment>
    )
}

export default Layout