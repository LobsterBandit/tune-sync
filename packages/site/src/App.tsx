/* eslint-disable no-console */
import React from 'react';
import { Button } from '@tune-sync/web';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>More text</div>
      <Button onClick={() => console.log('clicked')}>Click me</Button>
    </div>
  );
};

export default App;
