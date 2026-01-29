import { UserType } from './User'

export type LoginParams = {
    email: string
    password: string
}

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type RegisterParams = {
    name: string
    cpf: string
    email: string
    password: string
    phone: string
    profile?: string
}

export type AuthValuesType = {
    loading: boolean
    logout: () => void
    user: UserType | null
    setLoading: (value: boolean) => void
    setUser: (value: UserType | null) => void
    login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
    register: (params: RegisterParams, respCallback?: (resp: boolean) => void, errorCallback?: ErrCallbackType) => void
}
