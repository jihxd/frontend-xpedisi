import { IUserItem } from '@/app/admin/master/users/_interfaces/user'

export interface IPayloadGetUsers {
  page: number
  pageSize: number
  startDate?: string
  endDate?: string
}

export interface IResponseGetUsers {
  items: IUserItem[]
  total_pages: number
  total: number
}

export interface IPayloadCreatePaket {
  sender: string
  receiver: string
  address: string
  date: string
  content: string
  status: string
}

export interface IPayloadUpdatePaket {
  id: number
  sender: string
  receiver: string
  address: string
  date: string
  content: string
  status: string
}
