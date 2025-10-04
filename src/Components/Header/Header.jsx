import React from 'react'

import "./Header.scss";

export default function Header({children}) {
    return (
        <h1 className="header">{children}</h1>
    )
}
