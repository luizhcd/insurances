import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  models: [__dirname + "/models"],
});

export default sequelize