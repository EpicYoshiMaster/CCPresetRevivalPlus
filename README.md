# CCPresetRevivalPlus
This mod re-enables an enhanced version of the Save Preset menu, which allows you to start the game from a specific part of the story.

## Setting Up Presets
Save Presets are found and stored in `<CrossCode Root Directory>/assets/data/save-presets`.

The mod will look here for new presets that end in `.json`, ignoring the old base-game presets (ex. `0-before-boss.json`).

**To make a new preset:**
1. Create a new file ending in `.json` in the `save-presets` folder. For simplicity and organization, most presets are typically named `##-Preset-Title.json`, where `##` are 2 numbers to help keep presets in order. This is totally optional though, any name will work!
2. Inside your file, you can use the following template:
```json
{
    "title": {
        "langUid": 1,
        "en_US": "Preset Title",
        "de_DE": "Preset Title",
        "zh_CN": "Preset Title",
        "ko_KR": "Preset Title",
        "ja_JP": "Preset Title"
    },
    "sub": {
        "langUid": 2,
        "en_US": "Preset Subtitle",
        "en_DE": "Preset Subtitle",
        "zh_CN": "Preset Subtitle",
        "de_DE": "Preset Subtitle",
        "ko_KR": "Preset Subtitle",
        "ja_JP": "Preset Subtitle"
    },
    "savefile": "Your save string goes here"
}
```

Your preset will look something like this:
![preset-example](https://user-images.githubusercontent.com/32598419/213625882-206df9ab-030e-47a0-9ac3-dd5113b31259.png)

3. Replace the `title` and `sub` names with whatever you'd like for the preset you're trying to make!
4. Place the appropriate save string for where you want the preset to start into the `savefile` property. You can get a save string by pressing **F10** while in-game. Click the giant string of text under "Current Save Slot Data" and copy that into `savefile`. You'll know it's a save string if it starts with `[-!_0_!-]`.
5. You're done! You should be able to boot the game up with this mod and use your new preset!

## Folder Support
With Preset Revival Plus, you have the ability to use folders to help organize your huge mess of presets!

Inside your presets folder (`<CrossCode Root Directory>/assets/data/save-presets`), you can place your presets in any number of layers of folders, but the top layer is the most important.

The top folder layer (ex. `.../save-presets/MyPresetFolder/00-my-preset.json`) is used to divide presets into separate tabs in-game. This example preset would show under a tab called `MyPresetFolder`, along with any other presets in that folder (or folders in that folder containing more presets).

The tab order as well as preset order are determined by the overall file order, so `.../save-presets/A/` will come before `.../save-presets/B/` and so on. The same ordering system applies to any sub-folders within those tabs.

For convenience, if a tab folder is named `##-Folder Name` where `##` can be replaced with two numbers to keep things organized, the tab name in-game will show as just `Folder Name` instead.

An example `save-presets` folder using Folder Support:
![folders-example](https://user-images.githubusercontent.com/32598419/213628491-333f8b82-a58b-4cc1-8ca5-d1c0ec6e56b7.png)

This would appear in-game as:
![image](https://user-images.githubusercontent.com/32598419/213628758-c6ea3aac-53a3-4ead-b56b-277d8d66743e.png)
