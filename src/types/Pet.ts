import type { Types } from "mongoose";

export interface RawPet {
	name: string;
	sprite: string;
	UID: number;
	id: number;
	species: string;
	rarity: string;
	shadowSprite?: string;
	fours: string[];
	shadowFours: string[];
	reversedFours: string[];
	shadowReversedFours: string[];
}

export interface IPetAttributes {
	attack: number;
	intelligence: number;
	speed: number;
	energy: number;
	hunger: number;
	love: number;
}

export interface IPetStates {
	play: number;
	pat: number;
	hug: number;
	train: number;
}

export interface Pet {
	_id?: Types.ObjectId;
	id: string;
	species: string;
	UID: number;
	name: string;
	sprite: string;
	level: number;
	experience: number;
	statPoints: number;
	evolution: 1 | 2 | 3;
	current: boolean;
	favorite: boolean;
	brawlMaster: boolean;
	attributes: IPetAttributes;
	interactive: {
		asleep: boolean;
		asleepHours: number;
	};
	petType: "REGULAR" | "SHADOW";
	fightsWon: number;
	states: IPetStates;
	activeSkillCooldowns: Array<unknown>;
}
