import { Modality } from "./Place"

export interface UserType {
    id?: string
    name?: string
    nickname?: string
    numberID?: string
    email?: string
    password?: string
    phone?: string
    created_at?: string
    profile?: string //admin - guide - client
    avatar?: string
    city?: string
    UF?: string
    description?: string
    refund_rules?: string
    status?: boolean
    country?: string
    reviewCount?: number
    rating?: number
    banner?: string
    modalities?: Modality[]
    onboarded?: boolean
    certifications?: string[]
    short_description?: string
    experience?: string
}
