import tw from 'tailwind-styled-components'
import {Button} from "antd";


const ButtonDefault = tw.button`
    rounded-3xl
    px-4
    py-1.5
    transition-all 
    duration-300 
    text-gray-100
    border-0 
    hover:text-white
    text-lg
`

const ButtonPrimary = tw(ButtonDefault)`
    bg-green-500 
    hover:bg-green-600
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

export const ButtonCustom = {
    ButtonPrimary,
    ButtonSecondary,
    ButtonDanger,
    ButtonSubmit,
}
