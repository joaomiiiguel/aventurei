export interface ICardPlace {
    id?: string
    title: string
    city: string
    UF: string
    short_description?: string
    nick_partner?: string
    cover_img?: string
    price: number | null
    date_event?: string
    editMode?: boolean
    onEdit?: () => void
    onDelete?: (id: string) => Promise<void>
}
export interface ICardGuide {
    id: string
    name: string
    email?: string
    CPF?: string
    profile?: string
    city: string
    UF: string
    nickname: string
    short_description?: string
    avatar?: string
    phone?: string

}