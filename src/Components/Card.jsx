import React from 'react'
import cardBG from '../cardbg.jpg'

export default function Card({ cardFace, flipFunc, order }) {


    // const [cardPicture, setcardPicture] = useState([])
    // const isMount = useRef(true)

    // useEffect(() => {
    //     if (isMount.current) {
    //         isMount.current = false
    //         fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    //             .then(res => res.json())
    //             .then(food => setcardPicture(food.meals[0]))
    //         console.log('use effect lefut')
    //     }
    // })

    return (
        <>
            <div style={order} onClick={flipFunc} className='card-container'>
                <img className='card-bg' src={cardBG} alt="" />
                <img className='card-face hide' src={cardBG} alt="" />
            </div >
            <div style={order} onClick={flipFunc} className='card-container'>
                <img className='card-bg' src={cardBG} alt="" />
                <img className='card-face hide' src={cardBG} alt="" />
            </div >
        </>

    )
}
