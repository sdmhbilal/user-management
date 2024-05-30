import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

const ApplyMiddlewares = (app) => {
  app.use(cors()); // Applying to allow cross-origin requests
  app.use(express.json()); // Applying to parse JSON request bodies
  app.use(morgan('dev')); // Applying logging HTTP requests in 'dev' format
};

export default ApplyMiddlewares;
