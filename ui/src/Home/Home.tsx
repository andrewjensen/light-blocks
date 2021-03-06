import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { ProgramMeta } from '../common/types';
import ViewContainer from '../common/components/ViewContainer';
import { ProgramList } from './ProgramList';

interface Props {
  programs: ProgramMeta[]
  runningProgramId: number | null
  onRun: (programId: number) => void
  onStop: () => void
  onCreate: (title: string) => void
  onDelete: (programId: number) => void
}

const HomeView: React.FC<Props> = ({ programs, runningProgramId, onRun, onStop, onCreate, onDelete }) => {
  const history = useHistory();

  const handleCreate = () => {
    const title = window.prompt('Enter a program title:');
    if (title === null) {
      // Do nothing
    } else if (title === '') {
      window.alert('Missing title!');
    } else {
      onCreate(title);
    }
  };

  const handleEdit = (programId: number) => {
    history.push(`/programs/${programId}`);
  };

  const handleDelete = (programId: number) => {
    const programToDelete = programs.find(program => program.id === programId);
    const confirmMessage = `Are you sure you want to delete ${programToDelete?.title}?`;

    if (window.confirm(confirmMessage)) {
      onDelete(programId);
    }
  };

  return (
    <ViewContainer>
      <ContentContainer>
        <ProgramList
          programs={programs}
          runningProgramId={runningProgramId}
          onClickCreate={handleCreate}
          onRun={onRun}
          onStop={onStop}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ContentContainer>
    </ViewContainer>
  );
};

export default HomeView;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
`;
