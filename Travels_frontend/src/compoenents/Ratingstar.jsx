import React from 'react'
import { FaStar, FaRegStar } from "react-icons/fa";

const Ratingstar = (props) => {
    const rate = props.rating
    let stars = []
    for (let i = 1; i <= 5; i++) {
        if (i <= rate) {
            stars.push(<FaStar key={i} />)
        }

        else {
            stars.push(<FaRegStar key={i} />)
        }
    }
    return (
        <>
            <p className='text-warning'>{stars}</p>
        </>
    )
}

export default Ratingstar