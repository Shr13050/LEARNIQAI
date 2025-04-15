// import { useState, useEffect } from 'react';
// import { chatSession } from '@/utils/AiModel';

// interface QuizQuestion {
//   id: string;
//   type: 'mcq' | 'truefalse' | 'short' | 'subjective';
//   question: string;
//   options?: string[];
//   correctAnswer?: string | string[];
//   explanation?: string;
// }

// interface QuizResult {
//   totalQuestions: number;
//   correctAnswers: number;
//   wrongAnswers: number;
//   score: number;
//   weakAreas: string[];
// }

// const QuizComponent = ({ transcript, videoTitle }: { transcript: any[], videoTitle: string }) => {
//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
//   const [userAnswers, setUserAnswers] = useState<Map<string, { answer: string | string[]; isCorrect: boolean }>>(new Map());

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [quizResults, setQuizResults] = useState<QuizResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [feedback, setFeedback] = useState('');
//   const [showExplanation, setShowExplanation] = useState(false);

//   useEffect(() => {
//     if (transcript.length > 0) {
//       generateQuiz();
//     }
//   }, [transcript]);

//   const generateQuiz = async () => {
//     setLoading(true);
//     try {
//       const transcriptText = transcript.map((item: any) => item.text).join(' ');
      
//       const prompt = `
// Create a comprehensive quiz based on the following video transcript. The quiz should test understanding of key concepts from the video.

// Generate 6 quiz questions with the following distribution:
// - 3 multiple-choice questions (MCQ) with 4 options each
// - 1 true/false question
// - 2 short answer/subjective questions

// For each question, provide:
// 1. Question text
// 2. Question type (mcq, truefalse, short, subjective)
// 3. Options (for MCQs)
// 4. Correct answer(s)
// 5. Brief explanation for the correct answer

// Format your response as a valid JSON array of question objects:

// [
//   {
//     "id": "q1",
//     "type": "mcq",
//     "question": "Question text here?",
//     "options": ["Option A", "Option B", "Option C", "Option D"],
//     "correctAnswer": "Option B",
//     "explanation": "Explanation of why Option B is correct."
//   },
//   {
//     "id": "q2",
//     "type": "truefalse",
//     "question": "True/False question text here?",
//     "options": ["True", "False"],
//     "correctAnswer": "True",
//     "explanation": "Explanation of why True is correct."
//   },
//   {
//     "id": "q3",
//     "type": "short",
//     "question": "Short answer question text here?",
//     "correctAnswer": ["answer1", "answer2", "answer3"],
//     "explanation": "These are acceptable answers because..."
//   }
// ]

// Make sure the questions cover different aspects of the video content, varying in difficulty from basic recall to more complex understanding. Ensure that all questions and answers are directly based on the transcript.

// Video title: ${videoTitle}

// Transcript: ${transcriptText.substring(0, 12000)}
// `;

//       const response = await chatSession.sendMessage(prompt);
//       const quizText = await response.response.text();
      
//       // Clean and parse the JSON
//       const cleanedQuizText = quizText.replace(/```json|```/g, "").trim();
//       const parsedQuiz = JSON.parse(cleanedQuizText);
      
//       setQuiz(parsedQuiz);
//     } catch (error) {
//       console.error('Error generating quiz:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerSelection = (answer: string) => {
//     setSelectedAnswer(answer);
//   };

//   const handleShortAnswerInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setSelectedAnswer(event.target.value);
//   };

//   const handleNextQuestion = () => {
//     if (selectedAnswer) {
//       // Save the current answer
//       setUserAnswers(new Map(userAnswers.set(quiz[currentQuestionIndex].id, selectedAnswer)));
      
//       // Move to next question or submit quiz
//       if (currentQuestionIndex < quiz.length - 1) {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//         setSelectedAnswer('');
//         setShowExplanation(false);
//         setFeedback('');
//       } else {
//         submitQuiz();
//       }
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       // Retrieve previous answer if exists
//       const prevAnswer = userAnswers.get(quiz[currentQuestionIndex - 1].id);
//       if (prevAnswer) setSelectedAnswer(prevAnswer);
//       setShowExplanation(false);
//       setFeedback('');
//     }
//   };

//   const checkCurrentAnswer = async () => {
//     const currentQuestion = quiz[currentQuestionIndex];
    
