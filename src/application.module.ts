import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { Process } from 'constants/process';
import { Entities } from 'entities/entities';
import { Resolvers } from 'resolvers/resolvers';
import { Services } from 'services/services';

const { CORS_ORIGIN, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, JWT_SECRET, JWT_EXPIRES_IN } = Process;

@Module({
  imports: [
    TypeOrmModule.forFeature(Entities),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      database: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD,
      synchronize: true,
      entities: Entities,
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
      autoSchemaFile: 'schema.gql',
      cors: {
        origin: CORS_ORIGIN,
        credentials: true,
      },
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN,
      },
    }),
  ],
  providers: [
    ...Resolvers,
    ...Services,
  ],
})
export class ApplicationModule {}
