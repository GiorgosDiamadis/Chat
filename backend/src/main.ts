import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from "./exceptions/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter())
    app.enableCors({credentials: true, origin: "http://localhost:3000"})
    await app.listen(8080);
}

bootstrap();
