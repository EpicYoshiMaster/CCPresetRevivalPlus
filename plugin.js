export default class CCPresetRevival extends Plugin {
    prestart() {
		sc.TitleScreenButtonGui.inject({
			init() {
				this.parent();
				this._createButton("preset", this.buttons.last().hook.pos.y + 39, 6, () => {
					this.background.doStateTransition("DEFAULT");
					this.presetMenu.activate();
				}, "preset");
			}
		});

		const oldNames = ["0-before-boss", "1-rhombus-dng-start", "2-continue-story", "3-autumn-rise", "4-apollo-duel", "5-before-bergen", "6-before-maroon", "7-fajro-temple", "8-autumns-fall"];

		sc.savePreset.slots = [];

		const files = findPresets('assets/data/save-presets/');
		for (const file of files) {
			const name = file.replace('.json', '');
			if (oldNames.includes(name)) {
				continue;
			}

			sc.savePreset.slots.push(new sc.SavePresetData(name));
		}
    }
}

function findPresets(dir, subDirName) {
	const fs = require('fs');
	const { resolve } = require('path');

	const directoryItems = fs.readdirSync(dir);

	let files = [];
	for(const dirItem of directoryItems)
	{
		const itemPath = resolve(dir, dirItem);
		const stat = fs.lstatSync(itemPath);

		if(stat.isDirectory())
		{
			files = files.concat(findPresets(itemPath, subDirName ? (subDirName + '/' + dirItem) : dirItem));
		}
		else if(stat.isFile())
		{
			files.push(subDirName ? (subDirName + '/' + dirItem) : dirItem);
		}
	}

	return files;
  }
