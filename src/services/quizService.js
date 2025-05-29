import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizService = {
  // Get random questions for the game
  getRandomQuestions: async (count = 10) => {
    try {
      const response = await api.get(`/questions/random?count=${count}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching random questions:', error);
      throw error;
    }
  },

  // Get all questions
  getAllQuestions: async () => {
    try {
      const response = await api.get('/questions');
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },

  // Get questions by difficulty
  getQuestionsByDifficulty: async (difficulty) => {
    try {
      const response = await api.get(`/questions/by-difficulty?difficulty=${difficulty}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions by difficulty:', error);
      throw error;
    }
  },

  // Create a new user
  createUser: async (username, email) => {
    try {
      const response = await api.post('/users', { username, email });
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get user by username
  getUserByUsername: async (username) => {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Start a game session
  startGameSession: async (userId, sessionType = 'PRACTICE') => {
    try {
      const response = await api.post('/game-sessions/start', {
        userId,
        sessionType
      });
      return response.data;
    } catch (error) {
      console.error('Error starting game session:', error);
      throw error;
    }
  },

  // End a game session
  endGameSession: async (sessionId, score, totalQuestions) => {
    try {
      const response = await api.post(`/game-sessions/${sessionId}/end`, {
        score,
        totalQuestions
      });
      return response.data;
    } catch (error) {
      console.error('Error ending game session:', error);
      throw error;
    }
  },

  // Get user game history
  getUserGameHistory: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/game-history`);
      return response.data;
    } catch (error) {
      console.error('Error fetching game history:', error);
      throw error;
    }
  },
};

export default quizService;
