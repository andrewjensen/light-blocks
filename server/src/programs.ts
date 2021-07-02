import { ProgramMeta } from './types';
import { Program } from './db';

interface EditProgramParams {
  title?: string
  source?: string
}

const DEFAULT_PROGRAM_SOURCE = `
  <xml xmlns="https://developers.google.com/blockly/xml">
    <block type="start" id="x+S5DXa,yii=}TE}ZK{S" x="290" y="90">
      <next>
        <block type="light_on" id="o;Un9mSlF1-owS--MxD$">
          <next>
            <block type="wait" id="!R^rW-JsxC;$TN-o(Mdn">
              <value name="TIME">
                <block type="math_number" id="k:yz]=ywrl3Of1R*5QCU">
                  <field name="NUM">1</field>
                </block>
              </value>
              <next>
                <block type="light_off" id="{f3dkPA7x?aCC\`:4O1Ra"></block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>
`;

export async function listPrograms(): Promise<ProgramMeta[]> {
  const programs = await Program.findAll();
  return programs.map(program => getMeta(program));;
}

export async function getProgram(id: number): Promise<ProgramMeta | null> {
  const program = await Program.findOne({
    where: { id }
  });
  if (program) {
    return getMeta(program);
  } else {
    return null;
  }
}

export async function createProgram(title: string): Promise<ProgramMeta> {
  const program = await Program.create({ title, source: DEFAULT_PROGRAM_SOURCE });
  return getMeta(program);
}

export async function editProgram(id: number, params: EditProgramParams): Promise<ProgramMeta | null> {
  const program = await Program.findOne({
    where: { id }
  });

  if (!program) {
    throw new Error('Program not found');
  }

  if (params.title) {
    program.title = params.title;
  }
  if (params.source) {
    program.source = params.source;
  }

  const updatedProgram = await program.save();
  return getMeta(updatedProgram);
}

export async function deleteProgram(id: number): Promise<void> {
  const program = await Program.findOne({
    where: { id }
  });

  if (!program) {
    throw new Error('Program not found');
  }

  await program.destroy();
}

function getMeta(program: Program): ProgramMeta {
  return {
    id: program.id,
    title: program.title,
    source: program.source
  };
}
