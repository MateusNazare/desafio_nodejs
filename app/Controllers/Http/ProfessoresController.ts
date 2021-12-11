import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professor from 'App/Models/Professor'
import CreateProfessorValidator from 'App/Validators/CreateProfessorValidator'
import UpdateProfessorValidator from 'App/Validators/UpdateProfessorValidator'

export default class ProfessoresController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'matricula', 'data_nascimento'])

    await request.validate(CreateProfessorValidator)

    const professor = await Professor.create(data)

    return response.created({ data: professor })
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const data = request.only(['nome', 'data_nascimento'])

    const professor = await Professor.find(id)

    if (professor === null) {
      return response.status(400).json({ message: 'Professor não encontrado' })
    }

    await request.validate(UpdateProfessorValidator)

    await professor.merge(data).save()

    return response.status(200)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const professor = await Professor.find(id)

    if (professor === null) {
      return response.status(400).json({ message: 'Professor não encontrado' })
    }

    await professor.delete()
    return response.status(200)
  }

  public async getProfessorById({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const professor = await Professor.find(id)

    if (professor === null) {
      return response.status(400).json({ message: 'Professor não encontrado' })
    }

    return response.json({ data: professor })
  }
}
