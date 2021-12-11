import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import Professor from 'App/Models/Professor'
import Sala from 'App/Models/Sala'
import CreateSalaValidator from 'App/Validators/CreateSalaValidator'
import UpdateSalaValidator from 'App/Validators/UpdateSalaValidator'

export default class SalasController {
  public async create({ request, response }: HttpContextContract) {
    const professorId = request.header('professorId')
    const { numeroSala, capacidade, disponibilidade } = request.only([
      'numeroSala',
      'capacidade',
      'disponibilidade',
    ])

    const professor = await Professor.find(professorId)

    if (professor === null) {
      return response.status(400).json({ message: 'Professor não encontrado' })
    }

    await request.validate(CreateSalaValidator)

    const data = {
      numero_sala: numeroSala,
      capacidade: capacidade,
      disponibilidade: disponibilidade,
      professor_id: professor.id,
    }

    const sala = await Sala.create(data)

    return response.created({ data: sala })
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const professorId = request.header('professorId')
    const data = request.only(['numero_sala', 'capacidade', 'disponibilidade'])

    const sala = await Sala.find(id)

    if (sala === null) {
      return response.status(400).json({ message: 'Sala não encontrada' })
    }

    if (sala.professor_id !== parseInt(professorId!)) {
      return response.status(401).json({ message: 'Você não tem permissão para alterar esta sala' })
    }

    await request.validate(UpdateSalaValidator)

    await sala.merge(data).save()

    return response.status(200)
  }

  public async delete({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const professorId = request.header('professorId')

    const sala = await Sala.find(id)

    if (sala === null) {
      return response.status(400).json({ message: 'Sala não encontrada' })
    }

    if (sala.professor_id !== parseInt(professorId!)) {
      return response.status(401).json({ message: 'Você não tem permissão para deletar esta sala' })
    }

    await sala.delete()
    return response.status(200)
  }

  public async getSalaById({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const sala = await Sala.find(id)

    if (sala === null) {
      return response.status(400).json({ message: 'Sala não encontrada' })
    }

    return response.json({ data: sala })
  }

  public async addAluno({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { alunoId } = request.only(['alunoId'])
    const professorId = request.header('professorId')

    const aluno = await Aluno.find(alunoId)

    if (aluno === null) {
      return response.status(400).json({ message: 'Aluno não encontrado' })
    }

    const sala = await Sala.find(id)

    if (sala === null) {
      return response.status(400).json({ message: 'Sala não encontrada' })
    }

    if (!sala.disponibilidade) {
      return response.status(400).json({ message: 'A sala não está disponivel' })
    }

    if (sala.professor_id !== parseInt(professorId!)) {
      return response.status(401).json({ message: 'Você não tem permissão para alterar esta sala' })
    }

    const alunos = await sala.related('alunos').query()

    var existeAluno = false

    alunos.forEach((aluno) => {
      if (aluno.id === alunoId) {
        existeAluno = true
      }
    })

    if (existeAluno) {
      return response.status(400).json({ message: 'Este aluno já está nesta sala' })
    }

    if (alunos.length > sala.capacidade) {
      return response.status(400).json({ message: 'A sala já está lotada' })
    }

    await sala.related('alunos').attach([aluno.id])

    return response.status(200)
  }

  public async removeAluno({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { alunoId } = request.only(['alunoId'])
    const professorId = request.header('professorId')

    const aluno = await Aluno.find(alunoId)

    if (aluno === null) {
      return response.status(400).json({ message: 'Aluno não encontrado' })
    }

    const sala = await Sala.find(id)

    if (sala === null) {
      return response.status(400).json({ message: 'Sala não encontrada' })
    }

    if (!sala.disponibilidade) {
      return response.status(400).json({ message: 'A sala não está disponivel' })
    }

    if (sala.professor_id !== parseInt(professorId!)) {
      return response.status(401).json({ message: 'Você não tem permissão para alterar esta sala' })
    }

    const alunos = await sala.related('alunos').query()

    var existeAluno = false

    alunos.forEach((aluno) => {
      if (aluno.id === alunoId) {
        existeAluno = true
      }
    })

    if (!existeAluno) {
      return response.status(400).json({ message: 'Este aluno não está nesta sala' })
    }

    await sala.related('alunos').detach([aluno.id])

    return response.status(200)
  }

  public async getAlunos({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const sala = await Sala.find(id)

    if (sala === null) {
      return response.status(400).json({ message: 'Sala não encontrada' })
    }

    const alunos = await sala.related('alunos').query()

    return response.status(200).json({ data: alunos })
  }
}
