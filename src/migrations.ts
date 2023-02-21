import dotenv from 'dotenv'
import knex from 'knex'

dotenv.config()

export const connection= knex({
   client: "mysql",
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306,
      multipleStatements: true
   }
})


connection
   .raw(`
      CREATE TABLE IF NOT EXISTS labook_users(
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS labook_posts(
         id VARCHAR(255) PRIMARY KEY,
         photo VARCHAR(255) NOT NULL,
         description VARCHAR(255) NOT NULL,
         type ENUM("normal","event") DEFAULT "normal",
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         author_id VARCHAR(255),
         FOREIGN KEY (author_id) REFERENCES labook_users (id)
      );

      CREATE TABLE IF NOT EXISTS labook_friendships(
         id VARCHAR(255) PRIMARY KEY,
         fk_account2 VARCHAR(255) NOT NULL,
         fk_account VARCHAR(255) NOT NULL,
         FOREIGN KEY (fk_account) REFERENCES labook_users (id),
         FOREIGN KEY (fk_account2) REFERENCES labook_users (id)
      )
   `)
   .then(() => {
    console.log(`Tables created successfully!`)
})
.catch((error: any) => console.log(error.sqlMessage || error.message))
