import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import dotenv from 'dotenv'

async function bootstrap() {
    
    dotenv.config()

    const app = await NestFactory.create(AppModule)

    const options = new DocumentBuilder().build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

    app.enableShutdownHooks()

    await app.listen(3000)
}
bootstrap()
