import { GameDeal } from "../../models";
import * as faker from 'faker';
export class GameDealsFactory {

    public static createGameDeal(gameDeal?: Partial<GameDeal>): GameDeal {
        return {
            internalName: faker.random.words(),
            title: faker.random.words(),
            metacriticLink: faker.internet.url(),
            dealID: faker.datatype.string(),
            storeID: faker.datatype.string(),
            gameID: faker.datatype.string(),
            salePrice: faker.commerce.price(),
            normalPrice: faker.commerce.price(),
            isOnSale: faker.datatype.string(),
            savings: faker.commerce.price(),
            metacriticScore: GameDealsFactory.getScoreText(),
            steamRatingText: GameDealsFactory.getScoreText(),
            steamRatingPercent: `${faker.datatype.number(100)}%`,
            steamRatingCount: `${faker.datatype.number()}`,
            steamAppID: faker.datatype.uuid(),
            releaseDate: faker.datatype.number(),
            lastChange: faker.datatype.number(),
            dealRating: GameDealsFactory.getScoreText(),
            thumb: faker.internet.url(),
            ...gameDeal
        }
    }
    public static createGameDeals() {
       return Array.of(faker.datatype.number(10)).map(() => GameDealsFactory.createGameDeal())
    }

    private static getScoreText(): string {
        return `${faker.datatype.number(10)}`;
    }
}