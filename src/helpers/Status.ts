import {
  TaskStatusEnum,
  ResultStatusEnum
} from '../models/index'

export const TaskStatus = {
  Failed: TaskStatusEnum.NUMBER_0,
  Draft:  TaskStatusEnum.NUMBER_1,
  Pending: TaskStatusEnum.NUMBER_2,
  Running: TaskStatusEnum.NUMBER_3,
  Done: TaskStatusEnum.NUMBER_4
}

export const ResultStatus = {
  Failed: ResultStatusEnum.NUMBER_0,
  Draft:  ResultStatusEnum.NUMBER_1,
  Pending: ResultStatusEnum.NUMBER_2,
  Running: ResultStatusEnum.NUMBER_3,
  Done: ResultStatusEnum.NUMBER_4
}
