import tw from 'tailwind-styled-components'
import { Button } from 'antd'


const ButtonDefault = tw.button`
    rounded-3xl
    lg:px-4
    px-2.5
    py-1.5
    transition-all 
    duration-300 
    text-gray-100
    border-0 
    hover:text-white
    lg:text-lg
    md:text-[15px]
    text-[14px]
    cursor-pointer
`

const ButtonPrimary = tw(ButtonDefault)`
    bg-btn-primary 
    hover:bg-btn-primary-hover
`
const ButtonSecondary = tw(ButtonDefault)`
    bg-blue-500
    hover:bg-blue-600
`

const ButtonDanger = tw(ButtonDefault)`
    bg-red-500
    hover:bg-red-600
`

const ButtonSubmit = tw(Button)`
    rounded-3xl
    px-4
    py-1.5
    transition-all 
    duration-300 
    text-gray-100
    border-0 
    hover:text-white
    bg-green-500 
    hover:bg-green-600
    text-lg
`

const ButtonSquare = tw.button`
    lg:rounded-2xl
    rounded-lg
    bg-[#333]
    cursor-pointer
    transition-all
    duration-300
    text-[#dee4e9]
    lg:w-16
    md:w-12
    w-10
    lg:h-16
    md:h-12
    h-10
    border-[1px]
    border-solid
    lg:text-lg
    md:text-[13px]
    text-[10px]
`

export {
  ButtonPrimary,
  ButtonSecondary,
  ButtonDanger,
  ButtonSubmit,
  ButtonSquare,
}
