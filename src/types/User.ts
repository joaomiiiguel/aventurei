import { Modality } from "./Place"

export interface UserType {
    id?: string
    name?: string
    nickname?: string
    cpf?: string
    email?: string
    password?: string
    phone?: string
    created_at?: string
    profile?: string //admin - guide - client
    avatar?: string
    banner?: string
    city?: string
    UF?: string
    short_description?: string
    refund_rules?: string
    adventures?: any[]
    reviewCount?: number
    rating?: number
    modalities?: Modality[]
    experience?: string
    certifications?: string[]
    status?: boolean
}
