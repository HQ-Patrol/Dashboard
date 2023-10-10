export enum ItemType {
    Badge = "BADGE",
    Collectible = "COLLECTIBLE",
    Pets = "PETS",
    Rob = "ROB",
    Special = "SPECIAL",
    Usable = "USABLE",
}

export interface ItemMetadata {
    canBeSold: boolean;
    canBeBought: boolean;
    canBeTraded: boolean;
    canBeUsed: boolean;
}

export interface Item {
    name: string;
    name2: string;
    alias: string;
    icon: string;
    price: number | null;
    stock?: number;
    sellPrice: number | null;
    collateralPrice: number;
    description: string;
    usage: string;
    type: string;
    data: ItemMetadata;
}

export interface UserItem {
    name: string;
    count: number;
    icon: string;
    type: string;
    data: ItemMetadata;
}