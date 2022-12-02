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
    const fetchTimes = useRef(0)
    let tableSize = tableDifficulty[difficulty]
    let currentCards = []
    let firstCard = null

    function handleSelect(e) {
        setDifficulty(e.target.value)
        fetchTimes.current = 0
        setCardImgs([])
        resetCards()
    }

    useEffect(() => {
        let cards = document.querySelectorAll('.card-container')
        cards.forEach(card => card.style.order = Math.floor(Math.random() * cards.length))
    }, [tableSize])

    useEffect(() => {
        console.log('use effect fetch nelkul', fetchTimes, tableSize / 2)
        while (fetchTimes.current !== tableSize / 2) {
            fetchTimes.current += 1
            fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(res => res.json())
                .then(meal => {
                    setCardImgs(prevImgs => [...prevImgs, meal.meals[0].strMealThumb])
                })
            console.log('fetch lefut')
        }
    }, [tableSize])

    function resetCards() {
        let foundCards = document.querySelectorAll('.found')
        foundCards.forEach(card => card.classList.toggle('hide'))
        foundCards.forEach(card => card.classList.remove('found'))
    }

    function flipCard(e) {
        let card = Array.from(e.target.parentNode.children)
        if (!e.target.classList.contains('found') && currentCards.length < 4 && e.target.parentNode !== firstCard) {
            currentCards.push(...e.target.parentNode.children)
            card.forEach(element => element.classList.toggle('hide'));
        }
        if (currentCards.length === 2) {
            firstCard = e.target.parentNode
        }
        if (currentCards.length === 4 && currentCards[1].src !== currentCards[3].src) {
            setTimeout(() => {
                currentCards.forEach(card => card.classList.toggle('hide'))
                currentCards = []
            }, 300)
        }
        else if (currentCards.length === 4 && currentCards[1].src === currentCards[3].src) {
            currentCards.forEach(card => card.classList.add('found'))
            currentCards = []
        }
    }


    return (
        <>
            <InputSelect difficulty={difficulty} handleSelect={handleSelect} />
            <div>Difficulty: {difficulty} ({tableSize})</div>
            <div className='card-table'>
                {[...Array(tableSize / 2)].map((element, index) => <Card key={index} cardFace={`${cardImgs[index]}`} flipFunc={flipCard} />)}
            </div>
        </>
    )
}