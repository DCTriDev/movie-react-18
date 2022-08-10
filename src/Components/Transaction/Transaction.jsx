import React, {useEffect, useState} from 'react'
import ModalCustom from '../ModalCustom/ModalCustom'
import {ButtonCustom} from '../ButtonCustom/ButtonCustom'
import userService from '../../API/userAPI'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function Transaction(props) {
    const {detailMovie, visible, setVisible, handleShowTransaction} = props
    console.log(detailMovie)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [balance, setBalance] = useState(0)

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
        }, 2000)
    }

    const handleCancel = () => {
        console.log('Clicked cancel button')
        setVisible(false)
    }

    const handleRenderContent = () => {
        if(detailMovie?.price > balance){
            return (
                <div className='flex flex-col items-center justify-between'>
                    <p className='text-center text-[16px] text-text-color-secondary'>You don't have enough money to buy this movie.</p>
                    <ButtonPrimary onClick={() => {
                        history.push('/deposit')
                    }} >Deposit</ButtonPrimary>
                </div>
            )
        }else {
            return (
                <>
                    <p className='text-center text-xl text-text-color-secondary'>You will be charged {detailMovie?.price}$ for this movie.</p>
                    <p className='text-center text-xl text-text-color-secondary'>Are you sure you want to buy this movie?</p>
                </>
            )
        }
    }

    useEffect(() => {
        console.log('helle')
        userService.getAccountBalance()
            .then(res => {
                console.log(res)
                setBalance(res.data.getUserBalanceWithAccessToken.balance)
            })
    }, [])

    return (
        <ModalCustom
            title='Transaction'
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[<ButtonDanger onClick={handleCancel}>Cancel</ButtonDanger>]}
        >
            <h3 className='text-text-color-title'>{detailMovie?.title}</h3>
            <div className='flex px-10 gap-5'>
                <img src={detailMovie?.image} alt='movie image' className='h-52' />
                <div className='grid grid-cols-3 w-full'>
                    <div className='col-span-2'>
                        <p>Account Balance</p>
                        <p>Price</p>
                    </div>
                    <div className='col-span-1 text-right'>
                        <p>{balance}$</p>
                        <p>{detailMovie?.price}$</p>
                    </div>
                    <div className='col-span-3'>
                        {handleRenderContent()}
                    </div>
                </div>
            </div>
        </ModalCustom>
    )
}

export default Transaction
