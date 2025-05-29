import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Question from './components/Question';
import Scoreboard from './components/Scoreboard';
import quizService from './services/quizService';
import './index.css';

const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished'
};

function App() {
  // Game state
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerReset, setTimerReset] = useState(0);

  // Timer state
  const [timerDuration] = useState(60); // 60 seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Load questions when component mounts
  useEffect(() => {
    loadQuestions();
  }, []);

  // Timer effect for tracking elapsed time
  useEffect(() => {
    let intervalId;
    
    if (isTimerActive) {
      intervalId = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(intervalId);
  }, [isTimerActive]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get random questions, fallback to all questions if needed
      let questionsData;
      try {
        questionsData = await quizService.getRandomQuestions(10);
      } catch (err) {
        console.warn('Random questions not available, trying all questions');
        questionsData = await quizService.getAllQuestions();
      }
      
      if (questionsData && questionsData.length > 0) {
        setQuestions(questionsData);
      } else {
        // If no questions from API, use sample questions
        setQuestions(getSampleQuestions());
      }
    } catch (err) {
      console.error('Error loading questions:', err);
      setError('Failed to load questions. Using sample questions.');
      setQuestions(getSampleQuestions());
    } finally {
      setLoading(false);
    }
  };

  const getSampleQuestions = () => {
    return [
      {
        id: 1,
        questionText: 'print("Hello, World!")\\nprint("Welcome to Python!")',
        answer: 'This code prints two lines of text to the console',
        codeSnippet: 'print("Hello, World!")\nprint("Welcome to Python!")',
        difficultyLevel: 'BEGINNER'
      },
      {
        id: 2,
        questionText: 'for i in range(5):\\n    print(i)',
        answer: 'This code prints numbers 0 through 4, each on a new line',
        codeSnippet: 'for i in range(5):\n    print(i)',
        difficultyLevel: 'BEGINNER'
      },
      {
        id: 3,
        questionText: 'x = [1, 2, 3]\\ny = x\\ny.append(4)\\nprint(x)',
        answer: 'This code prints [1, 2, 3, 4] because y and x reference the same list',
        codeSnippet: 'x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)',
        difficultyLevel: 'INTERMEDIATE'
      },
      {
        id: 4,
        questionText: 'def factorial(n):\\n    if n <= 1:\\n        return 1\\n    return n * factorial(n-1)',
        answer: 'This is a recursive function that calculates the factorial of a number',
        codeSnippet: 'def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)',
        difficultyLevel: 'INTERMEDIATE'
      },
      {
        id: 5,
        questionText: 'import pandas as pd\\ndf = pd.DataFrame({"A": [1, 2], "B": [3, 4]})',
        answer: 'This code creates a pandas DataFrame with two columns A and B',
        codeSnippet: 'import pandas as pd\ndf = pd.DataFrame({"A": [1, 2], "B": [3, 4]})',
        difficultyLevel: 'ADVANCED'
      }
    ];
  };

  const startGame = () => {
    if (questions.length === 0) {
      setError('No questions available. Please load questions first.');
      return;
    }
    
    resetGameState();
    setGameState(GAME_STATES.PLAYING);
    setIsTimerActive(true);
  };

  const pauseGame = () => {
    setGameState(GAME_STATES.PAUSED);
    setIsTimerActive(false);
  };

  const resumeGame = () => {
    setGameState(GAME_STATES.PLAYING);
    setIsTimerActive(true);
  };

  const stopGame = () => {
    setGameState(GAME_STATES.FINISHED);
    setIsTimerActive(false);
  };

  const resetGameState = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeElapsed(0);
    setTimerReset(prev => prev + 1);
    setError(null);
  };

  const handleTimeUp = () => {
    if (gameState === GAME_STATES.PLAYING) {
      stopGame();
    }
  };

  const handleAnswer = (answer) => {
    if (showResult) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }

    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      stopGame();
    }
  };

  const goToMainMenu = () => {
    setGameState(GAME_STATES.MENU);
    setIsTimerActive(false);
    resetGameState();
  };

  const playAgain = () => {
    resetGameState();
    setGameState(GAME_STATES.PLAYING);
    setIsTimerActive(true);
  };

  const reloadQuestions = () => {
    loadQuestions();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="App">
      {/* Score Display */}
      {gameState !== GAME_STATES.MENU && gameState !== GAME_STATES.FINISHED && (
        <div className="score-display">
          Score: {score} / {questions.length}
        </div>
      )}

      <div className="game-container">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading questions...</p>
          </div>
        )}

        {error && (
          <div className="error">
            {error}
            <button className="btn btn-secondary" onClick={reloadQuestions} style={{ marginLeft: '10px' }}>
              Retry
            </button>
          </div>
        )}

        {/* Main Menu */}
        {gameState === GAME_STATES.MENU && !loading && (
          <div>
            <h1>🎯 Jupyter Quiz Game</h1>
            <p>Test your coding knowledge with our interactive quiz!</p>
            
            <div className="game-stats" style={{ marginBottom: '2rem' }}>
              <div className="stat-item">
                <span className="stat-value">{questions.length}</span>
                <span className="stat-label">Questions Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{timerDuration}s</span>
                <span className="stat-label">Time Limit</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">Multiple Choice</span>
                <span className="stat-label">Question Type</span>
              </div>
            </div>

            <div className="game-controls">
              <button 
                className="btn btn-primary" 
                onClick={startGame}
                disabled={questions.length === 0}
              >
                Start Game
              </button>
              <button className="btn btn-secondary" onClick={reloadQuestions}>
                Reload Questions
              </button>
            </div>
          </div>
        )}

        {/* Game Playing */}
        {gameState === GAME_STATES.PLAYING && !loading && (
          <div>
            <Timer 
              duration={timerDuration}
              onTimeUp={handleTimeUp}
              isActive={isTimerActive}
              onReset={timerReset}
            />

            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-value">{currentQuestionIndex + 1}</span>
                <span className="stat-label">Question</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{questions.length}</span>
                <span className="stat-label">Total</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{Math.round(progress)}%</span>
                <span className="stat-label">Progress</span>
              </div>
            </div>

            <Question
              question={currentQuestion}
              onAnswer={handleAnswer}
              showResult={showResult}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentQuestion?.answer}
            />

            <div className="game-controls">
              <button className="btn btn-secondary" onClick={pauseGame}>
                Pause
              </button>
              <button className="btn btn-danger" onClick={stopGame}>
                Stop Game
              </button>
            </div>
          </div>
        )}

        {/* Game Paused */}
        {gameState === GAME_STATES.PAUSED && (
          <div>
            <h2>⏸️ Game Paused</h2>
            <p>Take your time! Resume when you're ready.</p>
            
            <div className="game-stats">
              <div className="stat-item">
                <span className="stat-value">{score}</span>
                <span className="stat-label">Current Score</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{currentQuestionIndex + 1}</span>
                <span className="stat-label">Question</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{questions.length - currentQuestionIndex - 1}</span>
                <span className="stat-label">Remaining</span>
              </div>
            </div>

            <div className="game-controls">
              <button className="btn btn-primary" onClick={resumeGame}>
                Resume
              </button>
              <button className="btn btn-secondary" onClick={goToMainMenu}>
                Main Menu
              </button>
              <button className="btn btn-danger" onClick={stopGame}>
                End Game
              </button>
            </div>
          </div>
        )}

        {/* Game Finished - Scoreboard */}
        {gameState === GAME_STATES.FINISHED && (
          <Scoreboard
            score={score}
            totalQuestions={questions.length}
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            timeElapsed={timeElapsed}
            onPlayAgain={playAgain}
            onMainMenu={goToMainMenu}
          />
        )}
      </div>
    </div>
  );
}

export default App;
