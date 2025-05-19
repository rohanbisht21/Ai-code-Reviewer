import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState();

  const [review, setReview] = useState(``);
  const [theme, setTheme] = useState('dark');
  const [hasStarted, setHasStarted] = useState(false)
  const [loading, setLoading] = useState(false)

  const sampleCode = `// This function returns the sum of 1 + 1
function sum() {
  return 1 + 1;
}
`;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setReview("");

    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setLoading(false);
      setReview(response.data);
    } catch (error) {
      setReview("❌ Error fetching review.");
    }
  }

  return (
    <>

      <div className='darkTheme'>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='theme-toggle'
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>



      {!hasStarted ? (
        <div className="start-screen">
          <h2>Welcome to AI Code Reviewer</h2>
          <p>Select an option to get started:</p>
          <div className="start-buttons">
            <button
              onClick={() => {
                setCode("");
                setHasStarted(true);
              }}
            >
              ✍️ Write Your Own Code
            </button>
            <button
              onClick={() => {
                setCode(sampleCode);
                setHasStarted(true);
              }}
            >
              💡 Use Sample Code
            </button>
          </div>
        </div>
      ) : (
        <main>




          <div className="left">

            <div className="code">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) =>
                  prism.highlight(code, prism.languages.javascript, "javascript")
                }
                padding={10}
                style={{
                  fontFamily: '"Fira code","Fira Mono",monospace',
                  fontSize: 16,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  height: "100%",
                  width: "100%",
                }}
              />
            </div>
            <div onClick={reviewCode} className="review">
              Review
            </div>
          </div>
          <div className="right">
  {loading ? (
    <div className="loader">⌛ Reviewing your code...</div>
  ) : (
    <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
  )}
</div>
        </main>
      )}
    </>
  );
}

export default App;
