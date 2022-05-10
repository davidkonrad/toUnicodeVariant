module.exports = {
		"env": {
        "browser": true,
				"node": true,
        "es2020": true
    },
		"root": true,
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
				"$": "readonly",
				"Api": "readonly",
				"bootbox": "readonly",
				"hash": "readonly",
				"dayjs": "readonly",
				"Crudder": "readonly",
				"SUNEDITOR": "readonly",
				"SUNEDITOR_LANG": "readonly",
				"ACTIVITY": "readonly",
    },
    "parserOptions": {
        "ecmaVersion": "2020",
        "sourceType": "module"
    },
    "rules": {
        "eqeqeq": "error"
    }
};
