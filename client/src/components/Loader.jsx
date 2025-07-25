import React from 'react'

export const Loader = () => {
    return (
        <div className="flex items-center justify-center bg-[#1C1F26] h-screen w-full">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    )
}
