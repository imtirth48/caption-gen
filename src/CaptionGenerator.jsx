import  { useState } from 'react';
import './CaptionGenerator.css';
import hashtag from './Assets/hashtag.jpg';
import ImageUploader from './ImageUploader';
import axios from 'axios';

const CaptionGenerator = () => {                      
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    setLoading(true);
    setAnswer("Loading...");
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBDgxI9ZFlxBRC-cL4AZPwMykHA383bGqM",
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );

      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnswer(generatedText || "No answer generated. Please try again.");
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='ai-caption-generator'>
      <div className="header"><b></b>Caption <span>Generator</span></div>
      <div className="caption-loading">
        <div className="image"><img src={hashtag} alt="Hashtag" /></div>
        <div className="display-box">
          <div className="upload-btn"><ImageUploader/>Upload Image</div>
          <textarea
            className='display-input'
            placeholder='Ask anything'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            cols="30"
          >
          </textarea>
          <button
            onClick={generateAnswer}
            className="bg-blue-300 p-3 rounded hover:bg-blue-400 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Answer"}
          </button>
          <pre className="answer-display">{answer}</pre>
        </div>
      </div>
    </div>
  );
}

export default CaptionGenerator;