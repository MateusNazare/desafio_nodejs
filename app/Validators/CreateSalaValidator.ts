import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSalaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    numeroSala: schema.number([rules.unique({ table: 'salas', column: 'numero_sala' })]),
    capacidade: schema.number(),
    disponibilidade: schema.boolean(),
  })

  public messages = {}
}
