import Sequelize from 'sequelize';

import * as models from '../models';

const {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_DIALECT
} = process.env;

const db = {};
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: POSTGRES_DIALECT,
  port: POSTGRES_PORT,
  dialectOptions: {
    connectTimeout: 50000
  },
  pool: {
    max: 150,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: true
  },
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('DB Connected Successfully!.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Load each model and associate them to the `db` object
Object.keys(models).forEach((modelName) => {
  const model = models[modelName](sequelize);
  db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

export default db;
