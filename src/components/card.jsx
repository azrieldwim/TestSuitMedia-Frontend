import React from 'react'

const card = ({ imageUrl, date, title}) => {
  return (
    <div className="w-60 h-[23rem] bg-white rounded-xl drop-shadow-xl">
        <div className="rounded-t-xl overflow-hidden">
            <img src={imageUrl} alt="card" className="w-full h-48 object-cover" />
        </div>
        <div className="px-6 py-5">
            <h6 className="text-gray-600 text-sm">{date}</h6>
            <h3 className="font-black text-xl mb-2">{title}</h3>
        </div>
    </div>
  )
}

export default card