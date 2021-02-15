import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Post } from '../../modules/posts/post.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      //       config = {
      //         username: 'postgres',
      //         password: '123',
      //         database: 'test3',
      //         host: 'localhost',
      //         port: '5432',
      //         dialect: 'postgres',
      //       };
      //       console.log(config);

      //       const sequelize = new Sequelize({
      //         ...config,
      //         dialectOptions: {
      //           statement_timeout: 1000,
      //           idle_in_transaction_session_timeout: 5000,
      //           requestTimeout: 3000,
      //           options: {
      //             requestTimeout: 3000,
      //           },
      //         },
      //         pool: {
      //           max: 10,
      //           min: 0,
      //           idle: 10000,
      //         },
      //       });
      //       await sequelize.authenticate();
      //       sequelize.addModels([User, Post]);
      //       try {
      //         await sequelize.sync({
      //           alter: true,
      //           logging: console.log,
      //         });
      //         console.log(' sequelize setup successfuly.');
      //       } catch (Err) {
      //         console.log(Err);
      //       }

      //       const x = await User.findAll();

      //       return sequelize;
      //     },
      //   },
      // ];
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Post]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
