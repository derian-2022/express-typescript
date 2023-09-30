import { NewDiaryEntry } from './types'
import { Weather, Visibility } from './enums'

const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest) || commentFromRequest === null || commentFromRequest === undefined) {
    throw new Error('Incorrect or missing comment')
  }

  return commentFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || isNaN(Date.parse(dateFromRequest))) {
    throw new Error('Incorrect or missing date')
  }

  return dateFromRequest
}

const parseWeather = (weatherFromRequest: any): Weather => {
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error('Incorrect or missing Weather')
  }

  return weatherFromRequest
}

const parseVisibility = (visibilityFromRequest: any): Visibility => {
  if (!isString(visibilityFromRequest) || !isVisiblity(visibilityFromRequest)) {
    throw new Error('Incorrect or missing Visibility')
  }

  return visibilityFromRequest
}

const isWeather = (param: any): boolean => {
  return Object.values(Weather).includes(param)
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isVisiblity = (params: any): boolean => {
  return Object.values(Visibility).includes(params)
}

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment.toLowerCase),
    date: parseDate(object.date.toLowerCase),
    weather: parseWeather(object.weather.toLowerCase),
    visibility: parseVisibility(object.visibility.toLowerCase)
  }

  return newEntry
}

export default toNewDiaryEntry
