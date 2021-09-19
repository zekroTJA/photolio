import { Header } from 'components/Header';
import { PageContainer } from 'components/PageContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AboutRoute } from 'routes/about/About';
import { ContactRoute } from 'routes/contact/Contact';
import { ImageRoute } from 'routes/image/Image';
import { createGlobalStyle } from 'styled-components';
import { HomeRoute } from './routes/home/Home';

const GlobalStyle = createGlobalStyle`
  box-sizing: border-box;

  h1, h2, h3, h4, h5 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
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
          <Route exact path="/images/:id" component={ImageRoute} />
        </PageContainer>
      </Router>
      <GlobalStyle />
    </div>
  );
}

export default App;
