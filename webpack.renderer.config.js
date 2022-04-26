let rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const path = require("path");

rules = rules.concat([
	{
		test: /\.css$/,
		use: [{ loader: "style-loader" }, { loader: "css-loader" }]
	},
	{
		test: /\.vue$/,
		use: "vue-loader"
	}
]);

module.exports = {
	module: {
		rules
	},
	plugins: plugins,
	resolve: {
		alias: {
			"@app": path.resolve(__dirname, "src/app")
		},
		extensions: [".js", ".vue", ".ts", ".jsx", ".tsx", ".css"]
	}
};
