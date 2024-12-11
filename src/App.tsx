import { useState } from 'react'
import useWindowSize from "react-use/lib/useWindowSize"
import './App.css'
import Die from './Die.tsx'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(() => generateNewDice())

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  const {height, width} = useWindowSize()

  const [tries, setTries] = useState(0)

  type Die = {
    value: number,
    isHeld: boolean,
    id: string
  }

  function generateNewDice(): Array<Die> {
    return new Array(10).fill({}).map(() => {
      return {
        value: Math.floor((Math.random() * 6) + 1),
        isHeld: false,
        id: nanoid()
      }
    })
  }

  function rollDice() {
    setDice(prevDice => {
      return prevDice.map(die => die.isHeld ? die : {...die, value: Math.floor((Math.random() * 6) + 1)})
    })

    setTries(prevTries => prevTries + 1)
  }

  function handleHold(id: string) {
    setDice(prevDice => {
      return prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
    })
  }

  function newGame() {
    setDice(generateNewDice())
    setTries(0)
  }

  const diceElts = dice.map(die => <Die value={die.value} isHeld={die.isHeld} handleHold={handleHold} id={die.id} key={die.id} />)

  return (
    <main className="container">
      {gameWon && <Confetti height={height} width={width} />}
      <div className="game-slate">
        <h2 className="title">Tenzies</h2>
        <p className="body-text">Click the dice to hold at a specific number and continue rolling until all dice match!</p>
        <div className="dice-container">
          {diceElts}
        </div>
        <button onClick={gameWon ? newGame : rollDice} className="roll-btn">{gameWon ? "New Game" : "Roll"}</button>
        <h3 className="body-text">Tries: {tries}</h3>
      </div>
    </main>
  )
}

export default App
