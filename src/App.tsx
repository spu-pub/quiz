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
  },
  {
    id: 2,
    title: 'おねがいするとき',
    prompt: 'おねがいするとき、せんぱいにはどうおねがいする？',
    options: [
      '資料をちょうだい。',
      'ちょうだい',
      '資料をいただいてもよろしいでしょうか。'
    ],
    answer: 2,
    tip: 'ていねいな伝え方'
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
  const goToNext = () => {
    if(!answered) return
    if(current === questions.length - 1) {
      setShowResults(true);
      return
    }
    setCurrent((prev) => prev + 1);
    setSelectedIndex(null);
    setAnswerd(false);
  }
  const optionTone = (index: number) => {
    if (!answered) return ''
    if (index === currentQuestion.answer) return 'correct'
    if(selectedIndex === index) return 'wrong'
    return 'muted'
  }

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
            <div className="hero-meta">
              <span>
                {score} / {questions.length} Correct
              </span>

            </div>
            <span className="number">
              {currentQuestion.options.length} 択
            </span>
            <p className="prompt">{currentQuestion.prompt}</p>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button className={`option ${optionTone(index)}`}
                key={option}
                onClick={() => handleSelect(index)}
                aria-pressed={selectedIndex === index}>
                  <span className="option-index">
                    {String.fromCharCode(65 + index)}  
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>
            <div className="actions">
              <button className="primary" onClick={goToNext} disabled={!answered}>
                {current === questions.length - 1 ? 'Result':'Next'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
