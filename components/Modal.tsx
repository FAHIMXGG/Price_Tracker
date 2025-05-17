"use client"
import React, { FormEvent } from 'react';
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Image from 'next/image';
import { addUserEmailToProduct } from '@/lib/actions';
 
interface Props {
    productId: string
}

const Modal = ({productId} : Props) => {
    let [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        await addUserEmailToProduct(productId, email)

        setIsSubmitting(false)
        setEmail('')
        close()
    }
    
    // const openModal = () => setIsOpen(true)
    // const closeModal = () => setIsOpen(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    return (
        <>
            <button type='button' className='btn' onClick={open}>
                Track
            </button>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-blue flex justify-between">
                                <Image
                                    src="/assets/icons/logo.svg"
                                    alt='logo'
                                    width={28}
                                    height={28}
                                />
                                <Image
                                    src="/assets/icons/x-close.svg"
                                    alt='close'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer'
                                    onClick={close}
                                />
                            </DialogTitle>
                            <p className="mt-2 text-md font-semibold text-black">
                                Stay updated with product pricing alerts and right in your inbox!
                            </p>
                            <p className='text-sm text-gray-400 mt-2'>
                                Never miss a bargain again with our timely alerts!
                            </p>

                            <form action="" className='flex flex-col mt-5' onSubmit={handleSubmit}>
                                <label htmlFor="emil" className='text-sm font-medium text-gray-700'>
                                    Email address
                                </label>
                                <div className='dialog-input_container'>
                                    <Image
                                        src="/assets/icons/mail.svg"
                                        alt='mail'
                                        width={18}
                                        height={18}
                                    />
                                    <input 
                                    required
                                    type="email" 
                                    name="" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='dialog-input bg-transparent'
                                    placeholder='Enter your email address'
                                    />
                                </div>
                                <button type='submit' className='dialog-btn'>
                                    {isSubmitting ? 'Submitting...' : 'Track'}
                                </button>
                            </form>

                            {/* <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={close}
                                >
                                    Got it, thanks!
                                </Button>
                            </div> */}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default Modal;