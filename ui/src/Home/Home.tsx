import styled from '@emotion/styled';

import ViewContainer from '../common/components/ViewContainer';
import { ProgramList } from './ProgramList';

export interface ProgramMeta {
  id: number
  title: string
}

const MOCK_PROGRAMS: ProgramMeta[] = [
  {
    id: 1,
    title: 'Sunset Vibes'
  },
  {
    id: 2,
    title: 'Blockrunner 2049'
  },
  {
    id: 3,
    title: 'My Cool Setup'
  }
];

const HomeView: React.FC = () => {
  const handlePlay = (programId: number) => {
    console.log('handlePlay', programId);
  };

  const handleEdit = (programId: number) => {
    console.log('handleEdit', programId);
  };

  const handleDelete = (programId: number) => {
    console.log('handleDelete', programId);
  };

  return (
    <ViewContainer>
      <ContentContainer>
        <ProgramList
          programs={MOCK_PROGRAMS}
          onPlay={handlePlay}
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
