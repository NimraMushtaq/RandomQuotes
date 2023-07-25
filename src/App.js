import './App.css';
import {useState,useEffect} from 'react'

function App() {

  const [isloading, setIsLoading] = useState(true);
  const [quote,setQuote]=useState("");
  const [author,setAuthor]=useState("");
  const [color,setColor]=useState("")
  let colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];
  const getRandomColor=()=>{
    let randNum=Math.floor(Math.random() * colors.length);
    setColor(colors[randNum])
  }

 const getQuote=()=>{
  setIsLoading(true);
    fetch("https://api.quotable.io/random").then(res=>res.json()).then(data=>{
        setQuote(data.content);
        setAuthor(data.author)
    })
        
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
  const handleButtonClick=()=>{
    getQuote();
    getRandomColor();

  }
  useEffect(()=>{
    getQuote();
    getRandomColor();
  },[])
  //Setting body color
    document.body.style.backgroundColor =color
    document.body.style.color =color
  return (

    <div className="App">
        <div id="wrapper">
      <div id="quote-box">
        <div className={`quote-text ${isloading ? 'fade-out' : 'fade-in'}`}>
          <i className="fa fa-quote-left"> </i><span id="text">
           {(isloading)?"Loading....":quote}
          </span>
        </div>
        <div className={`quote-author ${isloading ? 'fade-out' : 'fade-in'}`}>- <span id="author">
          {author}
          </span></div>
        <div className="buttons">
          <a
           style={{ backgroundColor:color}}
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            href='https://twitter.com/intent/tweet?'
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
           style={{ backgroundColor:color}}
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
            href='https://www.tumblr.com/'
          >
            <i className="fa fa-tumblr"></i>
          </a>
          <button onClick={handleButtonClick} className="button" id="new-quote"  style={{ backgroundColor:color}}>New quote</button>
        </div>
      </div>
      <div className="footer">by <a href="#">Nimra Mushtaq</a></div>
    </div>
    </div>
  );
}

export default App;