//     if (!selectedAnswer) return;
    
//     setLoading(true);
    
//     try {
//       let isCorrect = false;
      
//       if (currentQuestion.type === 'mcq' || currentQuestion.type === 'truefalse') {
//         isCorrect = selectedAnswer === currentQuestion.correctAnswer;
//         setFeedback(isCorrect ? "✅ Correct!" : "❌ Incorrect");
//       } else {
//         // For short and subjective answers, use AI to check
//         const prompt = `
// Evaluate if the user's answer to the following question is correct:

// Question: ${currentQuestion.question}

// Correct answer(s): ${JSON.stringify(currentQuestion.correctAnswer)}

// User's answer: "${selectedAnswer}"

// First, determine if the user's answer is correct or substantially correct (allowing for minor differences in wording).
// Then provide brief but helpful feedback explaining why the answer is correct or incorrect.

// Respond in the following JSON format:
// {
//   "isCorrect": true/false,
//   "feedback": "Your feedback here"
// }
// `;

//         const response = await chatSession.sendMessage(prompt);
//         const evaluationText = await response.response.text();
        
//         // Parse the evaluation
//         const cleanedEvaluation = evaluationText.replace(/```json|```/g, "").trim();
//         const evaluation = JSON.parse(cleanedEvaluation);
        
//         isCorrect = evaluation.isCorrect;
//         setFeedback(isCorrect ? `✅ Correct! ${evaluation.feedback}` : `❌ ${evaluation.feedback}`);
//       }
      
//       // Update the userAnswers with correctness
//       const updatedAnswer = {
//         answer: selectedAnswer,
//         isCorrect
//       };
      
//       setUserAnswers(new Map(userAnswers.set(currentQuestion.id, updatedAnswer)));
//       setShowExplanation(true);
      
//     } catch (error) {
//       console.error('Error checking answer:', error);
//       setFeedback("Error evaluating your answer. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitQuiz = async () => {
//     setLoading(true);
    
//     try {
//       // Save final answer if not already saved
//       if (selectedAnswer) {
//         setUserAnswers(new Map(userAnswers.set(quiz[currentQuestionIndex].id, selectedAnswer)));
//       }
      
//       const userAnswersArray = Array.from(userAnswers.entries()).map(([id, answer]) => {
//         return {
//           id,
//           question: quiz.find(q => q.id === id)?.question,
//           type: quiz.find(q => q.id === id)?.type,
//           userAnswer: answer,
//           correctAnswer: quiz.find(q => q.id === id)?.correctAnswer
//         };
//       });
      
//       const prompt = `
// Analyze the user's quiz performance and provide insights:

// Quiz questions and answers:
// ${JSON.stringify(userAnswersArray)}

// Please provide:
// 1. The number of correct answers
// 2. The overall score as a percentage
// 3. Identify weak areas based on the questions answered incorrectly
// 4. Brief overall feedback on performance

// Respond in the following JSON format:
// {
//   "totalQuestions": ${quiz.length},
//   "correctAnswers": number,
//   "wrongAnswers": number,
//   "score": percentage,
//   "weakAreas": ["topic1", "topic2"],
//   "feedback": "Overall feedback here"
// }
// `;

//       const response = await chatSession.sendMessage(prompt);
//       const resultsText = await response.response.text();
      
//       // Parse the evaluation
//       const cleanedResults = resultsText.replace(/```json|```/g, "").trim();
//       const results = JSON.parse(cleanedResults);
      
//       setQuizResults(results);
//       setIsSubmitted(true);
      
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const restartQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedAnswer('');
//     setUserAnswers(new Map());
//     setIsSubmitted(false);
//     setQuizResults(null);
//     setFeedback('');
//     setShowExplanation(false);
//   };

//   if (loading && quiz.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
//         <p className="ml-4 text-lg text-purple-800">Generating quiz questions...</p>
//       </div>
//     );
//   }

//   if (quiz.length === 0) {
//     return (
//       <div className="text-center text-gray-600">
//         No quiz available. Please analyze a video first.
//       </div>
//     );
//   }

//   if (isSubmitted && quizResults) {
//     return (
//       <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-200">
//         <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">
//           Quiz Results 📊
//         </h2>
        
