export interface IBaseResponse<T = unknown> {
  status: number
  success: boolean
  message?: string
  data: T
}
