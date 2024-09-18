import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig, { CONFIG_DATABASE } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import configs from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs, databaseConfig],
      envFilePath: '.env.local',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get(CONFIG_DATABASE);
        console.log('Database Config:', dbConfig);
        return {
          uri: configService.get(CONFIG_DATABASE).users.uri,
        };
      },
      inject: [ConfigService],
    }),
    SubscriptionModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
