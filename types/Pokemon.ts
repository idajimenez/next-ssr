export interface IPokemon {
    id: number,
    name: string,
    image: string,
    type?: string[],
    stats?: {
        name: string,
        value: number
    }[]
}


