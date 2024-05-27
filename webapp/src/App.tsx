import { DefaultTheme, createGlobalStyle } from 'styled-components';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AboutRoute } from 'routes/about/About';
import { ContactRoute } from 'routes/contact/Contact';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { HomeRoute } from 'routes/home/Home';
import { ImageRoute } from 'routes/image/Image';
import { LocalStorageService } from 'services/LocalStorageService';
import { PageContainer } from 'components/PageContainer';
import { ThemeSwitch } from 'components/ThemeSwitch';
import { Theming } from 'util/Theming';
import { UpdateThemeProvider } from 'components/ThemeUpdateProvider';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(p) => Theming.backgroundColor(p.theme.dark)};
    color: ${(p) => Theming.textColor(p.theme.dark)};

    a {
      color: ${(p) => Theming.textColor(p.theme.dark)};
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
            <Routes>
              <Route path="/" Component={HomeRoute} />
              <Route path="/about" Component={AboutRoute} />
              <Route path="/contact" Component={ContactRoute} />
              <Route path="/images/:id" Component={ImageRoute} />
            </Routes>
            <Footer />
          </PageContainer>
        </Router>
        <GlobalStyle />
      </UpdateThemeProvider>
    </div>
  );
}

export default App;
