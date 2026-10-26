import Character from "@/models/Character";
import { RegisteredCharacters } from "@drincs/pixi-vn";

// Little Red Riding Hood characters
export const red = new Character("red", {
    name: "Little Red",
    color: "#d32f2f",
});

export const grandma = new Character("grandma", {
    name: "Grandma",
    color: "#795548",
});

export const huntsman = new Character("huntsman", {
    name: "Huntsman",
    color: "#5d4037",
});

export const wolf = new Character("wolf", {
    name: "Wolf",
    color: "#9e9e9e",
});

// Roommate characters (for alternate story paths)
export const mc = new Character("mc", {
    name: "Me",
});

export const james = new Character("james", {
    name: "James",
    color: "#0084ac",
});

export const steph_fullname = "Stephanie";
export const steph = new Character("steph", {
    name: "Steph",
    color: "#ac5900",
});

export const sly = new Character("sly", {
    name: "Sly",
    color: "#6d00ac",
});

RegisteredCharacters.add([red, grandma, huntsman, wolf, mc, james, steph, sly]);
