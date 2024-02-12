import express from 'express'
import policyRouter from './routes/insurancePolicyRouter'
import userRouter from './routes/userRouter'
import sequelize from './connection'
import notFound from './middlewares/notFound'
import errorHandler from './middlewares/errorHandler'
import auth from './middlewares/authentication'
import morgan from 'morgan'
import 'dotenv/config'


const app = express()

sequelize.sync({ alter: true });

app
  .disable("x-powered-by")
  .use(express.json());

app.use(morgan('tiny'))

app.use('/api/v1/policies', auth, policyRouter)
app.use('/api/v1/users', userRouter)

app.use(notFound)
app.use(errorHandler);

export default app;
