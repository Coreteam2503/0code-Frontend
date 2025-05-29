import React from 'react';

const Scoreboard = ({ 
  score, 
  totalQuestions, 
  correctAnswers, 
  incorrectAnswers, 
  timeElapsed,
  onPlayAgain,
  onMainMenu 
}) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const accuracy = correctAnswers > 0 ? Math.round((correctAnswers / (correctAnswers + incorrectAnswers)) * 100) : 0;

  const getScoreMessage = () => {
    if (percentage >= 90) return '🏆 Excellent!';
    if (percentage >= 75) return '🎉 Great job!';
    if (percentage >= 60) return '👍 Good work!';
    if (percentage >= 40) return '📚 Keep studying!';
    return '💪 Practice makes perfect!';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="scoreboard">
      <h2>🎯 Game Complete!</h2>
      
      <div className="final-score">
        {score} / {totalQuestions}
      </div>
      
      <div className="success">
        {getScoreMessage()}
      </div>
      
      <div className="score-details">
        <div className="score-stat">
          <span>Accuracy:</span>
          <strong>{percentage}%</strong>
        </div>
        
        <div className="score-stat">
          <span>Correct Answers:</span>
          <strong style={{ color: '#28a745' }}>{correctAnswers}</strong>
        </div>
        
        <div className="score-stat">
          <span>Incorrect Answers:</span>
          <strong style={{ color: '#dc3545' }}>{incorrectAnswers}</strong>
        </div>
        
        <div className="score-stat">
          <span>Time Elapsed:</span>
          <strong>{formatTime(timeElapsed)}</strong>
        </div>
        
        {totalQuestions > 0 && (
          <div className="score-stat">
            <span>Average Time per Question:</span>
            <strong>{formatTime(Math.round(timeElapsed / totalQuestions))}</strong>
          </div>
        )}
      </div>
      
      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-value">{percentage}%</span>
          <span className="stat-label">Score</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{correctAnswers}</span>
          <span className="stat-label">Correct</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-value">{incorrectAnswers}</span>
          <span className="stat-label">Wrong</span>
        </div>
      </div>
      
      <div className="game-controls">
        <button className="btn btn-primary" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn btn-secondary" onClick={onMainMenu}>
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
