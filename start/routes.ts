/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/alunos', 'AlunosController.create')
Route.put('/alunos/:id', 'AlunosController.update')
Route.delete('/alunos/:id', 'AlunosController.delete')
Route.get('/alunos/:id', 'AlunosController.getAlunoById')
Route.get('/alunos/salas/:id', 'AlunosController.getSalas')

Route.post('/professores', 'ProfessoresController.create')
Route.put('/professores/:id', 'ProfessoresController.update')
Route.delete('/professores/:id', 'ProfessoresController.delete')
Route.get('/professores/:id', 'ProfessoresController.getProfessorById')

Route.post('/salas', 'SalasController.create')
Route.put('/salas/:id', 'SalasController.update')
Route.delete('/salas/:id', 'SalasController.delete')
Route.get('/salas/:id', 'SalasController.getSalaById')

Route.put('/salas/add/:id', 'SalasController.addAluno')
Route.delete('/salas/remove/:id', 'SalasController.removeAluno')
Route.get('/salas/alunos/:id', 'SalasController.getAlunos')
