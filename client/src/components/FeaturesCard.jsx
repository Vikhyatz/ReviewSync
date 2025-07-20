import React from 'react'

const FeaturesCard = ({icon, head, subHead, hoverColor}) => {
    return (
        <div className="p-4 lg:w-1/3">
            <div className={`h-full bg-gray-800 shadow-xl hover:bg-${hoverColor} shadow-blue-950 hover:shadow-2xl bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative animation-all duration-150 hover:scale-105`}>
                <div className="flex justify-center items-center  mb-5">
                    {icon}
                </div>

                <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">{head}</h1>
                <p className="leading-relaxed mb-3">{subHead}</p>
            </div>
        </div>
    )
}

export default FeaturesCard