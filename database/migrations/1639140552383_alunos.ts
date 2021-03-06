import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Alunos extends BaseSchema {
  protected tableName = 'alunos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome')
      table.string('email').unique()
      table.integer('matricula').unique()
      table.date('data_nascimento')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
