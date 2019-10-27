import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { DropPlace } from './DropPlace';

const GlobalStyle = createGlobalStyle<{ dark?: boolean }>`
  body {
    color: ${props => (props.dark ? 'white' : 'black')};
    background-color: ${props => (props.dark ? 'darkblue' : '#ffffff')}
  }
`;

const Body = styled.div`
  height: 100vh;
  font-size: 1.5em;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UploadZone = styled.div`
  text-align: center;
  background-color: #3668ff;
  color: rgb(255, 255, 255);
  border: 3px solid black;
`;

const WebsiteTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 3px solid orange;

  & > div {
    border: 3px solid;
  }
`;

const DisplayResult = styled.div`
  border: 3px solid red;
  flex: 1;
  text-align: center;
  background-color: lightgrey;
`;

const App = () => {
  return (
    <Body>
      <GlobalStyle />
      <FlexContainer>
        <WebsiteTitle>
          <div>@tune-sync/site</div>
          <div>Pandora</div>
          <div>Github Link</div>
        </WebsiteTitle>
        <UploadZone>
          <DropPlace />
        </UploadZone>
        <DisplayResult>
          <pre>Your parsed uploaded data appears here</pre>
        </DisplayResult>
      </FlexContainer>
    </Body>
  );
};

export default App;
