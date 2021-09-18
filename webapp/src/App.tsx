import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { HomeRoute } from './routes/home/Home';

const GlobalStyle = createGlobalStyle`
  box-sizing: border-box;
`;

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={HomeRoute} />
      </Router>
      <GlobalStyle />
    </div>
  );
}

export default App;
