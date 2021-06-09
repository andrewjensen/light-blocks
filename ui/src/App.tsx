import { useEffect } from 'react';
import styled from '@emotion/styled';
import { io } from 'socket.io-client';

import TopBar from './TopBar';
import Editor from './Editor';
import { useState } from 'react';

export type InterpreterEvent =
  | { type: 'STATUS_RUNNING' }
  | { type: 'STATUS_STOPPED' }
  | { type: 'CURRENT_BLOCK', id: string | null };

const SERVER_HOST = 'http://localhost:4000';

function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);
  const [program, setProgram] = useState<string>('');

  useEffect(() => {
    const socket = io(SERVER_HOST);

    socket.on('message', (data) => {
      const event = data as InterpreterEvent;
      switch (event.type) {
        case 'STATUS_RUNNING':
          return setIsRunning(true);
        case 'STATUS_STOPPED':
          return setIsRunning(false);
        case 'CURRENT_BLOCK':
          return setCurrentBlockId(event.id);
        default:
          throw new Error(`Unhandled event type: ${event}`);
      }
    });
  }, []);

  const handleRun = async () => {
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
      <TopBar isRunning={isRunning} onRun={handleRun} />
      <Editor
        currentBlockId={currentBlockId}
        onUpdateProgram={handleUpdateProgram}
      />
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
