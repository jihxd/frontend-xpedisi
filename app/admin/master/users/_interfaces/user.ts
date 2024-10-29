import { Account } from 'next-auth'

export interface IUserItem {
  id: number
  sender: string
  receiver: string
  address: string
  date: string
  content: string
  status: string
  AccountID: number
  Account: Account
}
