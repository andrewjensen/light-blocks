import { Sequelize, DataTypes, Model } from 'sequelize';

import logger from './logger';

const DB_FILE_PATH = process.env.NODE_ENV === 'production'
  ? '/db/lightblocks.sqlite'
  : 'lightblocks.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_FILE_PATH,
  logging: false
});

export async function connectToDB() {
  logger.info('Connecting to DB...');

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
