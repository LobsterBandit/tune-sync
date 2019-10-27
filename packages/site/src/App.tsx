import React, { useState, useCallback } from 'react';
import JSONTree from 'react-json-tree';
import styled, { createGlobalStyle } from 'styled-components';
import { DropPlace } from './DropPlace';
import { PandoraTrackFeedback } from '@tune-sync/pandora';

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
  font-size: 0.9em;

  & > pre {
    text-align: center;
  }
`;

const theme = {
  scheme: 'default',
  author: 'chris kempson (http://chriskempson.com)',
  base00: '#181818',
  base01: '#282828',
  base02: '#383838',
  base03: '#585858',
  base04: '#b8b8b8',
  base05: '#d8d8d8',
  base06: '#e8e8e8',
  base07: '#f8f8f8',
  base08: '#ab4642',
  base09: '#dc9656',
  base0A: '#f7ca88',
  base0B: '#a1b56c',
  base0C: '#86c1b9',
  base0D: '#7cafc2',
  base0E: '#ba8baf',
  base0F: '#a16946',
};

const App = () => {
  const [data, setData] = useState<PandoraTrackFeedback[]>([]);

  const handleSuccessfulParse = useCallback(
    (parsedData: PandoraTrackFeedback[]) => {
      setData(parsedData);
    },
    [setData],
  );

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
          <DropPlace onFileParse={handleSuccessfulParse} />
        </UploadZone>
        <DisplayResult>
          {data.length > 0 ? (
            <React.Fragment>
              <div>
                Some analysis of data. Maybe filters based on station, artist,
                etc
              </div>
              <JSONTree data={data} theme={theme} />
            </React.Fragment>
          ) : (
            <pre>Your uploaded data appears here after successful parsing</pre>
          )}
        </DisplayResult>
      </FlexContainer>
    </Body>
  );
};

export default App;
