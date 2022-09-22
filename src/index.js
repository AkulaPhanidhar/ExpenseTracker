import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';
import { Provider } from './context/context';
import './index.css';

ReactDom.render(
  <SpeechProvider appId='3222afb2-ecb9-43da-bcd7-802305357d09' language='en-US'>
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root')
);
