export type PlaceType = {
    id?: string;
    title: string
    short_description: string
    long_description: string
    city: string
    UF: string
    price?: number | null
    nick_partner?: string
    cover_img?: string
    accessibility?: string
    booking_mode: boolean
    min_age?: number
    gallery?: string[]
    date_event?: string
    created_at?: string
}
