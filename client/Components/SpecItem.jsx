import React from 'react'

function SpecItem(props) {
    let { title, spec } = props.spec
    if(typeof spec === 'number') {
        spec = spec === 1 ? (<td className='checkMark'></td>) : (<td className='crossMark'></td>)
    } else {
        spec = <td>{ spec }</td>
    }
    
    return (
             <tr>
                <th className="bg-light font-weight-bold" scope="row">
                    { title }
                </th>
                { spec }
            </tr>
    )
}

export default SpecItem
