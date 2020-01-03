import React from 'react'

const Errors = ({error}) => {
    return (
        <div className='col s6 l3 offset-l4 valign-wrapper card-panel  red lighten-1' style={{height: "50px"}}>
            <div className='center-align' style={{
                width: '100%',
                fontFamily: 'Courier Prime  monospace',
                fontSize: '18px',
                fontWeight: 'bold'
            }}>
                {error}
            </div>
        </div>
        )
}

export default Errors