import React from 'react'
import cardBG from '../cardbg.jpg'

export default function Card({ cardFace, flipFunc }) {

    return (
        <>
            <div onClick={flipFunc} className='card-container'>
                <img className='card-bg' src={cardBG} alt="" />
                <img className='card-face hide' src={cardFace} alt="" />
            </div >
            <div onClick={flipFunc} className='card-container'>
                <img className='card-bg' src={cardBG} alt="" />
                <img className='card-face hide' src={cardFace} alt="" />
            </div >
        </>

    )
}
