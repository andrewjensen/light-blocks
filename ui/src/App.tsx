import styled from '@emotion/styled';

import TopBar from './TopBar';
import Editor from './Editor';
import { useState } from 'react';

const SERVER_HOST = 'http://localhost:4000';

function App() {
  const [program, setProgram] = useState<string>('');

  const handleRun = async () => {
    console.log('TODO: handle run');
    console.log(program);

    const response = await fetch(`${SERVER_HOST}/program`, {
      method: 'POST',
      body: program
    });
    const body = await response.text();
    console.log('response body:', body);
  }

  const handleUpdateProgram = (programText: string) => {
    setProgram(programText);
  }

  return (
    <Container>
      <TopBar onRun={handleRun} />
      <Editor onUpdateProgram={handleUpdateProgram} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