//         <div className="flex justify-center mb-8">
//           <div className="w-48 h-48 relative">
//             <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
//               <div className="text-4xl font-bold text-purple-800">{quizResults.score}%</div>
//             </div>
//             <svg className="absolute top-0 left-0" width="192" height="192" viewBox="0 0 192 192">
//               <circle
//                 cx="96"
//                 cy="96"
//                 r="90"
//                 fill="none"
//                 stroke="#d1d5db"
//                 strokeWidth="12"
//               />
//               <circle
//                 cx="96"
//                 cy="96"
//                 r="90"
//                 fill="none"
//                 stroke="#8b5cf6"
//                 strokeWidth="12"
//                 strokeDasharray={`${2 * Math.PI * 90}`}
//                 strokeDashoffset={`${2 * Math.PI * 90 * (1 - quizResults.score / 100)}`}
//                 strokeLinecap="round"
//                 transform="rotate(-90 96 96)"
//               />
//             </svg>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-8">
//           <div className="bg-purple-100 p-4 rounded-xl text-center">
//             <p className="text-sm text-purple-700">Total Questions</p>
//             <p className="text-3xl font-bold text-purple-900">{quizResults.totalQuestions}</p>
//           </div>
//           <div className="bg-green-100 p-4 rounded-xl text-center">
//             <p className="text-sm text-green-700">Correct Answers</p>
//             <p className="text-3xl font-bold text-green-700">{quizResults.correctAnswers}</p>
//           </div>
//           <div className="bg-red-100 p-4 rounded-xl text-center">
//             <p className="text-sm text-red-700">Wrong Answers</p>
//             <p className="text-3xl font-bold text-red-700">{quizResults.wrongAnswers}</p>
//           </div>
//           <div className="bg-blue-100 p-4 rounded-xl text-center">
//             <p className="text-sm text-blue-700">Score</p>
//             <p className="text-3xl font-bold text-blue-700">{quizResults.score}%</p>
//           </div>
//         </div>

//         {quizResults.weakAreas && quizResults.weakAreas.length > 0 && (
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Areas to Improve:</h3>
//             <ul className="list-disc list-inside space-y-1">
//               {quizResults.weakAreas.map((area, index) => (
//                 <li key={index} className="text-red-600">{area}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* {quizResults.feedback && (
//           <div className="bg-purple-50 p-4 rounded-xl mb-8">
//             <h3 className="text-lg font-semibold text-purple-800 mb-2">Feedback:</h3>
//             <p className="text-gray-700">{quizResults.feedback}</p>
//           </div>
//         )} */}

//         <button
//           onClick={restartQuiz}
//           className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-md"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   const currentQuestion = quiz[currentQuestionIndex];

//   return (
//     <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-200">
//       <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
//         Video Knowledge Quiz 🧠
//       </h2>
      
//       {/* Progress Indicator */}
//       <div className="mb-6">
//         <div className="flex justify-between text-sm text-purple-700 mb-2">
//           <span>Question {currentQuestionIndex + 1} of {quiz.length}</span>
//           <span>{Math.round(((currentQuestionIndex + 1) / quiz.length) * 100)}% Complete</span>
//         </div>
//         <div className="w-full bg-purple-100 rounded-full h-2.5">
//           <div 
//             className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full"
//             style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
//           ></div>
//         </div>
//       </div>
      
//       {/* Question */}
//       <div className="mb-6">
//         <h3 className="text-xl font-medium text-gray-800 mb-4">
//           {currentQuestion?.question}
//         </h3>
        
//         {/* Question Type Badge */}
//         <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
//           {currentQuestion?.type === 'mcq' && 'Multiple Choice'}
//           {currentQuestion?.type === 'truefalse' && 'True or False'}
//           {currentQuestion?.type === 'short' && 'Short Answer'}
//           {currentQuestion?.type === 'subjective' && 'Subjective'}
//         </div>
        
