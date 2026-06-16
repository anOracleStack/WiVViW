import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

/* ═══════════════════════════════════════════════════════════════════════════
   WiVViW AI INTERVIEW PLATFORM
   Phase 1: Voice Clone & Business Discovery
   ═══════════════════════════════════════════════════════════════════════════ */

const INTERVIEW_STAGES = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'identity', label: 'Identity' },
  { id: 'business', label: 'Business' },
  { id: 'vision', label: 'Vision' },
  { id: 'vetting', label: 'Vetting' },
]

const SAMPLE_QUESTIONS = [
  "What is your name & what do you do?",
  "Tell me about your business in one sentence.",
  "What problem does your business solve?",
  "Who is your ideal customer?",
  "What makes you different from competitors?",
  "Where do you see your business in 5 years?",
]

export default function App() {
  const [stage, setStage] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [waveformData, setWaveformData] = useState(Array(32).fill(0.1))

  // Simulate waveform animation
  useEffect(() => {
    if (!isListening) return
    const interval = setInterval(() => {
      setWaveformData(prev => prev.map(() => 
        0.1 + Math.random() * 0.9
      ))
    }, 100)
    return () => clearInterval(interval)
  }, [isListening])

  const handleStartListening = () => {
    setIsListening(true)
    // Simulate adding transcript after delay
    setTimeout(() => {
      setTranscript(prev => [
        ...prev,
        {
          role: 'ai',
          text: SAMPLE_QUESTIONS[currentQuestion],
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        }
      ])
    }, 500)
  }

  const handleStopListening = () => {
    setIsListening(false)
    setTranscript(prev => [
      ...prev,
      {
        role: 'user',
        text: '[User response recorded]',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      }
    ])
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const advanceStage = () => {
    if (stage < INTERVIEW_STAGES.length - 1) {
      setStage(prev => prev + 1)
      setCurrentQuestion(0)
      setTranscript([])
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__logo">
          <span className="header__logo-text">WiVViW</span>
          <span className="header__logo-badge">PHASE 1</span>
        </div>
        <nav className="header__nav">
          {INTERVIEW_STAGES.map((s, i) => (
            <button
              key={s.id}
              className={`header__nav-item ${i === stage ? 'active' : ''} ${i < stage ? 'complete' : ''}`}
              onClick={() => i <= stage && setStage(i)}
            >
              <span className="header__nav-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="header__nav-label">{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="header__status">
          <div className="header__status-dot" data-active={isListening} />
          <span>{isListening ? 'Recording' : 'Ready'}</span>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <main className="main">
        {/* Left Panel - AI Host */}
        <section className="panel panel--host">
          <div className="host">
            {/* AI Avatar */}
            <motion.div 
              className="host__avatar"
              animate={{ 
                boxShadow: isListening 
                  ? '0 0 60px rgba(232, 185, 35, 0.4)' 
                  : '0 0 30px rgba(232, 185, 35, 0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="host__avatar-inner">
                <span className="host__avatar-icon">W</span>
              </div>
              {/* Pulse rings */}
              <AnimatePresence>
                {isListening && (
                  <>
                    <motion.div
                      className="host__pulse"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="host__pulse"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Current Question */}
            <div className="host__question">
              <span className="host__question-label">Current Question</span>
              <motion.p
                key={currentQuestion}
                className="host__question-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {SAMPLE_QUESTIONS[currentQuestion]}
              </motion.p>
            </div>

            {/* Waveform Visualizer */}
            <div className="host__waveform">
              {waveformData.map((height, i) => (
                <motion.div
                  key={i}
                  className="host__waveform-bar"
                  animate={{ 
                    scaleY: isListening ? height : 0.1,
                    backgroundColor: isListening ? '#e8b923' : '#3a3a4a'
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="host__controls">
              <motion.button
                className={`host__button host__button--record ${isListening ? 'active' : ''}`}
                onClick={isListening ? handleStopListening : handleStartListening}
                whileTap={{ scale: 0.95 }}
              >
                <span className="host__button-icon">
                  {isListening ? '■' : '●'}
                </span>
                <span>{isListening ? 'Stop Recording' : 'Start Recording'}</span>
              </motion.button>
              <button 
                className="host__button host__button--next"
                onClick={advanceStage}
                disabled={stage >= INTERVIEW_STAGES.length - 1}
              >
                Next Stage →
              </button>
            </div>
          </div>
        </section>

        {/* Right Panel - Transcript */}
        <section className="panel panel--transcript">
          <div className="transcript">
            <div className="transcript__header">
              <h2 className="transcript__title">Live Transcript</h2>
              <span className="transcript__count">{transcript.length} messages</span>
            </div>
            
            <div className="transcript__content">
              {transcript.length === 0 ? (
                <div className="transcript__empty">
                  <div className="transcript__empty-icon">◇</div>
                  <p>Click "Start Recording" to begin the interview.</p>
                  <p className="transcript__empty-sub">Your responses will appear here in real-time.</p>
                </div>
              ) : (
                <div className="transcript__messages">
                  <AnimatePresence>
                    {transcript.map((msg, i) => (
                      <motion.div
                        key={i}
                        className={`transcript__message transcript__message--${msg.role}`}
                        initial={{ opacity: 0, x: msg.role === 'ai' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="transcript__message-header">
                          <span className="transcript__message-role">
                            {msg.role === 'ai' ? 'WiVViW Host' : 'You'}
                          </span>
                          <span className="transcript__message-time">{msg.timestamp}</span>
                        </div>
                        <p className="transcript__message-text">{msg.text}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="transcript__progress">
              <div className="transcript__progress-label">
                <span>Question Progress</span>
                <span>{currentQuestion + 1} / {SAMPLE_QUESTIONS.length}</span>
              </div>
              <div className="transcript__progress-bar">
                <motion.div 
                  className="transcript__progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span className="footer__text">WiVViW © 2026 • AI Business Metaverse</span>
        <span className="footer__version">v1.0.0</span>
      </footer>
    </div>
  )
}
