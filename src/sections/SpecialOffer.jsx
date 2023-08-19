import React from 'react'
import { offer } from '../assets/images'
import Button from '../components/Button'
import { arrowRight } from '../assets/icons'

const SpecialOffer = () => {
    return (
        <section className='flex items-center gap-10 justify-wrap max-xl:flex-col-reverse max-container '>

            <div className='flex-1'>
                <img
                    src={offer}
                    alt="Offer"
                    width={773}
                    height={687}
                    className='object-contain w-full'
                />
            </div>
            <div className='flex flex-col flex-1'>
                <h2 className='mt-10 text-4xl font-bold capitalize lg:max-w-lg font-palanquin'>
                    <span className='text-coral-red'>Special </span>
                    Offer
                </h2>
                <p className='mt-4 lg:max-w-lg info-text'>
                    Discover stylish Nike arrivals, quality comfort, and innovation for your active lifestyle.
                    Discover stylish Nike arrivals, quality comfort, and innovation for your active lifestyle.
                </p>
                <p className='mt-6 lg:max-w-lg info-text'>
                    Discover stylish Nike arrivals, quality comfort, and innovation for your active lifestyle.
                </p>
                <div className='flex flex-wrap gap-4 mt-11'>
                    <Button
                        label="Shop Now"
                    />
                    <Button
                        label="Learn More"
                        backgroundColor="bg-white"
                        boarderColor="border-slate-gray"
                        textColor="text-slate-gray"
                    />


                </div>

            </div>
        </section>
    )
}

export default SpecialOffer