//         {/* Answer Options */}
//         <div className="space-y-3 mt-2">
//           {currentQuestion?.type === 'mcq' || currentQuestion?.type === 'truefalse' ? (
//             currentQuestion.options?.map((option, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleAnswerSelection(option)}
//                 className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                   selectedAnswer === option
//                     ? 'bg-purple-100 border-purple-500'
//                     : 'bg-white/60 border-gray-200 hover:border-purple-300'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
//                     selectedAnswer === option ? 'border-purple-500' : 'border-gray-300'
//                   }`}>
//                     {selectedAnswer === option && (
//                       <div className="w-3 h-3 rounded-full bg-purple-500"></div>
//                     )}
//                   </div>
//                   <span>{option}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="mt-4">
//               <textarea
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px] bg-white/60"
//                 placeholder="Type your answer here..."
//                 value={selectedAnswer as string}
//                 onChange={handleShortAnswerInput}
//               ></textarea>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Feedback Area */}
//       {feedback && (
//         <div className={`p-4 rounded-lg mb-6 ${
//           feedback.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
//         }`}>
//           <p className="font-medium">{feedback}</p>
          
//           {showExplanation && currentQuestion.explanation && (
//             <div className="mt-2 pt-2 border-t border-gray-200">
//               <p className="text-gray-700">{currentQuestion.explanation}</p>
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Action Buttons */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={handlePreviousQuestion}
//           disabled={currentQuestionIndex === 0}
//           className={`px-6 py-2 rounded-lg font-medium ${
//             currentQuestionIndex === 0
//               ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//               : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//           }`}
//         >
//           Previous
//         </button>
        
//         <div className="flex space-x-3">
//           <button
//             onClick={checkCurrentAnswer}
//             disabled={!selectedAnswer || loading}
//             className={`px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
//           >
//             {loading ? 'Checking...' : 'Check Answer'}
//           </button>
          
//           <button
//             onClick={handleNextQuestion}
//             disabled={!selectedAnswer || loading}
//             className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
//           >
//             {currentQuestionIndex === quiz.length - 1 ? 'Submit Quiz' : 'Next Question'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizComponent;
import { useState, useEffect } from 'react';
import { chatSession } from '@/utils/AiModel';

interface QuizQuestion {
  id: string;
  type: 'mcq' | 'truefalse' | 'short' | 'subjective';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  weakAreas: string[];
  feedback?: string;
}

interface UserAnswer {
  answer: string | string[];
  isCorrect: boolean;
}

