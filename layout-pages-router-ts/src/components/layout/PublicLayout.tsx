import React, { PropsWithChildren } from 'react'
import PublicNavbar from './PublicNavbar'


const PublicLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <PublicNavbar />
            <div>{children}</div>
        </>
    )
}

export default PublicLayout