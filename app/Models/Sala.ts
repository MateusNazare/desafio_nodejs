import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, ManyToMany, manyToMany, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Aluno from './Aluno'
import Professor from './Professor'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public numero_sala: number

  @column()
  public capacidade: number

  @column()
  public disponibilidade: boolean

  @column()
  public professor_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Aluno, {
    pivotTable: 'alunos_salas',
    localKey: 'id',
    pivotForeignKey: 'sala_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'aluno_id',
  })
  public alunos: ManyToMany<typeof Aluno>

  @hasOne(() => Professor, {
    localKey: 'professor_id',
    foreignKey: 'id',
  })
  public professor: HasOne<typeof Professor>
}
