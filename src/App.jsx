import { useState } from 'react'
import {
  Play,
  Volume2,
  Star,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Loader2,
} from 'lucide-react'

const MoneyGraphic = ({ value, type }) => {
  if (type === 'coin') {
    const isGold = value === 1000
    const bgClass = isGold
      ? 'bg-yellow-300 border-yellow-500 text-yellow-900'
      : 'bg-slate-200 border-slate-400 text-slate-800'

    return (
      <div
        className={`m-1 flex h-14 w-14 flex-col items-center justify-center rounded-full border-[3px] shadow-md transition-transform hover:scale-105 sm:m-2 sm:h-20 sm:w-20 sm:border-4 ${bgClass}`}
      >
        <span className="text-[8px] font-bold sm:text-[10px]">Rp</span>
        <span className="text-sm font-extrabold leading-none sm:text-xl">
          {value}
        </span>
      </div>
    )
  }

  const getBillStyle = (val) => {
    switch (val) {
      case 1000:
        return 'bg-emerald-100 border-emerald-500 text-emerald-900'
      case 2000:
        return 'bg-gray-300 border-gray-500 text-gray-900'
      case 5000:
        return 'bg-orange-200 border-orange-500 text-orange-900'
      case 10000:
        return 'bg-purple-200 border-purple-500 text-purple-900'
      default:
        return 'bg-white border-black'
    }
  }

  return (
    <div
      className={`relative m-1 flex h-14 w-28 flex-col justify-between overflow-hidden rounded-md border-2 p-1 shadow-md sm:m-2 sm:h-24 sm:w-44 sm:border-4 sm:p-2 ${getBillStyle(value)}`}
    >
      <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-white/30 sm:h-10 sm:w-10" />

      <div className="text-[8px] font-bold tracking-wider sm:text-xs">
        BANK INDONESIA
      </div>
      <div className="flex items-end justify-between">
        <div className="text-[8px] font-bold opacity-70 sm:text-xs">Rp</div>
        <div className="text-sm font-extrabold sm:text-2xl">{value}</div>
      </div>
    </div>
  )
}

const questionsData = [
  {
    targetValue: 1000,
    targetType: 'bill',
    options: [
      [
        { value: 500, type: 'coin' },
        { value: 500, type: 'coin' },
      ],
      [
        { value: 1000, type: 'coin' },
        { value: 500, type: 'coin' },
      ],
      [{ value: 500, type: 'coin' }],
    ],
    correctIndex: 0,
  },
  {
    targetValue: 2000,
    targetType: 'bill',
    options: [
      [
        { value: 500, type: 'coin' },
        { value: 500, type: 'coin' },
      ],
      [
        { value: 1000, type: 'bill' },
        { value: 1000, type: 'bill' },
      ],
      [
        { value: 2000, type: 'bill' },
        { value: 1000, type: 'bill' },
      ],
    ],
    correctIndex: 1,
  },
  {
    targetValue: 5000,
    targetType: 'bill',
    options: [
      [
        { value: 2000, type: 'bill' },
        { value: 2000, type: 'bill' },
      ],
      [
        { value: 1000, type: 'bill' },
        { value: 1000, type: 'bill' },
        { value: 1000, type: 'bill' },
      ],
      [
        { value: 2000, type: 'bill' },
        { value: 2000, type: 'bill' },
        { value: 1000, type: 'bill' },
      ],
    ],
    correctIndex: 2,
  },
  {
    targetValue: 10000,
    targetType: 'bill',
    options: [
      [
        { value: 5000, type: 'bill' },
        { value: 5000, type: 'bill' },
      ],
      [
        { value: 5000, type: 'bill' },
        { value: 2000, type: 'bill' },
        { value: 1000, type: 'bill' },
      ],
      [
        { value: 2000, type: 'bill' },
        { value: 2000, type: 'bill' },
        { value: 2000, type: 'bill' },
      ],
    ],
    correctIndex: 0,
  },
  {
    targetValue: 2000,
    targetType: 'bill',
    options: [
      [
        { value: 1000, type: 'coin' },
        { value: 1000, type: 'coin' },
        { value: 1000, type: 'coin' },
      ],
      [
        { value: 1000, type: 'bill' },
        { value: 500, type: 'coin' },
        { value: 500, type: 'coin' },
      ],
      [{ value: 1000, type: 'bill' }],
    ],
    correctIndex: 1,
  },
]

