import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)

  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    const NewDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(NewDiaryEntry)

    res.json(addedDiaryEntry)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: any) {
    const customError = {
      date: '2023-09-30',
      weather: 'Sunny',
      visibility: 'good',
      comment: 'Hoy fue un día muy bonito. Salí a caminar por el parque y disfruté del sol.'
    }

    console.error(e) // Imprime el objeto de error en la consola para referencia
    res.status(400).json(customError) // Envia el JSON como respuesta
  }
})

export default router
