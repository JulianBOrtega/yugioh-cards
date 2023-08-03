import { CardImage } from "./card-image.interface"
import { CardPricing } from "./card-pricing.interface"
import { CardSet } from "./card-set.interface"

export interface Card {
    id: number
    name: string,
    type: string,
    frameType: string,
    desc: string,
    atk: number,
    def: number,
    level: number,
    race: string,
    attribute: string,
    card_sets: CardSet[],
    card_images: CardImage[],
    card_prices: CardPricing[]
  }