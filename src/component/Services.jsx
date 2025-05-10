import React from 'react'

function  Service(props){
    return(
        <div>
            <span>{props.service}</span>            
        </div>
    )
}

function Services(props) {
    return (
        <div>
            {
                props?.services.map(service => <Service service={service}/>)
            }
        </div>
    )
}

export default Services;
