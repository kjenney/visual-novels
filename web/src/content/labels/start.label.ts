import { BGM_CHANNEL_NAME } from "@/constants";
import { grandma, huntsman, red, wolf } from "@/content/characters";
import {
    Assets,
    moveIn,
    moveOut,
    narration,
    newChoiceOption,
    newCloseChoiceOption,
    newLabel,
    showImage,
    showImageContainer,
    sound,
} from "@drincs/pixi-vn";

export const startLabel = newLabel(
    "start",
    [
        async () => {
            await showImage("bg", "backgrounds_forest-path");
            await sound.play("sfx_whoosh", { delay: 0.1 });
            narration.dialogue = `The sun shines through the trees as Little Red Riding Hood walks through the forest.`;
        },
        async () => {
            await moveIn(
                "red",
                {
                    value: ["characters_red-riding-hood"],
                    options: { xAlign: 0.5, yAlign: 1 },
                },
                { direction: "down", ease: "easeInOut" },
            );
            narration.dialogue = { character: red, text: `Grandma is waiting for us at her cottage. I hope she's feeling better!` };
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogGlue = true;
            narration.dialogue = `She carries a basket filled with sweets and medicine for her grandmother.`;
        },
        async () => {
            await sound.play("bgm_cheerful", { channel: BGM_CHANNEL_NAME, loop: true });
            await moveIn(
                "wolf",
                {
                    value: ["characters_wolf-forest"],
                    options: { xAlign: 0.2, yAlign: 1 },
                },
                { direction: "right", ease: "anticipate" },
            );
            narration.dialogue = { character: wolf, text: `Hmm... that smells delicious. Who is this little girl heading to Grandma's cottage?` };
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `Oh! I didn't see you there, Mr. Wolf.` };
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `I live in these woods, little one. And you are?` };
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `I'm Little Red Riding Hood. I'm visiting my grandmother who's not feeling well.` };
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `How kind of you! I know the way well - I could show you, or perhaps... run ahead and tell her you're coming?` };
        },
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            moveOut("wolf", { direction: "right", ease: "easeInOut" });
            narration.dialogue = `The wolf disappears into the woods with a wink.`;
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `That was strange... but he does know the way better than I do.` };
        },
        async () => {
            narration.dialogue = `What should Little Red do?`;
            narration.choices = [
                newChoiceOption("Continue on the path to Grandma's", "path_continues", {}, { type: "jump" }),
                newChoiceOption("Follow the wolf to see what he does", "follow_wolf", {}, { type: "jump" }),
                newChoiceOption("Go back home", "go_back_home", {}, { type: "jump" }),
            ];
        },
    ],
    {
        onLoadingLabel: () => {
            Assets.backgroundLoadBundle(["backgrounds", "characters"]);
        },
    },
);

export const pathContinuesLabel = newLabel(
    "path_continues",
    [
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await showImage("bg", "backgrounds_grandma-cottage");
            narration.dialogue = `Little Red continues on the path and soon sees Grandma's cottage.`;
        },
        async () => {
            await moveIn(
                "red",
                {
                    value: ["characters_red-riding-hood"],
                    options: { xAlign: 0.5, yAlign: 1 },
                },
                { direction: "down", ease: "easeInOut" },
            );
            narration.dialogue = { character: red, text: `Grandma? Are you awake?` };
        },
        async () => {
            await showImage("bg", "backgrounds_grandma-cottage");
            narration.dialogue = `From inside the cottage, a muffled voice responds...`;
        },
        async () => {
            narration.dialogue = { character: "narrator", text: `"Come in, my dear... the door is unlocked."` };
        },
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await moveIn(
                "grandma",
                {
                    value: ["characters_grandma-lupus"],
                    options: { xAlign: 0.5, yAlign: 1 },
                },
                { direction: "right", ease: "easeInOut" },
            );
            narration.dialogue = { character: grandma, text: `Oh, Grandma! You look... different today!` };
        },
        async () => {
            await showImageContainer("grandma", ["characters_grandma-lupus"]);
            narration.dialogue = { character: grandma, text: `All the better to see you with, my dear...` };
        },
        async () => {
            await showImageContainer("grandma", ["characters_grandma-lupus"]);
            narration.dialogue = { character: grandma, text: `All the better to hear you with!` };
        },
        async () => {
            await showImageContainer("grandma", ["characters_grandma-lupus"]);
            narration.dialogue = { character: grandma, text: `All the better to eat you with!` };
        },
        async () => {
            await showImageContainer("grandma", ["characters_grandma-lupus"]);
            narration.dialogue = `The wolf jumps out from under the covers!`;
        },
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await moveIn(
                "huntsman",
                {
                    value: ["characters_lrrh-and-wolf"],
                    options: { xAlign: 0.2, yAlign: 1 },
                },
                { direction: "right", ease: "anticipate" },
            );
            narration.dialogue = { character: huntsman, text: `Halting there! Release the child!` };
        },
        async () => {
            narration.dialogue = { character: red, text: `Oh no! Grandma's in danger!` };
        },
        async () => {
            narration.dialogue = `What will Little Red do?`;
            narration.choices = [
                newChoiceOption("Try to escape!", "escape_scene", {}, { type: "jump" }),
                newChoiceOption("Stand and fight alongside the Huntsman", "battle_scene", {}, { type: "jump" }),
                newChoiceOption("Appease the wolf", "appease_wolf", {}, { type: "jump" }),
            ];
        },
    ],
    {
        onLoadingLabel: () => {
            Assets.backgroundLoadBundle(["backgrounds", "characters"]);
        },
    },
);

