import React, { useState, useEffect, useRef } from 'react'
import InputSelect from './InputSelect'
import Card from './Card'

export default function CardTable() {

    const tableDifficulty = {
        'easy': 8,
        'medium': 12,
        'hard': 16
    }

    const [difficulty, setDifficulty] = useState('easy')
    let cardImgs = []

    function handleSelect(e) {
        setDifficulty(e.target.value)
        fetchTimes.current = 0
        cardImgs = []
    }

    let tableSize = tableDifficulty[difficulty]

    useEffect(() => {
        let cards = document.querySelectorAll('.card-container')
        cards.forEach(card => card.style.order = Math.floor(Math.random() * cards.length))
    })


    const fetchTimes = useRef(0)
    useEffect(() => {
        // console.log(cardImgs,fetchTimes.current,tableSize)
        async function fetchImg() {
            while (fetchTimes.current !== tableSize / 2) {
                fetchTimes.current += 1
                let res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                let meal = await res.json()
                cardImgs.push(meal.meals[0])
                console.log(cardImgs, fetchTimes.current, tableSize / 2)
            }
            // fetchTimes.current = 0
        }
        fetchImg()
        // console.log(cardImgs,fetchTimes.current,tableSize)
        // fetchTimes.current = 0
        console.log(cardImgs)
    })

    // useEffect(() => {
    //     if (isMount.current) {
    //         isMount.current = false
    //         fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    //             .then(res => res.json())
    //             .then(food => setcardPicture([...cardPicture,food.meals[0]]))
    //             // .then(food => cardPicture.push(food.meals[0]))
    //         console.log('use effect lefut')
    //     }
    // })
    // console.log(cardPicture)

    return (
        <>
            <InputSelect difficulty={difficulty} handleSelect={handleSelect} />
            <div>Difficulty: {difficulty} ({tableSize})</div>
            <div className='card-table'>
                {[...Array(tableSize / 2)].map((element, index) => <Card key={index} />)}
            </div>

        </>
    )
}
