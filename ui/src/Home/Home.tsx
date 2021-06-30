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
  return (
    <div>
      <ProgramList programs={MOCK_PROGRAMS} />
    </div>
  );
};

export default HomeView;
