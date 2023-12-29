import { request, response } from 'express';
import diagnosisRouter from './diagnosis-route.js';
import userRouter from './user-route.js'

export default (app) => {
    app.use('/diagnosis', diagnosisRouter);
    app.use('/user', userRouter);
    app.get('/', (request, response) => response.send("Hello Doc!"));

    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
          success: false,
          statusCode,
          message,
        });
      });

}
