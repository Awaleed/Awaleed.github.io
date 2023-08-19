import React from 'react'
import Button from '../components/Button'

const Supsctipe = () => {
    return (
        <section
            className='flex items-center justify-between gap-10 max-container max-lg:flex-col'
            id='contact-us'
        >
            <h3 className='  text-4xl leading-[68px] lg:max-w-[50%] font-palanquin font-bold'>
                Sign Up form
                <span className='text-coral-red'> Updates </span>
                & Newsletter
            </h3>
            <div className='lg:max-w-[50%] w-full items-center flex max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full'>
                <input
                    type="text"
                    placeholder='Enter your email address'
                    className='input'
                />
                <div className='flex items-center max-sm:justify-end max-sm:w-full'>
                    <Button
                        label="Sign Up"
                        fullWidth
                    />
                </div>
            </div>
        </section>
    )
}

export default Supsctipe