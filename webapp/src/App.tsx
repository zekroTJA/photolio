import { Header } from 'components/Header';
import { PageContainer } from 'components/PageContainer';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { AboutRoute } from 'routes/about/About';
import { ContactRoute } from 'routes/contact/Contact';
import { createGlobalStyle } from 'styled-components';
import { HomeRoute } from './routes/home/Home';

const GlobalStyle = createGlobalStyle`
  box-sizing: border-box;
`;

function App() {
  return (
    <div>
      <Router>
        <PageContainer>
          <Header />
          <Route exact path="/" component={HomeRoute} />
          <Route exact path="/about" component={AboutRoute} />
          <Route exact path="/contact" component={ContactRoute} />
          <Route path="/" render={() => <Redirect to="/" />} />
        </PageContainer>
      </Router>
      <GlobalStyle />
    </div>
  );
}

export default App;
