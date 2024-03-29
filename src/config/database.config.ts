export default () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    migrations: [
        '@infras/database/migrations/*.ts',
    ],
    autoLoadEntities: true,
})