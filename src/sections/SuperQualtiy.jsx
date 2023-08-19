import { arrowRight } from '../assets/icons'
import { shoe8 } from '../assets/images'
import Button from '../components/Button'

const SuperQualtiy = () => {
    return (
        <section id='about-us' className='flex items-center justify-between w-full gap-10 max-lg:flex-col max-container'>
            <div className='flex flex-col flex-1'>
                <h2 className='mt-10 text-4xl font-bold capitalize lg:max-w-lg font-palanquin'>
                    We Provide
                    <span className='text-coral-red'> Super </span>
                    <span className='text-coral-red'> Quality </span>
                    Shoes
                </h2>
                <p className='mt-4 lg:max-w-lg info-text'>
                    Discover stylish Nike arrivals, quality comfort, and innovation for your active lifestyle.
                    Discover stylish Nike arrivals, quality comfort, and innovation for your active lifestyle.
                </p>
                <p className='mt-6 lg:max-w-lg info-text'>
                    Discover stylish Nike arrivals, quality comfort, and innovation for your active lifestyle.
                </p>
                <div className='mt-11'>
                    <Button
                        label="View Detials"
                    />
                </div>

            </div>

            <div className='flex items-center justify-center flex-1'>
                <img
                    src={shoe8}
                    alt="Show8"
                    width={570}
                    height={522}
                    className='object-contain'
                />
            </div>
        </section>
    )
}

export default SuperQualtiy