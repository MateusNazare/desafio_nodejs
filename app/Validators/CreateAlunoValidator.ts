import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAlunoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'alunos', column: 'email' })]),
    matricula: schema.number([rules.unique({ table: 'alunos', column: 'matricula' })]),
    data_nascimento: schema.date(),
  })

  public messages = {}
}
