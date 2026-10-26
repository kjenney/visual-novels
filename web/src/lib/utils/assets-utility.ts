import { manifest } from "@/assets";
import { AUDIO_BUNDLE_NAME } from "@/constants";
import type { FileRouteTypes } from "@/routeTree.gen";
import { Assets, sound } from "@drincs/pixi-vn";

/**
 * PixiJS's Assets has no built-in parser for audio, but pixi-vn's sound
 * module routes the audio bundle through Assets (to resolve each alias to a
 * URL) before Tone.js decodes it. Without a parser that claims the audio
 * extensions, Assets logs "could not be loaded as we don't know how to parse
 * it" for every audio file. Register a minimal loader that claims those
 * extensions and resolves to null — sound.load() does the real decode via
 * Tone.js — so the aliases resolve cleanly and the warning goes away.
 *
 * Guarded so a hot-reload of this module doesn't push a duplicate parser.
 */
const AUDIO_FILE_RE = /\.(wav|mp3|ogg|oga|opus|flac|m4a|aac)(\?|#|$)/i;
if (!Assets.loader.parsers.some((parser) => parser.id === "audio")) {
    Assets.loader.parsers.push({
        id: "audio",
        name: "audio",
        test: (url) => AUDIO_FILE_RE.test(url) || url.startsWith("data:audio/"),
        load: async () => null,
    });
}

let assetsInitialized = false;

/**
 * Define all the assets that will be used in the game.
 * This function will be called before the game starts.
 * You can read more about assets management in the documentation: https://pixi-vn.com/start/assets-management.html
 */
export async function defineAssets() {
    if (!assetsInitialized) {
        await Assets.init({ manifest });
        assetsInitialized = true;
    }

    // The game will not start until these asserts are loaded.
    await Assets.loadBundle("/" as FileRouteTypes["fullPaths"]);

    // The audio bundle will be loaded in the background, so it will be available when needed, but it won't block the game start.
    sound.backgroundLoadBundle(AUDIO_BUNDLE_NAME);

    // The game will start immediately, but these asserts will be loaded in the background.
    // Assets.backgroundLoadBundle("main_menu");
    // Assets.backgroundLoad("background_main_menu");
}

/**
 * Get the PixiJS asset from the given asset string.
 * If the asset is not a PixiAsset, it will return the asset as is.
 * @param asset - The asset string to resolve.
 * @returns The resolved PixiJS asset or the original asset string.
 */
export function getPixiJSAsset(asset: string) {
    // check if the asset is a PixiAsset
    return Assets.resolver.resolve(asset).src || asset;
}
