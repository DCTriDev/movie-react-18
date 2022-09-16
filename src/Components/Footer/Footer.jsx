import React from 'react'

function Footer(props) {
    return (
        <div className='w-full lg:py-3 md:py-2 py-1 lg:px-8 px-2 text-text-color-description bg-black'>
            <div className='copyright flex justify-between items-center '>
                <div className='lg:text-[14px] md:text-[13px] text-[12px]'>
                    <span>Copyright © 2022 <br /> All Rights Reserved by </span>
                    <span className='text-text-color-secondary'>49BigBox</span>
                </div>
                <div className='text-3xl space-x-2 flex justify-between items-center'>
                    <a href='https://www.facebook.com/no.bodys.009'
                       className='flex justify-between items-center lg:text-[#444444] text-[#4267B2] hover:text-[#4267B2]'
                    >
                        <ion-icon name='logo-facebook'></ion-icon>
                    </a>
                    <a href='https://www.youtube.com/channel/UCcUWN04I6NddvHOrbQuLWPQ'
                       className='flex justify-between items-center lg:text-[#444444] text-[#FF0000] hover:text-[#FF0000]'
                    >
                        <ion-icon name='logo-youtube'></ion-icon>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
