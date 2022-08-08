import React from 'react'

function Footer(props) {
    return (
        <div className='w-full py-3 px-8 text-text-color-description bg-black'>
            <div className='copyright flex justify-between items-center '>
                <div>Copyright © 2022 All Rights Reserved by <span className='text-text-color-secondary'>49BigBox</span></div>
                <div className='text-3xl space-x-2'>
                    <a href='https://www.facebook.com/no.bodys.009' className='text-[#444444] hover:text-[#4267B2]'>
                        <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                    <a href='https://www.youtube.com/channel/UCcUWN04I6NddvHOrbQuLWPQ' className='text-[#444444] hover:text-[#FF0000]'>
                        <ion-icon name="logo-youtube"></ion-icon>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
