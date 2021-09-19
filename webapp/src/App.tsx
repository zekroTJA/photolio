import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { PageContainer } from 'components/PageContainer';
import { ThemeSwitch } from 'components/ThemeSwitch';
import { UpdateThemeProvider } from 'components/ThemeUpdateProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AboutRoute } from 'routes/about/About';
import { ContactRoute } from 'routes/contact/Contact';
import { ImageRoute } from 'routes/image/Image';
import { LocalStorageService } from 'services/LocalStorageService';
import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { HomeRoute } from './routes/home/Home';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(p) => (p.theme.dark ? '#0f0f0f' : 'white')};
    color: ${(p) => (p.theme.dark ? 'white' : 'black')};

    a {
      color: ${(p) => (p.theme.dark ? 'white' : 'black')};
    }
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
`;

let theme: DefaultTheme = {
  dark: LocalStorageService.get(
    'themeOverride',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )!,
};

function App() {
  return (
    <div>
      <UpdateThemeProvider theme={theme}>
        <ThemeSwitch />
        <Router>
          <PageContainer>
            <Header />
            <Route exact path="/" component={HomeRoute} />
            <Route exact path="/about" component={AboutRoute} />
            <Route exact path="/contact" component={ContactRoute} />
            <Route exact path="/images/:id" component={ImageRoute} />
            <Footer />
          </PageContainer>
        </Router>
        <GlobalStyle />
      </UpdateThemeProvider>
    </div>
  );
}

export default App;