export const followWolfLabel = newLabel(
    "follow_wolf",
    [
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await showImage("bg", "backgrounds_wolf-forest");
            narration.dialogue = `Curious, Little Red follows the wolf deeper into the forest...`;
        },
        async () => {
            await moveIn(
                "wolf",
                {
                    value: ["characters_wolf-forest"],
                    options: { xAlign: 0.5, yAlign: 1 },
                },
                { direction: "down", ease: "easeInOut" },
            );
            narration.dialogue = { character: wolf, text: `You shouldn't have followed me. Now I'm hungry!` };
        },
        async () => {
            await showImage("bg", "backgrounds_wolf-forest");
            narration.dialogue = `The wolf lunges at Little Red!`;
        },
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await moveIn(
                "huntsman",
                {
                    value: ["characters_lrrh-and-wolf"],
                    options: { xAlign: 0.8, yAlign: 1 },
                },
                { direction: "left", ease: "easeInOut" },
            );
            narration.dialogue = { character: huntsman, text: `Leave her alone, beast!` };
        },
        async () => {
            await showImageContainer("huntsman", ["characters_lrrh-and-wolf"]);
            narration.dialogue = { character: huntsman, text: `You're under arrest for trespassing and attempted kidnapping!` };
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `Grrr... you've ruined my meal!` };
        },
        async () => {
            await moveOut("wolf", { direction: "left", ease: "easeInOut" });
            narration.dialogue = `The wolf slinks away, defeated.`;
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `Thank you, Huntsman!` };
        },
        async () => {
            await showImageContainer("huntsman", ["characters_lrrh-and-wolf"]);
            narration.dialogue = { character: huntsman, text: `Be careful in the woods, little one. Stay on the path.` };
        },
        async () => {
            narration.dialogue = `The Huntsman walks Little Red safely to Grandma's cottage, where they find Grandma waiting safely.`;
        },
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await moveIn(
                "grandma",
                {
                    value: ["characters_grandma-lupus"],
                    options: { xAlign: 0.8, yAlign: 1 },
                },
                { direction: "left", ease: "easeInOut" },
            );
            narration.dialogue = { character: grandma, text: `Oh, my child! I was so worried!` };
        },
        async () => {
            narration.dialogue = `The End - Safe ending.`;
            narration.choices = [
                newCloseChoiceOption("Return to Main Menu", { closeCurrentLabel: true }),
                newCloseChoiceOption("End of Demo"),
            ];
        },
    ],
    {
        onLoadingLabel: () => {
            Assets.backgroundLoadBundle(["backgrounds", "characters"]);
        },
    },
);

export const goBackHomeLabel = newLabel(
    "go_back_home",
    [
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await showImage("bg", "backgrounds_forest-path");
            narration.dialogue = `Little Red decides to go back home.`;
        },
        async () => {
            await moveIn(
                "red",
                {
                    value: ["characters_red-riding-hood"],
                    options: { xAlign: 0.5, yAlign: 1 },
                },
                { direction: "down", ease: "easeInOut" },
            );
            narration.dialogue = { character: red, text: `This is too scary. I'll just stay home and bake with Grandma next time.` };
        },
        async () => {
            narration.dialogue = `The End - Safe ending.`;
            narration.choices = [
                newCloseChoiceOption("Return to Main Menu", { closeCurrentLabel: true }),
                newCloseChoiceOption("End of Demo"),
            ];
        },
    ],
    {
        onLoadingLabel: () => {
            Assets.backgroundLoadBundle(["backgrounds", "characters"]);
        },
    },
);

