const Button = ({ label, iconURL, backgroundColor, boarderColor, textColor, fullWidth }) => {
    return (
        <button className={`flex items-center justify-center gap-2 py-4 text-lg leading-none  border rounded-full px-7 font-montserrat 
        ${backgroundColor
                ? `${backgroundColor} ${textColor} ${boarderColor}`
                : `text-white bg-coral-red border-coral-red`}
        ${fullWidth && `w-full`}
        `}>
            {label}

            {
                iconURL &&
                <img src={iconURL} alt="arrow icon" className="w-5 h-5 ml-2 rounded-full" />
            }
        </button>
    )
}

export default Button