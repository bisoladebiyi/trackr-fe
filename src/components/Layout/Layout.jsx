import React from 'react'
import SideNav from './SideNav'

const Layout = ({pageName, children}) => {
  return (
    <div className='h-full flex'>
        <SideNav pageName={pageName} />
        <div className='w-full h-full overflow-auto'>
            <nav className='p-4 bg-white border border-gray-100 w-full text-xl font-semibold text-gray-800'>{pageName}</nav>
            <main className='p-4 h-lvh'>{children}</main>
        </div>
    </div>
  )
}

export default Layout 