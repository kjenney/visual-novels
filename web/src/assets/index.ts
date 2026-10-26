import generatedManifestJson from "@/assets/manifest.gen.json";
import { AUDIO_BUNDLE_NAME } from "@/constants";
import type { FileRouteTypes } from "@/routeTree.gen";
import type { AssetsManifest } from "@drincs/pixi-vn";

/**
 * Manifest for the assets used in the game.
 * You can read more about the manifest here: https://pixijs.com/8.x/guides/components/assets#loading-multiple-assets
 */
export const manifest: AssetsManifest = {
    bundles: [
        ...generatedManifestJson.bundles,
        {
            name: AUDIO_BUNDLE_NAME,
            assets: [
                // Local files (served from /public/audio). pixi-vn's sound
                // module decodes these via Tone.js; the "audio" loader
                // registered in assets-utility.ts keeps PixiJS's Assets from
                // warning that it has no parser for .wav.
                {
                    alias: "bgm_cheerful",
                    src: "/audio/bgm_cheerful.wav",
                },
                {
                    alias: "sfx_whoosh",
                    src: "/audio/sfx_whoosh.wav",
                },
            ],
        },
        // screens
        {
            name: "/" as FileRouteTypes["fullPaths"],
            assets: [
                {
                    alias: "background_main_menu",
                    src: "/main-menu.png", // Local path relative to public directory
                },
            ],
        },
        // labels - Little Red Riding Hood story
        // The label's backgrounds (backgrounds_forest-path, backgrounds_grandma-cottage,
        // backgrounds_wolf-forest) and every character sprite (characters_red-riding-hood,
        // characters_grandma-lupus, characters_huntsman, characters_wolf-forest) come
        // from the generated manifest's "backgrounds" and "characters" bundles. Don't
        // re-register those aliases here: the resolver keeps the last registration, so a
        // duplicate entry would shadow the generated one.
        // characters
        {
            name: "fm01",
            assets: [
                {
                    alias: "fm01-body",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-body.webp",
                },
                {
                    alias: "fm01-eyes-grin",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-eyes-grin.webp",
                },
                {
                    alias: "fm01-eyes-smile",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-eyes-smile.webp",
                },
                {
                    alias: "fm01-eyes-soft",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-eyes-soft.webp",
                },
                {
                    alias: "fm01-eyes-upset",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-eyes-upset.webp",
                },
                {
                    alias: "fm01-eyes-wow",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-eyes-wow.webp",
                },
                {
                    alias: "fm01-mouth-grin00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-grin00.webp",
                },
                {
                    alias: "fm01-mouth-serious00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-serious00.webp",
                },
                {
                    alias: "fm01-mouth-serious01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-serious01.webp",
                },
                {
                    alias: "fm01-mouth-smile00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-smile00.webp",
                },
                {
                    alias: "fm01-mouth-smile01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-smile01.webp",
                },
                {
                    alias: "fm01-mouth-soft00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-soft00.webp",
                },
                {
                    alias: "fm01-mouth-soft01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-soft01.webp",
                },
                {
                    alias: "fm01-mouth-upset00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-upset00.webp",
                },
                {
                    alias: "fm01-mouth-upset01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-upset01.webp",
                },
                {
                    alias: "fm01-mouth-wow01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm01/fm01-mouth-wow01.webp",
                },
            ],
        },
        {
            name: "fm02",
            assets: [
                {
                    alias: "fm02-body",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-body.webp",
                },
                {
                    alias: "fm02-eyes-bawl",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-eyes-bawl.webp",
                },
                {
                    alias: "fm02-eyes-joy",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-eyes-joy.webp",
                },
                {
                    alias: "fm02-eyes-nervous",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-eyes-nervous.webp",
                },
                {
                    alias: "fm02-eyes-smile",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-eyes-smile.webp",
                },
                {
                    alias: "fm02-eyes-upset",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-eyes-upset.webp",
                },
                {
                    alias: "fm02-eyes-wow",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-eyes-wow.webp",
                },
                {
                    alias: "fm02-mouth-cry01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-cry01.webp",
                },
                {
                    alias: "fm02-mouth-nervous00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-nervous00.webp",
                },
                {
                    alias: "fm02-mouth-nervous01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-nervous01.webp",
                },
                {
                    alias: "fm02-mouth-smile00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-smile00.webp",
                },
                {
                    alias: "fm02-mouth-smile01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-smile01.webp",
                },
                {
                    alias: "fm02-mouth-upset00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-upset00.webp",
                },
                {
                    alias: "fm02-mouth-upset01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-upset01.webp",
                },
                {
                    alias: "fm02-mouth-wow01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/fm02/fm02-mouth-wow01.webp",
                },
            ],
        },
        {
            name: "m01",
            assets: [
                {
                    alias: "m01-body",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-body.webp",
                },
                {
                    alias: "m01-eyes-annoy",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-eyes-annoy.webp",
                },
                {
                    alias: "m01-eyes-concern",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-eyes-concern.webp",
                },
                {
                    alias: "m01-eyes-cry",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-eyes-cry.webp",
                },
                {
                    alias: "m01-eyes-grin",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-eyes-grin.webp",
                },
                {
                    alias: "m01-eyes-smile",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-eyes-smile.webp",
                },
                {
                    alias: "m01-eyes-wow",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-eyes-wow.webp",
                },
                {
                    alias: "m01-mouth-annoy00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-annoy00.webp",
                },
                {
                    alias: "m01-mouth-annoy01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-annoy01.webp",
                },
                {
                    alias: "m01-mouth-concern00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-concern00.webp",
                },
                {
                    alias: "m01-mouth-concern01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-concern01.webp",
                },
                {
                    alias: "m01-mouth-cry00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-cry00.webp",
                },
                {
                    alias: "m01-mouth-cry01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-cry01.webp",
                },
                {
                    alias: "m01-mouth-grin00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-grin00.webp",
                },
                {
                    alias: "m01-mouth-neutral00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-neutral00.webp",
                },
                {
                    alias: "m01-mouth-neutral01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-neutral01.webp",
                },
                {
                    alias: "m01-mouth-smile00",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-smile00.webp",
                },
                {
                    alias: "m01-mouth-smile01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-smile01.webp",
                },
                {
                    alias: "m01-mouth-wow01",
                    src: "https://pub-72ff059a2c6642fb9eab15df80fb3b45.r2.dev/breakdown/m01/m01-mouth-wow01.webp",
                },
            ],
        },
    ],
};
