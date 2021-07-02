import { useEffect, useCallback, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import styled from '@emotion/styled';
import { io } from 'socket.io-client';

import { SERVER_HOST } from './common/constants';
import { appReducer, INITIAL_STATE } from './appReducer';
import {
  deleteProgram,
  editProgram,
  listPrograms,
} from './common/programsApi';
import TopBar from './TopBar';
import Home from './Home/Home';
import Editor from './Editor/Editor';

export type InterpreterEvent =
  | { type: 'STATUS_RUNNING', programId: number }
  | { type: 'STATUS_STOPPED' }
  | { type: 'CURRENT_BLOCK', blockId: string | null };

function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const loadPrograms = useCallback(async () => {
    const fetchedPrograms = await listPrograms();
    dispatch({ type: 'LOADED_PROGRAMS', programs: fetchedPrograms });
  }, [dispatch]);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

  useEffect(() => {
    const socket = io(SERVER_HOST);

    socket.on('message', (data) => {
      const event = data as InterpreterEvent;
      switch (event.type) {
        case 'STATUS_RUNNING':
          return dispatch({ type: 'INTERPRETER_RUN_PROGRAM', programId: event.programId });
        case 'STATUS_STOPPED':
          return dispatch({ type: 'INTERPRETER_STOP' });
        case 'CURRENT_BLOCK':
          return dispatch({ type: 'INTERPRETER_SET_CURRENT_BLOCK', blockId: event.blockId });
        default:
          throw new Error(`Unhandled event type: ${event}`);
      }
    });
  }, []);

  // FIXME: bring running logic back
  // const handleRun = async () => {
  //   const response = await fetch(`${SERVER_HOST}/program`, {
  //     method: 'POST',
  //     body: source
  //   });
  //   const body = await response.text();
  //   console.log('response body:', body);
  // }

  const handleUpdateSource = async (programId: number, source: string) => {
    console.log('setting source:', source);
    await editProgram(programId, { source });
    dispatch({ type: 'PROGRAM_SET_SOURCE', programId, source });
  }

  const handleDelete = async (programId: number) => {
    await deleteProgram(programId);
    dispatch({ type: 'PROGRAM_DELETE', programId });
  }

  const handlePlay = (programId: number) => {
    // FIXME: implement playing
    console.log('handlePlay', programId);
  }

  return (
    <Router>
      <Container>
        <TopBar />
          {state.programs && (
            <Switch>
              <Route path="/programs/:programId">
                <Editor
                  programs={state.programs}
                  currentBlockId={state.currentBlockId}
                  onUpdateSource={handleUpdateSource}
                />
              </Route>
              <Route path="/">
                <Home
                  programs={state.programs}
                  onPlay={handlePlay}
                  onDelete={handleDelete}
                />
              </Route>
            </Switch>
          )}
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
