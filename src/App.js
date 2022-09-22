import React, { useEffect, useRef } from 'react';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import { Grid } from '@material-ui/core';
import { SpeechState, useSpeechContext } from '@speechly/react-client';
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from '@speechly/react-ui';
import { gsap, Power3 } from 'gsap';
import useStyles from './styles';

const App = () => {
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const incomeDesktop = useRef(null);
  const incomeMobile = useRef(null);
  const expense = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  useEffect(() => {
    gsap.from(
      main.current,
      2,
      { y: -100, opacity: 0, ease: Power3.easeOut, delay: 2.0 },
      8.0
    );
    gsap.from(
      incomeDesktop.current,
      2,
      { y: -50, opacity: 0, ease: Power3.easeOut, delay: 2.5 },
      8.0
    );
    gsap.from(
      incomeMobile.current,
      2,
      { y: -50, opacity: 0, ease: Power3.easeOut, delay: 2.5 },
      8.0
    );
    gsap.from(
      expense.current,
      2,
      { y: -50, opacity: 0, ease: Power3.easeOut, delay: 2.5 },
      8.0
    );
  }, []);

  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        className={classes.grid}
        spacing={0}
        alignItems='center'
        justify='center'
        style={{ height: '100vh' }}
      >
        <Grid ref={incomeMobile} item xs={12} sm={4} className={classes.mobile}>
          <Details title='Income' />
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid
          ref={incomeDesktop}
          item
          xs={12}
          sm={4}
          className={classes.desktop}
        >
          <Details title='Income' />
        </Grid>
        <Grid ref={expense} item xs={12} sm={4} className={classes.last}>
          <Details title='Expense' />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