export const escapeSceneLabel = newLabel(
    "escape_scene",
    [
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await showImage("bg", "backgrounds_grandma-cottage");
            narration.dialogue = `Little Red spins around and runs out the door!`;
        },
        async () => {
            await moveIn(
                "red",
                {
                    value: ["characters_red-riding-hood"],
                    options: { xAlign: 0.5, yAlign: 1 },
                },
                { direction: "down", ease: "backOut" },
            );
            narration.dialogue = { character: red, text: `I'm getting out of here!` };
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `Won't get away that easily!` };
        },
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await moveIn(
                "huntsman",
                {
                    value: ["characters_lrrh-and-wolf"],
                    options: { xAlign: 0.2, yAlign: 1 },
                },
                { direction: "right", ease: "anticipate" },
            );
            narration.dialogue = { character: huntsman, text: `Stop right there, both of you!` };
        },
        async () => {
            narration.dialogue = `The Huntsman apprehends the wolf while Little Red escapes safely.`;
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `I made it out! Grandma must have been taken elsewhere.` };
        },
        async () => {
            narration.dialogue = `The End - Escape ending.`;
            narration.choices = [
                newCloseChoiceOption("Return to Main Menu", { closeCurrentLabel: true }),
                newCloseChoiceOption("End of Demo"),
            ];
        },
    ],
    {
        onLoadingLabel: () => {
            Assets.backgroundLoadBundle(["backgrounds", "characters"]);
        },
    },
);

export const battleSceneLabel = newLabel(
    "battle_scene",
    [
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await showImage("bg", "backgrounds_grandma-cottage");
            narration.dialogue = `Little Red stands her ground beside the Huntsman!`;
        },
        async () => {
            await moveIn(
                "red",
                {
                    value: ["characters_red-riding-hood"],
                    options: { xAlign: 0.5, yAlign: 1 },
                },
                { direction: "down", ease: "easeInOut" },
            );
            narration.dialogue = { character: red, text: `Leave Grandma alone!` };
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `Two against one? This will be fun!` };
        },
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await moveIn(
                "grandma",
                {
                    value: ["characters_grandma-lupus"],
                    options: { xAlign: 0.8, yAlign: 1 },
                },
                { direction: "left", ease: "easeInOut" },
            );
            narration.dialogue = { character: grandma, text: `Don't forget about me, wolf!` };
        },
        async () => {
            narration.dialogue = `Grandma picks up a rolling pin and hits the wolf!`;
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `Yelp! Okay, okay, I surrender!` };
        },
        async () => {
            await moveOut("wolf", { direction: "left", ease: "easeInOut" });
            narration.dialogue = `The wolf runs away, howling in pain.`;
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `We did it! Grandma, are you okay?` };
        },
        async () => {
            await showImageContainer("grandma", ["characters_grandma-lupus"]);
            narration.dialogue = { character: grandma, text: `I'm fine, thanks to my brave granddaughter and the Huntsman!` };
        },
        async () => {
            narration.dialogue = `The End - Teamwork ending.`;
            narration.choices = [
                newCloseChoiceOption("Return to Main Menu", { closeCurrentLabel: true }),
                newCloseChoiceOption("End of Demo"),
            ];
        },
    ],
    {
        onLoadingLabel: () => {
            Assets.backgroundLoadBundle(["backgrounds", "characters"]);
        },
    },
);

export const appeaseWolfLabel = newLabel(
    "appease_wolf",
    [
        async () => {
            await sound.play("sfx_whoosh", { delay: 0.1 });
            await showImage("bg", "backgrounds_grandma-cottage");
            narration.dialogue = `Little Red tries to reason with the wolf.`;
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `Please, don't hurt Grandma. I'll share my basket with you instead.` };
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `Food? You really have it?` };
        },
        async () => {
            await showImageContainer("red", ["characters_red-riding-hood"]);
            narration.dialogue = { character: red, text: `Yes, all the sweets are for you... if you let us go.` };
        },
        async () => {
            await showImageContainer("wolf", ["characters_wolf-forest"]);
            narration.dialogue = { character: wolf, text: `You drive a hard bargain... Fine, I'll leave.` };
        },
        async () => {
            await moveOut("wolf", { direction: "left", ease: "easeInOut" });
            narration.dialogue = `The wolf takes the basket and disappears into the woods.`;
        },
        async () => {
            await showImageContainer("grandma", ["characters_grandma-lupus"]);
            narration.dialogue = { character: grandma, text: `That was clever, my dear. You saved us with your wits!` };
        },
        async () => {
            narration.dialogue = `The End - Diplomacy ending.`;
            narration.choices = [
                newCloseChoiceOption("Return to Main Menu", { closeCurrentLabel: true }),
                newCloseChoiceOption("End of Demo"),
            ];
        },
    ],
    {
        onLoadingLabel: () => {
            Assets.backgroundLoadBundle(["backgrounds", "characters"]);
        },
    },
);
