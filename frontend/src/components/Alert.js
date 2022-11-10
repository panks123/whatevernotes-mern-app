import React from 'react'

function Alert(props) {
    
    return (
        <div style={{height: "50px", position: "fixed", width:"100%", top: "0", zIndex: props.alert.zindex}}>
            { (props.alert.msg!== "") && <div className= {`alert alert-${props.alert.type} alert-dismissible fade show text-center`} style={{padding:"7px 0"}} role="alert">
                { props.alert.message }
            </div>}
        </div>
    )
}

export default Alert


