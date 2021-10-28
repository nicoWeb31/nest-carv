import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { Report } from './reports/entity/report.entity';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      port: 5432, // database host
      username: 'postgres', // username
      password: 'postgre', // user password
      database: 'report', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
      entities: [User, Report],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
