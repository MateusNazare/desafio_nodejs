import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlunosSalas extends BaseSchema {
  protected tableName = 'alunos_salas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('aluno_id').unsigned()
      table.foreign('aluno_id').references('alunos.id')

      table.integer('sala_id').unsigned()
      table.foreign('sala_id').references('salas.id')

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
