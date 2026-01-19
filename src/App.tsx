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
  
  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default App
