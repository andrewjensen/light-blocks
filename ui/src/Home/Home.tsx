import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';

import ViewContainer from '../common/components/ViewContainer';
import { SERVER_HOST } from '../common/constants';
import { ProgramList } from './ProgramList';

export interface ProgramMeta {
  id: number
  title: string
}

const HomeView: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramMeta[]>([]);

  const loadPrograms = useCallback(async () => {
    const response = await fetch(`${SERVER_HOST}/api/programs`);
    const body = await response.json();
    setPrograms(body);
  }, [setPrograms]);

  useEffect(() => {
    loadPrograms();
  }, [loadPrograms]);

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
          programs={programs}
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
