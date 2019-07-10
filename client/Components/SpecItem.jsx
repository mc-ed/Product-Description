import React from 'react'
import checks from '../styles/checks.less'

function SpecItem(props) {
    let { title, spec } = props.spec
    console.log(typeof spec, spec)
    if(typeof spec === 'number') {
        spec = spec === 1 ? (<td className={`checks.checkMark`}></td>) : (<td className={`checks.crossMark`}></td>)
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
