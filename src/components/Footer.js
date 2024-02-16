import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const defaultTheme = createTheme();

export default function StickyFooter() {
  const [quote, setQuote] = React.useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  React.useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container style={{ marginTop: 8, marginBottom: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            JOKES SITE
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Whenever you feel bored, just get over here.'}
            {' Just refresh for a new joke!'}
          </Typography>
          {quote && (
            <Typography variant="body1">
              <em>"{quote}"</em>
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchQuote()}
            startIcon={<FontAwesomeIcon icon={faArrowCircleRight} />}
            style={{ marginTop: '1rem' }}
          >
            Get Another Quote
          </Button>
        </Container>
        <Box
          component="footer"
          style={{
            padding: '1.5rem 1rem',
            marginTop: 'auto',
            backgroundColor: '#394240',
            color: 'white',
            animation: 'fade-in 1s ease-out',
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              May the Force be with you <FontAwesomeIcon icon={faJedi} />
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

