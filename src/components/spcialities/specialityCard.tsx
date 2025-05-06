import React from 'react'

const SpecialityCard = ({ content }: any) => {
    return (
        <div className='border border-accent rounded-lg overflow-hidden justify-between flex flex-col p-8'>
            <p className='text-xl font-semibold text-accent'>{content}</p>
        </div>
    )
}

export default SpecialityCard