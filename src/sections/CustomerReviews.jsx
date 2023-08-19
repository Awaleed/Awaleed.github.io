import { reviews } from '../constants'
import ReviewCard from '../components/ReviewCard'

const CustomerReviews = () => {
    return (
        <section className="max-container">
            <h3 className="text-4xl font-bold text-center font-palanquin ">
                What Our
                <span className="text-coral-red "> Customers </span>
                Say?
            </h3>
            <p className="max-w-lg m-auto mt-4 text-center info-text">
                Here are reviews from customers that have ordered from us before
            </p>
            <div className="flex items-center flex-1 mt-24 justify-evenly max-lg:flex-col gap-14">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
        </section>
    )
}

export default CustomerReviews