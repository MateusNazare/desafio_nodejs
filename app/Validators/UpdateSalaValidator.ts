import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSalaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    numero_sala: schema.number.optional([rules.unique({ table: 'salas', column: 'numero_sala' })]),
    capacidade: schema.number.optional(),
    disponibilidade: schema.boolean.optional(),
  })

  public messages = {}
}
