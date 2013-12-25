var action_map = {
	"ACTION_NO": {
		"group": "None",
		"name": "None",
		"description": "No action",
		"code": "0x0000"
	},
	/*
	"ACTION_TRANSPARENT": {
		"description": "",
		"code": "0x0001"
	},
	*/
	"ACTION_KEY": {
		"group": "Key action",
		"name": "Normal key",
		"description": "Send key",
		"code": function(key) {
			return "0x00" + dechex(key, 2);
		},
		"param": [ "key" ],
		"default": [ 0 ]
	},
	"ACTION_MODS": {
		"group": "Key action",
		"name": "Modifier key",
		"description": "Send modifier",
		"code": function(lr, mods) {
			if (lr) {
				return "0x01" + dechex(mods & 0xF);
			}
			else {
				return "0x00" + dechex(mods & 0xF);
			}
		},
		"param": [ "lr", "mods" ],
		"default": [ 0, 0 ]
	},
	"ACTION_MODS_KEY": {
		"group": "Key action",
		"name": "Modified key",
		"description": "Send modifier and key",
		"code": function(lr, mods, key) {
			if (lr) {
				return "0x01" + dechex(mods & 0xF) + dechex(key, 2);
			}
			else {
				return "0x00" + dechex(mods & 0xF) + dechex(key, 2);
			}
		},
		"param": [ "lr", "mods", "key" ],
		"default": [ 0, 0, 0 ]
	},
	"ACTION_DEFAULT_LAYER_SET": {
		"group": "Layer action",
		"name": "Set default",
		"description": "Set default layer",
		"code": function(layer) {
			if (validLayer(layer)) {
				return "0x8C" + dechex((layer / 4) << 1) + dechex(1 << (layer % 4));
			}
			else {
				return "";
			}
		},
		"param": [ "layer" ],
		"default": [ 0 ]
	},
	"ACTION_LAYER_CLEAR": {
		"group": "Layer advanced action",
		"name": "Clear all",
		"description": "Clear state of all layers",
		"code": function(on) {
			if (validOn(on)) {
				return "0x8" + on + "00";
			}
		},
		"param": [ "on" ],
		"default": [ 1 ]
	},
	"ACTION_LAYER_MOMENTARY": {
		"group": "Layer action",
		"name": "Momentary",
		"description": "Turn layer momentarily on",
		"code": function(layer) {
			if (layer >= 0 && layer < 16) {
				return "0xA" + dechex(layer) + "F1";
			}
			else if (layer < 32) {
				layer -= 16;
				return "0xB" + dechex(layer) + "F1";
			}
			else {
				return "";
			}
		},
		"param": [ "layer" ],
		"default": [ 1 ]
	},
	"ACTION_LAYER_TOGGLE": {
		"group": "Layer action",
		"name": "Toggle",
		"description": "Turn layer on/off",
		"code": function(layer) {
			if (validLayer(layer)) {
				return "0x8A" + dechex((layer / 4) << 1) + dechex(1 << (layer % 4));
			}
			else {
				return "";
			}
		},
		"param": [ "layer" ],
		"default": [ 1 ]
	},
	"ACTION_LAYER_INVERT": {
		"group": "Layer advanced action",
		"name": "Invert",
		"description": "Invert current state of layer",
		"code": function(layer, on) {
			if (validLayer(layer) && validOn(on)) {
				return "0x8" + dechex(8 + on) + dechex((layer / 4) << 1) + dechex(1 << (layer % 4));
			}
			else {
				return "";
			}
		},
		"param": [ "layer", "on" ],
		"default": [ 1, 1 ]
	},
	"ACTION_LAYER_ON": {
		"group": "Layer action",
		"name": "On",
		"description": "Turn layer on",
		"code": function(layer, on) {
			if (validLayer(layer) && validOn(on)) {
				return "0x8" + dechex(4 + on) + dechex((layer / 4) << 1) + dechex(1 << (layer % 4));
			}
			else {
				return "";
			}
		},
		"param": [ "layer", "on" ],
		"default": [ 1, 2 ]
	},
	"ACTION_LAYER_OFF": {
		"group": "Layer action",
		"name": "Off",
		"description": "Turn layer off",
		"code": function(layer, on) {
			if (validLayer(layer) && validOn(on)) {
				return "0x8" + dechex(0 + on) + dechex((layer / 4) << 1) + dechex(15 - (1 << (layer % 4)));
			}
			else {
				return "";
			}
		},
		"param": [ "layer", "on" ],
		"default": [ 1, 2 ]
	},
	"ACTION_LAYER_SET": {
		"group": "Layer action",
		"name": "Set",
		"description": "Turn on layer only",
		"code": function (layer) {
			if (validLayer(layer)) {
				return "0x8" + dechex(12 + on) + dechex((layer / 4) << 1) + dechex(1 << (layer % 4));
			}
			else {
				return "";
			}
		},
		"param": [ "layer" ],
		"default": [ 1 ]
	},
	"ACTION_LAYER_ON_OFF": {
		"group": "Layer advanced action",
		"name": "On then off",
		"description": "Turn on layer on press and turn off on release",
		"code": function (layer) {
			if (layer >= 0 && layer < 16) {
				return "0xA" + dechex(layer) + "F1";
			}
			else if (layer < 32) {
				layer -= 16;
				return "0xB" + dechex(layer) + "F1";
			}
			else {
				return "";
			}
		},
		"param": [ "layer" ],
		"default": [ 1 ]
	},
	"ACTION_LAYER_OFF_ON": {
		"group": "Layer advanced action",
		"name": "Off then on",
		"description": "Turn off layer on press and turn on on release",
		"code": function (layer) {
			if (layer >= 0 && layer < 16) {
				return "0xA" + dechex(layer) + "F2";
			}
			else if (layer < 32) {
				layer -= 16;
				return "0xB" + dechex(layer) + "F2";
			}
			else {
				return "";
			}
		},
		"param": [ "layer" ],
		"default": [ 1 ]
	},
	"ACTION_LAYER_SET_CLEAR": {
		"group": "Layer advanced action",
		"name": "Set then clear",
		"description": "Set layer state on press and clear on release",
		"code": function (layer) {
			if (layer >= 0 && layer < 16) {
				return "0xA" + dechex(layer) + "F3";
			}
			else if (layer < 32) {
				layer -= 16;
				return "0xB" + dechex(layer) + "F3";
			}
			else {
				return "";
			}
		},
		"param": [ "layer" ],
		"default": [ 1 ]
	},
	"ACTION_BACKLIGHT_INCREASE": {
		"group": "Backlight action",
		"name": "Increase",
		"description": "Increase backlight brightness",
		"code": "0xD000"
	},
	"ACTION_BACKLIGHT_DECREASE": {
		"group": "Backlight action",
		"name": "Decrease",
		"description": "Decrease backlight brightness",
		"code": "0xD001"
	},
	"ACTION_BACKLIGHT_TOGGLE": {
		"group": "Backlight action",
		"name": "Toggle",
		"description": "Turn backlight on/off",
		"code": "0xD002"
	},
	"ACTION_BACKLIGHT_STEP": {
		"group": "Backlight action",
		"name": "Step",
		"description": "Step through backlight levels",
		"code": "0xD003"
	}
}

function dechex(dec, pad) {
	var hex = Number(dec).toString(16).toUpperCase();
	pad = typeof(pad) === "undefined" || pad == null ? pad = 1 : pad;
	while (hex.length < pad) {
		hex = "0" + hex;
	}
	return hex;
}

function validLayer(layer) {
	return (layer >= 0 && layer < 32);
}

function validOn(on) {
	return (on >= 1 && on <= 3);
}
