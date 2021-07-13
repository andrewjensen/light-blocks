import { ProgramMeta } from './common/types';

export interface AppState {
  programs: ProgramMeta[]
  runningProgramId: number | null
  currentBlockId: string | null
}

export type AppAction =
  | { type: 'LOADED_PROGRAMS', programs: ProgramMeta[] }
  | { type: 'PROGRAM_CREATE', program: ProgramMeta }
  | { type: 'PROGRAM_SET_SOURCE', programId: number, source: string }
  | { type: 'PROGRAM_DELETE', programId: number }
  | { type: 'INTERPRETER_RUN_PROGRAM', programId: number }
  | { type: 'INTERPRETER_STOP' }
  | { type: 'INTERPRETER_SET_CURRENT_BLOCK', blockId: string | null }

export const INITIAL_STATE: AppState = {
  programs: [],
  runningProgramId: null,
  currentBlockId: null,
};

export function appReducer(state: AppState = INITIAL_STATE, action: AppAction): AppState {
  switch (action.type) {
    case 'LOADED_PROGRAMS':
      return {
        ...state,
        programs: action.programs
      };
    case 'PROGRAM_CREATE':
      return {
        ...state,
        programs: [
          ...state.programs,
          action.program
        ]
      };
    case 'PROGRAM_SET_SOURCE':
      return {
        ...state,
        programs: editProgram(
          state.programs,
          action.programId,
          (program) => ({
            ...program,
            source: action.source
          })
        )
      };
    case 'PROGRAM_DELETE':
      return {
        ...state,
        programs: state.programs.filter(program => program.id !== action.programId)
      };
    case 'INTERPRETER_RUN_PROGRAM':
      return {
        ...state,
        runningProgramId: action.programId
      };
    case 'INTERPRETER_STOP':
      return {
        ...state,
        runningProgramId: null
      };
    case 'INTERPRETER_SET_CURRENT_BLOCK':
      return {
        ...state,
        currentBlockId: action.blockId
      };
    default:
      return state;
  }
}

function editProgram(programs: ProgramMeta[], programId: number, editFn: (program: ProgramMeta) => ProgramMeta): ProgramMeta[] {
  return programs.map(program => {
    if (program.id === programId) {
      return editFn(program);
    } else {
      return program;
    }
  });
}
