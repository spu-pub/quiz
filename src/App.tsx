import { useState } from 'react'
import './App.css'
type QuizQuestion = {
  id: number
  title: string
  prompt: string
  options: string[]
  answer: number
  tip?: string
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    title: '電話',
    prompt: '取引先に初めて電話をするとき',
    options: [
      'お電話ありがとうございます。山田です。',
      'もしもし、山田ですけど。',
      '山田だけど。今いい？'
    ],
    answer: 0,
    tip: '挨拶と名前'
  }
]

function App() {
  const [current, setCurrent] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answered, setAnswerd] = useState(false);
  
  const currentQuestion = questions[current];
  const progress = Math.round(
    ((showResults ? questions.length : current + 1) / questions.length) * 100
  );
  const handleSelect = (index: number) => {
    if (answered || showResults) return
    setSelectedIndex(index)
    setAnswerd(true)
    if (index === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Focus mode quiz.</p>
        <p className="lede">
          Quiz
        </p>
      </header>
      <main className="card">
        {showResults ? (
          <div className="results">
            {score}
          </div>
        ) : (
          <>
            <div className="question-head">
              <p className="eyebrow">
                Question {current + 1}
              </p>
              <h2>{currentQuestion.title}</h2>
            </div>
            <span className="number">
              {currentQuestion.options.length} 択
            </span>
            <p className="prompt">{currentQuestion.prompt}</p>
          </>
        )}
      </main>
    </div>
  )
}

export default App
