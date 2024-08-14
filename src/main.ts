import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 8000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:["http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  });
 
  await app.listen(port).then(()=>{
    console.log("App started listening on port: "+ port);
  });
  
}
bootstrap();
