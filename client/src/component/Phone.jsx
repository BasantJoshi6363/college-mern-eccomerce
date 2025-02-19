import React from 'react'

const Phone = ({type}) => {
    return (
        <div>
            <div className="top flex items-center gap-3">
                <div className='h-9 rounded-sm w-5 bg-red-500'></div>
                <h4 className='text-sm font-semibold'>{type}</h4>
            </div>
        </div>
    )
}

export default Phone