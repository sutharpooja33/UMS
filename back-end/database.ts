import { Sequelize, Options } from 'sequelize'
import { User } from './models/users';


export function getConnection(): Sequelize {
    const hostName = process.env.HOST || 'localhost';
    const userName = process.env.USER || 'postgres';
    const password = process.env.PASSWORD || 'root';
    const database = process.env.DB || 'DB1';
    const port: number = 5432;
    const dialect = 'postgres';
    console.log('hostName  ', hostName)
    console.log('userName  ', userName)
    console.log('password  ', password)
    console.log('database  ', database)
    console.log('dialect  ', dialect)

    const operatorsAliases: any = false;
    const options: Options = {
        host: hostName,
        port,
        dialect,
        operatorsAliases,
        database,
        username: userName,
        password
    };

    const sequelize = new Sequelize(options);
    User.initialize(sequelize);
    User.associate()
   

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.sequelize.sync({ force: false }).then(() => {
        console.log("Drop and re-sync db.");
    });
    return db;

}

