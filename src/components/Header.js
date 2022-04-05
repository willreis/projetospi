import React from 'react'
import styled from 'styled-components'

const Nav = styled.div`
    background-color: #6DA6DA;
    height: 100px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const DivP = styled.p`
    background-color: #6DA6DA;
    color: #333; 
    font-size: 2.2rem;
    text-shadow: 2px 2px 5px #555;
`

function Header(props) {
    return (
        <div {...props}>
            <Nav>
                <DivP>
                    Torrent
                </DivP>
            </Nav>
        </div>
    )
}

export default Header