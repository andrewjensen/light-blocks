import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'lightblocks.sqlite',
  logging: false
});

export async function connectToDB() {
  console.log('Connecting to DB...');

  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
}

export class Program extends Model {
  public id!: number
  public title!: string
  public source!: string
}

Program.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  source: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Program'
});
