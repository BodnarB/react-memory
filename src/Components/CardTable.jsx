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
    const [cardImgs, setCardImgs] = useState([])


    function handleSelect(e) {
        setDifficulty(e.target.value)
        fetchTimes.current = 0
        setCardImgs([])
    }

    let tableSize = tableDifficulty[difficulty]

    useEffect(() => {
        let cards = document.querySelectorAll('.card-container')
        cards.forEach(card => card.style.order = Math.floor(Math.random() * cards.length))
    })


    const fetchTimes = useRef(0)
    useEffect(() => {
        console.log('use effect lefutott')
        async function fetchImg() {
            while (fetchTimes.current !== tableSize / 2) {
                fetchTimes.current += 1
                let res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                let meal = await res.json()
                setCardImgs(current => [...current, meal.meals[0].strMealThumb])
            }
            console.log('async fetchImg lefutott')
        }
        fetchImg()
    },[tableSize])



    return (
        <>
            <InputSelect difficulty={difficulty} handleSelect={handleSelect} />
            <div>Difficulty: {difficulty} ({tableSize})</div>
            <div className='card-table'>
                {[...Array(tableSize / 2)].map((element, index) => <Card key={index} cardFace={`${cardImgs[index]}`} />)}
            </div>

        </>
    )
}

//cardFace={`${cardImgs[index].strMealThumb}`} 