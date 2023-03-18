const NO_CATEGORY_NAME = "No Category";
const NO_PRESETS_FOUND = "No Presets Found";

sc.TitleScreenButtonGui.inject({
	init() {
		this.parent();
		this._createButton("preset", this.buttons.last().hook.pos.y + 39, this.buttons.length + 1, () => {
			this.background.doStateTransition("DEFAULT");
			this.presetMenu.activate();
		}, "preset");
	}
});

sc.SavePresetData.inject({
	category: NO_CATEGORY_NAME,

	init(filePath, presetCategory) {
		this.parent(filePath);
		this.category = presetCategory;
	}
});

class PresetFileCategory {
	constructor(name, category) {
		this.name = name;
		this.category = category;
	}
}

const oldNames = ["0-before-boss", "1-rhombus-dng-start", "2-continue-story", "3-autumn-rise", "4-apollo-duel", "5-before-bergen", "6-before-maroon", "7-fajro-temple", "8-autumns-fall"];

sc.savePreset.slots = [];

const presetFiles = findPresets('assets/data/save-presets/');
for (const presetFile of presetFiles) {

	if(!presetFile.name.includes('.')) continue;
	
	const name = presetFile.name.slice(0, presetFile.name.lastIndexOf('.'));
	const category = presetFile.category;

	if (oldNames.includes(name)) {
		continue;
	}

	sc.savePreset.slots.push(new sc.SavePresetData(name, category));
}

function findPresets(dir, subDirName, category) {
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
			if(!category) {
				category = (dirItem.indexOf('-') == 2 && dirItem.length > 3) ? dirItem.substring(3) : dirItem;
			}
			files = files.concat(findPresets(itemPath, subDirName ? (subDirName + '/' + dirItem) : dirItem, category));
		}
		else if(stat.isFile())
		{
			files.push(new PresetFileCategory(subDirName ? (subDirName + '/' + dirItem) : dirItem, NO_CATEGORY_NAME));
		}
	}

	return files;
}

sc.TitlePresetMenu.inject({
	pageLeftButton: null,
	pageRightButton: null,
	categoryList: [],
	currCategoryIndex: 0,

	init(b, a) {
		this.parent(b, a);
		this.backButton.setWidth(136);

		this.pageLeftButton = new sc.ButtonGui("\\i[arrow-left]", 34, true, sc.BUTTON_TYPE.SMALL);
		this.pageLeftButton.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_BOTTOM);
		this.pageLeftButton.setPos(34, 1);
		this.pageLeftButton.keepMouseFocus = true;
		this.pageLeftButton.submitSound = sc.BUTTON_SOUND.submit;
		this.pageLeftButton.onButtonPress = function() {
			this.setCategoryIndex(this.currCategoryIndex - 1);
		}.bind(this);
		this.buttonInteract.addGlobalButton(this.pageLeftButton, this.onLeftPressCheck.bind(this));
		this.addChildGui(this.pageLeftButton);

		this.pageRightButton = new sc.ButtonGui("\\i[arrow-right]", 34, true, sc.BUTTON_TYPE.SMALL);
		this.pageRightButton.setAlign(ig.GUI_ALIGN.X_RIGHT, ig.GUI_ALIGN.Y_BOTTOM);
		this.pageRightButton.setPos(0, 1);
		this.pageRightButton.keepMouseFocus = true;
		this.pageRightButton.submitSound = sc.BUTTON_SOUND.submit;
		this.pageRightButton.onButtonPress = function() {
			this.setCategoryIndex(this.currCategoryIndex + 1);
		}.bind(this);
		this.buttonInteract.addGlobalButton(this.pageRightButton, this.onRightPressCheck.bind(this));
		this.addChildGui(this.pageRightButton);

		this.categoryList = [];

		for(let i = 0; i < sc.savePreset.slots.length; i++) {
			const presetCategory = sc.savePreset.slots[i].category;

			if(!this.categoryList.includes(presetCategory)) {
				this.categoryList.push(presetCategory);
			}
		}

		if(this.categoryList.length > 0) {
			this.header.setText(this.categoryList[this.currCategoryIndex]);
		}
		else {
			this.header.setText(NO_PRESETS_FOUND);
		}
	},
	setCategoryIndex(index) {
		let newIndex = index;

		if(newIndex >= this.categoryList.length) {
			newIndex = 0;
		}

		if(newIndex < 0) {
			newIndex = this.categoryList.length - 1;
		}

		if(newIndex === this.currCategoryIndex) return;

		this.currCategoryIndex = newIndex;

		if(this.categoryList.length > 0) {
			this.header.setText(this.categoryList[this.currCategoryIndex]);
		}
		else {
			this.header.setText(NO_PRESETS_FOUND);
		}

		this.createList();
	},
	onLeftPressCheck() {
		return sc.control.menuCircleLeft()
	},
	onRightPressCheck() {
		return sc.control.menuCircleRight()
	},
	createList() {
		var lastIndex = 0,
			a = 0,
			lastIndex = this.itemList.list.buttonGroup.current.y,
			a = -this.itemList.list.box.hook.scroll.y;

		this.itemList.list.buttonGroup.clear();
		this.itemList.list.clear(false);
		this.slots.length = 0;

		if(this.categoryList.length <= 0) return;

		for (let index = 0; index < sc.savePreset.slots.length; index++) {
			if(sc.savePreset.slots[index].category !== this.categoryList[this.currCategoryIndex]) continue;

			let newPresetButton = new sc.TitlePresetMenu.SaLoButton(index, sc.savePreset.slots[index]);
			newPresetButton.setSize(201, 44);
			this.itemList.addButton(newPresetButton);
			this.slots[index] = newPresetButton;
		}

		lastIndex = Math.max(0, Math.min(lastIndex, this.itemList.list.getChildren().length));
		this.itemList.list._prevIndex = lastIndex;
		ig.input.mouseGuiActive ? this.itemList.list.buttonGroup.setCurrentFocus(0, lastIndex) : this.itemList.list.buttonGroup.focusCurrentButton(0, lastIndex, false, true);
		this.itemList.list.scrollToY(a, true)
	}
});