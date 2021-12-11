import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Sala from './Sala'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public matricula: number

  @column.date()
  public data_nascimento: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Sala, {
    pivotTable: 'alunos_salas',
    localKey: 'id',
    pivotForeignKey: 'aluno_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'sala_id',
  })
  public salas: ManyToMany<typeof Sala>
}
