import React from 'react'

export default function Badge({ item, className }) {
    return (
        <div className={"badge badge--" + (item.type.toLowerCase()) + " " + (className ? className : "")}>{item.type}</div>
    )
}