export default function App() {
  const [screen, setScreen] = useState('start')
  const [currentQ, setCurrentQ] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [showFeedback, setShowFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const [story, setStory] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'id-ID'
      utterance.rate = 0.85
      utterance.pitch = 1.1
      window.speechSynthesis.speak(utterance)
    }
  }

  const startGame = () => {
    setScreen('game')
    setCurrentQ(0)
    setScore(0)
    setWrongAnswers([])
    setStory('')
    speak('Ayo mulai. Pilih kelompok uang yang jumlahnya sama dengan uang di atas.')
  }

  const handleOptionClick = (index) => {
    if (showFeedback) return

    const isCorrect = index === questionsData[currentQ].correctIndex

    if (isCorrect) {
      setShowFeedback('correct')
      speak('Pintar sekali! Jawabanmu benar.')
      setScore((currentScore) => currentScore + 1)

      setTimeout(() => {
        if (currentQ < questionsData.length - 1) {
          setCurrentQ((currentQuestion) => currentQuestion + 1)
          setWrongAnswers([])
          setShowFeedback(null)
          setStory('')
        } else {
          setScreen('end')
          speak('Hore! Kamu sudah menyelesaikan semua permainan. Kamu sangat hebat!')
        }
      }, 2000)
    } else {
      setShowFeedback('wrong')
      speak('Wah, belum tepat. Yuk coba cari yang lain.')
      setWrongAnswers((previousWrongAnswers) => [...previousWrongAnswers, index])

      setTimeout(() => {
        setShowFeedback(null)
      }, 1500)
    }
  }

  const generateStory = async (amount) => {
    if (!apiKey) {
      setStory('Kunci API Gemini belum diatur.')
      return
    }

    setIsGenerating(true)
    setStory('')

    const promptText = `Buatkan 1 kalimat cerita sangat sederhana untuk anak tunagrahita (hambatan intelektual) tentang membeli barang seharga Rp ${amount}. Kalimat harus positif, mudah dipahami, dan langsung pada intinya. Gunakan bahasa Indonesia. Jangan menggunakan kata-kata sulit. Contoh: 'Ani membeli buku tulis seharga ${amount} rupiah.' Jangan lebih dari 2 kalimat.`

    let retries = 5
    let delay = 1000

    for (let i = 0; i < retries; i += 1) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptText }] }],
              systemInstruction: {
                parts: [
                  {
                    text: "Kamu adalah guru SLB yang sangat ramah. Berikan cerita yang sangat amat singkat, manis, dan mudah dipahami anak.",
                  },
                ],
              },
            }),
          },
        );

        if (!response.ok) throw new Error('API Error')

        const data = await response.json()
        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Wah, cerita sedang tidak bisa dimuat.'
        setStory(text.trim())
        speak(text.trim())
        setIsGenerating(false)
        return
      } catch (error) {
        if (i === retries - 1) {
          setStory('Wah, cerita gagal dimuat. Coba lagi nanti ya.')
          setIsGenerating(false)
        } else {
          await new Promise((resolve) => setTimeout(resolve, delay))
          delay *= 2
        }
      }
    }
  }

  if (screen === 'start') {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-100 to-emerald-100 p-4">
        <div className="absolute left-6 top-6 h-28 w-28 rounded-full bg-yellow-300/50 blur-2xl sm:h-40 sm:w-40" />
        <div className="absolute bottom-10 right-8 h-36 w-36 rounded-full bg-pink-300/40 blur-3xl sm:h-56 sm:w-56" />
        <div className="absolute left-1/2 top-16 h-24 w-24 -translate-x-1/2 rounded-full bg-white/30 blur-2xl sm:h-40 sm:w-40" />

        <div className="relative w-full max-w-2xl rounded-[2rem] border-4 border-white/70 bg-white/80 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-10">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-sky-100 p-3 shadow-lg ring-4 ring-sky-200/70">
              <MoneyGraphic value={5000} type="bill" />
            </div>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-yellow-200 px-4 py-2 text-sm font-extrabold text-yellow-900 shadow-sm">
            <Sparkles className="h-4 w-4" /> Ayo bermain sambil belajar
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-sky-800 sm:text-6xl">
            Belajar Nilai Uang
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg font-semibold leading-relaxed text-slate-700 sm:text-2xl">
            Cocokkan uang dengan jumlah yang benar. Mudah, ceria, dan dibuat agar anak-anak cepat paham.
          </p>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-bold text-sky-800 shadow-sm ring-2 ring-sky-100">
              Pilih jawaban yang benar
            </div>
            <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800 shadow-sm ring-2 ring-amber-100">
              Dengarkan instruksi
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 shadow-sm ring-2 ring-emerald-100">
              Dapatkan bintang saat benar
            </div>
          </div>

          <button
            onClick={startGame}
            className="mx-auto flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-8 py-4 text-xl font-extrabold text-white shadow-lg transition hover:scale-105 hover:from-emerald-600 hover:to-lime-600 sm:w-auto sm:px-10 sm:text-2xl"
            type="button"
          >
            <Play className="mr-3 h-8 w-8" /> Mulai Bermain
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-100 via-cyan-100 to-sky-200 p-4">
        <div className="absolute left-8 top-10 h-32 w-32 rounded-full bg-yellow-300/50 blur-3xl sm:h-48 sm:w-48" />
        <div className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-violet-300/35 blur-3xl sm:h-56 sm:w-56" />

        <div className="relative w-full max-w-2xl rounded-[2rem] border-4 border-white/70 bg-white/85 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-10">
          <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-amber-300 shadow-lg ring-8 ring-white sm:h-36 sm:w-36">
            <Star
              className="h-16 w-16 animate-bounce text-yellow-500 sm:h-20 sm:w-20"
              fill="currentColor"
            />
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-200 px-4 py-2 text-sm font-extrabold text-emerald-900 shadow-sm">
            <CheckCircle className="h-4 w-4" /> Selesai dengan baik
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-emerald-800 sm:text-6xl">
            Hebat!
          </h1>

          <p className="mx-auto mb-3 max-w-xl text-lg font-semibold leading-relaxed text-slate-700 sm:text-2xl">
            Kamu sudah menyelesaikan semua soal dengan semangat.
          </p>

          <div className="mx-auto mb-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <div className="flex-1 rounded-2xl bg-sky-50 px-4 py-4 shadow-sm ring-2 ring-sky-100">
              <div className="text-sm font-bold text-sky-700">Skor kamu</div>
              <div className="text-3xl font-extrabold text-sky-900">
                {score}/{questionsData.length}
              </div>
            </div>
            <div className="flex-1 rounded-2xl bg-amber-50 px-4 py-4 shadow-sm ring-2 ring-amber-100">
              <div className="text-sm font-bold text-amber-700">Bintang</div>
              <div className="text-3xl font-extrabold text-amber-900">
                {score}
              </div>
            </div>
          </div>

          <p className="mb-8 text-base font-semibold text-slate-600 sm:text-lg">
            Klik main lagi untuk mencoba dan meraih bintang lebih banyak.
          </p>

          <button
            onClick={startGame}
            className="mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500 px-8 py-4 text-xl font-extrabold text-white shadow-lg transition hover:scale-105 hover:from-sky-600 hover:to-blue-600"
            type="button"
          >
            <RotateCcw className="mr-2 h-6 w-6" /> Main Lagi
          </button>
        </div>
      </div>
    )
  }

  const question = questionsData[currentQ]

  return (
    <div className="flex min-h-screen flex-col select-none bg-sky-50 p-4 font-sans sm:p-6">
      <div className="mb-6 flex items-center justify-between rounded-2xl border-2 border-sky-100 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex space-x-1">
          {questionsData.map((_, idx) => (
            <div
              key={idx}
              className={`h-3 w-8 rounded-full sm:h-4 sm:w-12 ${idx <= currentQ ? 'bg-green-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
        <button
          onClick={() =>
            speak(
              'Pilih kelompok uang di bawah yang jumlahnya sama dengan uang di kotak biru.',
            )
          }
          className="flex items-center rounded-full bg-blue-100 p-2 text-blue-700 shadow-sm hover:bg-blue-200 sm:p-3"
          aria-label="Dengarkan Instruksi"
          type="button"
        >
          <Volume2 className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-grow flex-col gap-6 lg:flex-row">
        <div className="flex flex-col items-center justify-center rounded-3xl border-4 border-sky-300 bg-sky-100 p-6 shadow-md lg:w-1/3">
          <h2 className="mb-6 text-center text-xl font-bold text-sky-800 sm:text-2xl">
            Samakan dengan uang ini:
          </h2>
          <div className="mb-4 rounded-2xl bg-white p-4 shadow-inner">
            <MoneyGraphic value={question.targetValue} type={question.targetType} />
          </div>
          <div className="rounded-full bg-sky-200 px-6 py-2 text-2xl font-extrabold text-sky-900 sm:text-3xl">
            Rp {question.targetValue.toLocaleString('id-ID')}
          </div>

          <div className="mt-6 flex w-full flex-col items-center">
            {!story && !isGenerating && (
              <button
                onClick={() => generateStory(question.targetValue)}
                className="flex transform items-center rounded-full border-2 border-purple-400 bg-purple-500 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-purple-600 sm:px-6 sm:py-3 sm:text-base"
                type="button"
              >
                <Sparkles className="mr-2 h-5 w-5 text-yellow-300" /> Cerita Uang ✨
              </button>
            )}

            {isGenerating && (
              <div className="flex items-center rounded-full border-2 border-purple-300 bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700 animate-pulse">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Membuat cerita...
              </div>
            )}

            {story && !isGenerating && (
              <div className="relative mt-2 w-full rounded-3xl border-4 border-purple-300 bg-white p-4 text-center shadow-sm">
                <p className="text-sm font-bold leading-snug text-purple-800 sm:text-base">
                  {story}
                </p>
                <button
                  onClick={() => speak(story)}
                  className="absolute -right-4 -top-4 rounded-full bg-purple-400 p-2 text-white shadow-md transition hover:scale-110 hover:bg-purple-500"
                  aria-label="Dengarkan Cerita"
                  type="button"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="relative flex flex-col justify-center gap-4 lg:w-2/3">
          {showFeedback === 'correct' && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/70 backdrop-blur-sm">
              <div className="flex flex-col items-center rounded-3xl border-4 border-green-500 bg-green-100 p-8 shadow-2xl animate-bounce">
                <CheckCircle className="mb-4 h-24 w-24 text-green-500" />
                <span className="text-3xl font-extrabold text-green-700">HEBAT!</span>
              </div>
            </div>
          )}

          {showFeedback === 'wrong' && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center rounded-3xl border-4 border-red-500 bg-red-100 p-6 shadow-xl opacity-90">
                <XCircle className="mb-2 h-20 w-20 text-red-500" />
                <span className="text-2xl font-bold text-red-700">Coba Lagi</span>
              </div>
            </div>
          )}

          <h3 className="mb-2 text-center text-lg font-bold text-gray-700 lg:text-left sm:text-xl">
            Pilih jawaban yang benar:
          </h3>

          {question.options.map((option, index) => {
            const isWrongAndClicked = wrongAnswers.includes(index)

            if (isWrongAndClicked) {
              return (
                <div
                  key={index}
                  className="flex justify-center rounded-3xl border-4 border-gray-200 bg-gray-100 p-4 opacity-40 grayscale transition-all"
                >
                  <div className="py-8 text-xl font-bold text-gray-400">
                    Sudah dicoba
                  </div>
                </div>
              )
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`flex flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-sky-200 bg-white p-4 shadow-sm transition-all hover:border-sky-400 hover:bg-sky-50 hover:shadow-md sm:p-6 ${showFeedback ? 'pointer-events-none' : 'cursor-pointer'}`}
                type="button"
              >
                {option.map((money, moneyIndex) => (
                  <MoneyGraphic
                    key={`${index}-${moneyIndex}`}
                    value={money.value}
                    type={money.type}
                  />
                ))}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
