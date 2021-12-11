import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import CreateAlunoValidator from 'App/Validators/CreateAlunoValidator'
import UpdateAlunoValidator from 'App/Validators/UpdateAlunoValidator'

export default class AlunosController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])

    await request.validate(CreateAlunoValidator)

    const aluno = await Aluno.create(data)

    return response.created({ data: aluno })
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = request.only(['nome', 'data_nascimento'])

    const aluno = await Aluno.find(id)

    if (aluno === null) {
      return response.status(400).json({ message: 'Aluno não encontrado' })
    }

    await request.validate(UpdateAlunoValidator)

    await aluno.merge(data).save()

    return response.status(200)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const aluno = await Aluno.find(id)

    if (aluno === null) {
      return response.status(400).json({ message: 'Aluno não encontrado' })
    }

    await aluno.delete()
    return response.status(200)
  }

  public async getAlunoById({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const aluno = await Aluno.find(id)

    if (aluno === null) {
      return response.status(400).json({ message: 'Aluno não encontrado' })
    }

    return response.json({ data: aluno })
  }

  public async getSalas({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const aluno = await Aluno.find(id)

    if (aluno === null) {
      return response.status(400).json({ message: 'Aluno não encontrado' })
    }

    const salas = await aluno
      .related('salas')
      .query()
      .preload('professor', (query) => {
        query.select(['nome'])
      })

    //const professor = salas[0].related('professor').query()

    return response.status(200).json({ aluno: aluno.nome, salas: salas })
  }
}
