import { useEffect, useState } from 'react'

import { MAX_WIDTH_MOBILE } from '@config/device.config'

function useDevice() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth>=MAX_WIDTH_MOBILE)

  const handleResize = () => {
    if(window.innerWidth>=MAX_WIDTH_MOBILE){
      setIsDesktop(true)
    }else {
      setIsDesktop(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth])

  return isDesktop
}

export default useDevice
