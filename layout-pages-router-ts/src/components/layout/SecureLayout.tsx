import React, { PropsWithChildren } from 'react'



function SecureLayout({ children }: PropsWithChildren) {
    return (
        <div>{children}</div>
    )
}

export default SecureLayout