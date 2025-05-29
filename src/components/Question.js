import React, { useState, useEffect } from 'react';

const Question = ({ 
  question, 
  onAnswer, 
  showResult = false, 
  selectedAnswer = null,
  correctAnswer = null 
}) => {
  const [selected, setSelected] = useState(selectedAnswer);
  
  useEffect(() => {
    setSelected(selectedAnswer);
  }, [selectedAnswer]);

  if (!question) {
    return (
      <div className="question-container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  // Generate multiple choice options based on the correct answer
  const generateChoices = (correctAnswer, questionText) => {
    if (!correctAnswer) return [];

    // For "What does this mean?" type questions, we'll create plausible alternatives
    const choices = [correctAnswer];
    
    // Add some generic wrong answers for demonstration
    // In a real implementation, you might want to generate these more intelligently
    const wrongAnswers = [
      'A syntax error in the code',
      'A runtime exception',
      'A deprecated method call',
      'An undefined variable reference',
      'A memory allocation issue',
      'A type conversion error'
    ].filter(answer => answer !== correctAnswer);

    // Add 3 random wrong answers
    while (choices.length < 4 && wrongAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
      choices.push(wrongAnswers.splice(randomIndex, 1)[0]);
    }

    // Shuffle the choices
    return choices.sort(() => Math.random() - 0.5);
  };

  const choices = generateChoices(question.answer, question.questionText);

  const handleChoiceClick = (choice) => {
    if (showResult) return; // Don't allow selection if showing results
    
    setSelected(choice);
    onAnswer(choice);
  };

  const getChoiceClass = (choice) => {
    let className = 'choice-btn';
    
    if (selected === choice) {
      className += ' selected';
    }
    
    if (showResult) {
      if (choice === correctAnswer) {
        className += ' correct';
      } else if (choice === selected && choice !== correctAnswer) {
        className += ' incorrect';
      }
    }
    
    return className;
  };

  return (
    <div className="question-container">
      <div className="question-text">
        <strong>What does this mean?</strong>
        <br />
        {question.questionText}
      </div>
      
      {question.codeSnippet && (
        <div className="code-snippet">
          {question.codeSnippet}
        </div>
      )}
      
      <div className="choices-container">
        {choices.map((choice, index) => (
          <button
            key={index}
            className={getChoiceClass(choice)}
            onClick={() => handleChoiceClick(choice)}
            disabled={showResult}
          >
            {String.fromCharCode(65 + index)}. {choice}
          </button>
        ))}
      </div>
      
      {showResult && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          {selected === correctAnswer ? (
            <div className="success">✓ Correct!</div>
          ) : (
            <div className="error">✗ Incorrect. The correct answer was: {correctAnswer}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