const QuizComponent = ({ transcript, videoTitle }: { transcript: any[], videoTitle: string }) => {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>('');
  const [userAnswers, setUserAnswers] = useState<Map<string, UserAnswer>>(new Map());

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (transcript.length > 0) {
      generateQuiz();
    }
  }, [transcript]);

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const transcriptText = transcript.map((item: any) => item.text).join(' ');
      
      const prompt = `
Create a comprehensive quiz based on the concepts and topics in the video transcript. The quiz should test understanding of key concepts from the video.

Generate 6 quiz questions with the following distribution:
- 3 multiple-choice questions (MCQ) with 4 options each
- 1 true/false question
- 2 short answer/subjective questions

For each question, provide:
1. Question text
2. Question type (mcq, truefalse, short, subjective)
3. Options (for MCQs)
4. Correct answer(s)
5. Brief explanation for the correct answer
6.Related other Youtube video link to understand the concept 

Format your response as a valid JSON array of question objects:

[
  {
    "id": "q1",
    "type": "mcq",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option B",
    "explanation": "Explanation of why Option B is correct."
    "link":"youtube video link"
  },
  {
    "id": "q2",
    "type": "truefalse",
    "question": "True/False question text here?",
    "options": ["True", "False"],
    "correctAnswer": "True",
    "explanation": "Explanation of why True is correct."
    "link":"youtube video link"
  },
  {
    "id": "q3",
    "type": "short",
    "question": "Short answer question text here?",
    "correctAnswer": ["answer1", "answer2", "answer3"],
    "explanation": "These are acceptable answers because..."
    "link":"youtube video link"
  }
]

Make sure the questions cover different aspects of the video content, varying in difficulty from basic recall to more complex understanding. Ensure that all questions and answers are directly based on the transcript concept and should test user's knowledge on the concept ,not memory of what is in the transcript.

Video title: ${videoTitle}

Transcript: ${transcriptText.substring(0, 12000)}
`;

      const response = await chatSession.sendMessage(prompt);
      const quizText = await response.response.text();
      
      // Clean and parse the JSON
      const cleanedQuizText = quizText.replace(/```json|```/g, "").trim();
      const parsedQuiz = JSON.parse(cleanedQuizText);
      
      setQuiz(parsedQuiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleShortAnswerInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      // Find existing answer check result or use a default if not checked yet
      const existingAnswer = userAnswers.get(quiz[currentQuestionIndex].id);
      const currentAnswerData = existingAnswer || {
        answer: selectedAnswer,
        isCorrect: false // Default to false if not checked
      };
      
      // Save the current answer
      setUserAnswers(new Map(userAnswers.set(quiz[currentQuestionIndex].id, currentAnswerData)));
      
      // Move to next question or submit quiz
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setShowExplanation(false);
        setFeedback('');
      } else {
        submitQuiz();
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Retrieve previous answer if exists
      const prevAnswer = userAnswers.get(quiz[currentQuestionIndex - 1].id);
      if (prevAnswer) setSelectedAnswer(prevAnswer.answer);
      setShowExplanation(false);
      setFeedback('');
    }
  };

  const checkCurrentAnswer = async () => {
    const currentQuestion = quiz[currentQuestionIndex];
    
    if (!selectedAnswer) return;
    
    setLoading(true);
    
    try {
      let isCorrect = false;
      
      if (currentQuestion.type === 'mcq' || currentQuestion.type === 'truefalse') {
        isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        setFeedback(isCorrect ? "✅ Correct!" : "❌ Incorrect");
      } else {
        // For short and subjective answers, use AI to check
        const prompt = `
Evaluate if the user's answer to the following question is correct:

Question: ${currentQuestion.question}

Correct answer(s): ${JSON.stringify(currentQuestion.correctAnswer)}

User's answer: "${selectedAnswer}"

First, determine if the user's answer is correct or substantially correct (allowing for minor differences in wording).
Then provide brief but helpful feedback explaining why the answer is correct or incorrect.

Respond in the following JSON format:
{
  "isCorrect": true/false,
  "feedback": "Your feedback here"
  "Recommended Youtube Video":" link to other youtube video to clear the concept"
}
`;

        const response = await chatSession.sendMessage(prompt);
        const evaluationText = await response.response.text();
        
        // Parse the evaluation
        const cleanedEvaluation = evaluationText.replace(/```json|```/g, "").trim();
        const evaluation = JSON.parse(cleanedEvaluation);
        
        isCorrect = evaluation.isCorrect;
        setFeedback(isCorrect ? `✅ Correct! ${evaluation.feedback}` : `❌ ${evaluation.feedback}`);
      }
      
      // Update the userAnswers with correctness
      const updatedAnswer: UserAnswer = {
        answer: selectedAnswer,
        isCorrect
      };
      
      setUserAnswers(new Map(userAnswers.set(currentQuestion.id, updatedAnswer)));
      setShowExplanation(true);
      
    } catch (error) {
      console.error('Error checking answer:', error);
      setFeedback("Error evaluating your answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    
    try {
      // Save final answer if not already saved
      if (selectedAnswer) {
        const existingAnswer = userAnswers.get(quiz[currentQuestionIndex].id);
        
        if (!existingAnswer) {
          // If answer wasn't checked, just store it without validation
          const finalAnswer: UserAnswer = {
            answer: selectedAnswer,
            isCorrect: false // Default to false if not checked
          };
          
          setUserAnswers(new Map(userAnswers.set(quiz[currentQuestionIndex].id, finalAnswer)));
        }
      }
      
      const userAnswersArray = Array.from(userAnswers.entries()).map(([id, answerData]) => {
        return {
          id,
          question: quiz.find(q => q.id === id)?.question,
          type: quiz.find(q => q.id === id)?.type,
          userAnswer: answerData.answer,
          isCorrect: answerData.isCorrect,
          correctAnswer: quiz.find(q => q.id === id)?.correctAnswer
        };
      });
      
      const prompt = `
Analyze the user's quiz performance and provide insights:

Quiz questions and answers:
${JSON.stringify(userAnswersArray)}

Please provide:
1. The number of correct answers
2. The overall score as a percentage
3. Identify weak areas based on the questions answered incorrectly
4. Brief overall feedback on performance

Respond in the following JSON format:
{
  "totalQuestions": ${quiz.length},
  "correctAnswers": number,
  "wrongAnswers": number,
  "score": percentage,
  "weakAreas": ["topic1", "topic2"],
  "feedback": "Overall feedback here"
}
`;

      const response = await chatSession.sendMessage(prompt);
      const resultsText = await response.response.text();
      
      // Parse the evaluation
      const cleanedResults = resultsText.replace(/```json|```/g, "").trim();
      const results = JSON.parse(cleanedResults);
      
      setQuizResults(results);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setUserAnswers(new Map());
    setIsSubmitted(false);
    setQuizResults(null);
    setFeedback('');
    setShowExplanation(false);
  };

  if (loading && quiz.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        <p className="ml-4 text-lg text-purple-800">Generating quiz questions...</p>
      </div>
    );
  }

  if (quiz.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No quiz available. Please analyze a video first.
      </div>
    );
  }

  if (isSubmitted && quizResults) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-200">
        <h2 className="text-3xl font-bold text-purple-900 mb-6 text-center">
          Quiz Results 📊
        </h2>
        
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 relative">
            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
              <div className="text-4xl font-bold text-purple-800">{quizResults.score}%</div>
            </div>
            <svg className="absolute top-0 left-0" width="192" height="192" viewBox="0 0 192 192">
              <circle
                cx="96"
                cy="96"
                r="90"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="90"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - quizResults.score / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 96 96)"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-purple-100 p-4 rounded-xl text-center">
            <p className="text-sm text-purple-700">Total Questions</p>
            <p className="text-3xl font-bold text-purple-900">{quizResults.totalQuestions}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl text-center">
            <p className="text-sm text-green-700">Correct Answers</p>
            <p className="text-3xl font-bold text-green-700">{quizResults.correctAnswers}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-xl text-center">
            <p className="text-sm text-red-700">Wrong Answers</p>
            <p className="text-3xl font-bold text-red-700">{quizResults.wrongAnswers}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl text-center">
            <p className="text-sm text-blue-700">Score</p>
            <p className="text-3xl font-bold text-blue-700">{quizResults.score}%</p>
          </div>
        </div>

        {quizResults.weakAreas && quizResults.weakAreas.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Areas to Improve:</h3>
            <ul className="list-disc list-inside space-y-1">
              {quizResults.weakAreas.map((area, index) => (
                <li key={index} className="text-red-600">{area}</li>
              ))}
            </ul>
          </div>
        )}

        {quizResults.feedback && (
          <div className="bg-purple-50 p-4 rounded-xl mb-8">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Feedback:</h3>
            <p className="text-gray-700">{quizResults.feedback}</p>
          </div>
        )}

        <button
          onClick={restartQuiz}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-200">
      <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
        Video Knowledge Quiz 
      </h2>
      
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-purple-700 mb-2">
          <span>Question {currentQuestionIndex + 1} of {quiz.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / quiz.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-purple-100 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full"
            style={{ width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          {currentQuestion?.question}
        </h3>
        
        {/* Question Type Badge */}
        <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
          {currentQuestion?.type === 'mcq' && 'Multiple Choice'}
          {currentQuestion?.type === 'truefalse' && 'True or False'}
          {currentQuestion?.type === 'short' && 'Short Answer'}
          {currentQuestion?.type === 'subjective' && 'Subjective'}
        </div>
        
        {/* Answer Options */}
        <div className="space-y-3 mt-2">
          {currentQuestion?.type === 'mcq' || currentQuestion?.type === 'truefalse' ? (
            currentQuestion.options?.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === option
                    ? 'bg-purple-100 border-purple-500'
                    : 'bg-white/60 border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                    selectedAnswer === option ? 'border-purple-500' : 'border-gray-300'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-4">
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px] bg-white/60"
                placeholder="Type your answer here..."
                value={selectedAnswer as string}
                onChange={handleShortAnswerInput}
              ></textarea>
            </div>
          )}
        </div>
      </div>
      
      {/* Feedback Area */}
      {feedback && (
        <div className={`p-4 rounded-lg mb-6 ${
          feedback.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="font-medium">{feedback}</p>
          
          {showExplanation && currentQuestion.explanation && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-2 rounded-lg font-medium ${
            currentQuestionIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={checkCurrentAnswer}
            disabled={!selectedAnswer || loading}
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Checking...' : 'Check Answer'}
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer || loading}
            className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {currentQuestionIndex === quiz.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;