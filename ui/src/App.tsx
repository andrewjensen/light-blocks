import styled from '@emotion/styled';

import TopBar from './TopBar';
import Editor from './Editor';
import { useState } from 'react';

function App() {
  const [program, setProgram] = useState<string>('');

  const handleRun = () => {
    console.log('TODO: handle run');
    console.log(program);
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
