import './App.css';
import Streamer from './Streamer'
import Nav from './components/Nav'
import UserPage from './components/UserPage'
import { BrowserRouter as Router,Route} from "react-router-dom"


function App() {
  return (
    <div className="App">
<Router>
<Nav/>



      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

<Route  path="/" exact component={Streamer} />
<Route  path="/users"  component={UserPage} />

</Router>

    </div>
  );
}

export default App;
