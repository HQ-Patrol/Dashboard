interface SidebarCategory {
	name: string;
	id: SidebarID;
	icon: string;
}

export const SidebarButtons = [
	{
		name: "Pets",
		id: "pets",
		icon: "fa6-solid:paw",
	},
	{
		name: "Economy",
		id: "economy",
		icon: "fa6-solid:sack-dollar",
	},
	{
		name: "Logbook",
		id: "logbook",
		icon: "fa6-solid:book",
	},
	{
		name: "Finder",
		id: "finder",
		icon: "fa6-solid:magnifying-glass",
	},
	{
		name: "Badges",
		id: "badges",
		icon: "simple-icons:openbadges",
	},
] as SidebarCategory[];

export type SidebarID = "pets" | "economy" | "logbook" | "finder" | "badges";
