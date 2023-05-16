import { pathsToModuleNameMapper } from "ts-jest";
import config from "./tsconfig.json" assert { type: "json" };

export default {
    "transform": {
        "\\.[jt]sx?$": "ts-jest"
    },
    "testEnvironment": "jsdom",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "modulePaths": [
        "<rootDir>/src",
    ],
    "moduleNameMapper": pathsToModuleNameMapper(config.compilerOptions.paths),
    "testPathIgnorePatterns": [
        "/node_modules/",
    ],
    "setupFiles": ["./tests/setupTest.ts"],
}