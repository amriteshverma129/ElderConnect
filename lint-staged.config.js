// lint-staged.config.js
module.exports = {
    // Type check TypeScript files
    "**/*.(ts|tsx)": () => "tsc --noEmit",
    // Lint then format TypeScript and JavaScript files
    "**/*.(ts|tsx|js)": (filenames) => [`eslint ${filenames.join(" ")}`],
    // Format MarkDown and JSON
    "**/*.(md|json)": (filenames) => `prettier ${filenames.join(" ")}`,
};
