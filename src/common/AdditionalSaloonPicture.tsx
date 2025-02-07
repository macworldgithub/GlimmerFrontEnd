import Image from 'next/image'
import React from 'react'

export const AdditionalSaloonPicture = () => {
    return (
        <div className='w-[99vw] h-max p-5 flex flex-col'>
            <Image src={"/assets/placeholder/image.png"}
                alt={""}
                width={50}
                height={50} />
        </div>
    )
}
