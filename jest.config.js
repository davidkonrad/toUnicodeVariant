module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				tsconfig: {
					lib: ["es2021", "dom"],
					esModuleInterop: true,
				}
			}
		]
	}
};
