# Jupyter Quiz Game - Frontend

A React-based quiz game interface that connects to the Jupyter Quiz Spring Boot backend.

## Features

### 🎯 Game UI Shell
- Clean, modern interface with glassmorphism design
- Responsive layout that works on desktop and mobile
- Animated transitions and hover effects

### ⏱️ Timer System
- 60-second countdown timer
- Visual warnings at 30 seconds (yellow) and 10 seconds (red pulse)
- Automatic game end when time runs out
- Timer pause/resume functionality

### 🎮 Game Controls
- **Start**: Begin a new game session
- **Pause/Resume**: Pause and resume gameplay
- **Stop**: End the current game
- **Replay**: Start a new game after completion

### ❓ Question System
- **"What does this mean?"** question type
- Display code snippets with syntax highlighting
- Multiple-choice answers (4 options)
- Immediate feedback on correct/incorrect answers
- Auto-advance to next question after 2 seconds

### 📊 Scoreboard
- Final score display with percentage
- Detailed statistics:
  - Correct vs incorrect answers
  - Time elapsed
  - Average time per question
  - Accuracy percentage
- Motivational messages based on performance
- Options to play again or return to main menu

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Running Jupyter Quiz backend (Spring Boot application)

### Installation

1. **Install dependencies:**
   ```bash
   cd C:\Users\jcupp\coderepos\0code\frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - Open your browser and go to `http://localhost:3000`
   - The app will automatically connect to the backend at `http://localhost:8080`

### Backend Integration

The frontend expects the Spring Boot backend to be running on `http://localhost:8080`. Make sure to:

1. Start the backend application first
2. Ensure CORS is properly configured (already done in your backend)
3. Have questions loaded in the database (via notebook upload or direct insertion)

### Environment Configuration

You can customize the backend API URL by setting the environment variable:
```bash
REACT_APP_API_URL=http://your-backend-url:port/api
```

## Game Flow

1. **Main Menu**: Shows available questions count and game settings
2. **Game Start**: Timer begins, first question appears
3. **Question Interaction**: 
   - Read the "What does this mean?" prompt
   - View code snippet (if available)
   - Select from 4 multiple-choice answers
   - Get immediate feedback
4. **Game End**: Either time runs out or all questions completed
5. **Scoreboard**: View detailed results and choose next action

## Technical Features

### State Management
- React hooks for local state management
- Persistent game state during pause/resume
- Error handling with fallback sample questions

### API Integration
- Axios for HTTP requests
- Service layer abstraction
- Graceful fallback when backend is unavailable

### Responsive Design
- Mobile-first CSS approach
- Flexible layouts that adapt to screen size
- Touch-friendly interface elements

### Performance
- Efficient re-rendering with React best practices
- Optimized timer implementation
- Lazy loading of questions

## Sample Questions

If the backend is unavailable, the app includes sample questions covering:
- Basic Python syntax
- Control structures (loops, conditionals)
- Data structures (lists, dictionaries)
- Functions and recursion
- Libraries (pandas, numpy)

## Troubleshooting

### Common Issues

1. **"Failed to load questions"**
   - Check if the backend is running on `http://localhost:8080`
   - Verify the backend has questions in the database
   - The app will use sample questions as fallback

2. **Timer not working**
   - Refresh the page
   - Check browser console for JavaScript errors

3. **Styling issues**
   - Clear browser cache
   - Ensure all CSS files are loaded properly

### Development

To modify the game:
- Edit timer duration in `App.js` (currently 60 seconds)
- Add new question types in `Question.js`
- Customize styling in `index.css`
- Modify API endpoints in `services/quizService.js`

## Future Enhancements

Potential features to add:
- Multiple question types beyond "What does this mean?"
- Difficulty level selection
- User authentication and profiles
- Leaderboards and achievements
- Question categories/tags filtering
- Custom timer settings
- Sound effects and animations
- Multiplayer support

## File Structure

```
src/
├── components/
│   ├── Timer.js          # Countdown timer component
│   ├── Question.js       # Question display and interaction
│   └── Scoreboard.js     # Final results display
├── services/
│   └── quizService.js    # API communication layer
├── App.js                # Main application component
├── index.js              # React app entry point
└── index.css             # Global styles and animations
```
