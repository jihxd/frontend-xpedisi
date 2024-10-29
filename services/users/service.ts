'use server'

import $axios from '@/lib/axios'
import { revalidatePath } from 'next/cache'
import { IBaseResponse } from '../base/interface'
import {
  IPayloadGetUsers,
  IResponseGetUsers,
  IPayloadCreatePaket,
} from './interface'
import { UserFormData } from '@/app/admin/master/users/_validations/users'
import { IUserItem } from '@/app/admin/master/users/_interfaces/user'

export const getUsers = async () => {
  const res = await $axios.get<IBaseResponse<IResponseGetUsers>>('/api/paket')
  return res.data
}

export const deletePaket = async (id: number, pathname: string) => {
  try {
    await $axios.delete<IBaseResponse<null>>(`/api/paket/${id}`)
    revalidatePath(pathname)
  } catch (error) {
    console.error('Failed to delete user:', error)
    throw error
  }
}

export const markPaketAsDone = async (id: number, pathname: string) => {
  try {
    const res = await $axios.patch<IBaseResponse<IUserItem>>(
      `/api/paket/done/${id}`,
    )

    if (res.data) {
      revalidatePath(pathname) // Revalidate path setelah status diperbarui
    }
    return res.data
  } catch (error) {
    console.error('Failed to mark paket as done:', error)
    throw error
  }
}

export const createPaket = async (
  payload: IPayloadCreatePaket,
  pathname: string,
) => {
  // NOTE: Sample create user implementation
  const res = await $axios.post<IBaseResponse<IUserItem>>('/api/paket', payload)
  if (res.data) {
    revalidatePath(pathname)
  }
  return res.data
}

export const updatePaket = async (
  id: number,
  payload: Partial<IUserItem>,
  pathname: string,
) => {
  try {
    const res = await $axios.patch<IBaseResponse<IUserItem>>(
      `/api/paket/${id}`,
      payload,
    )
    if (res.data) {
      revalidatePath(pathname)
    }
    return res.data
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}

// New function to delete a user by ID
export const deleteUser = async (id: number, pathname: string) => {
  try {
    const res = await $axios.delete<IBaseResponse<null>>(`/api/paket/${id}`)
    if (res.data) {
      revalidatePath(pathname)
    }
    return res.data
  } catch (error) {
    console.error('Failed to delete user:', error)
    throw error
  }
}

export const GetPaketByID = async (id: number) => {
  try {
    const res = await $axios.get<IBaseResponse<IUserItem>>(`/api/paket/${id}`)
    return res.data?.data
  } catch (error) {
    console.error('Failed to search paket:', error)
    throw error
  }
}
