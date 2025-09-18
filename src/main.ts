import "reflect-metadata";
import chalk from "chalk";
import type { Express } from "express";
import express from "express";
import "express-async-errors";
import datasource from "./datasource.js";
import errorHandler from "./middlewares/error.middleware.js";
import { PORT } from "./utils/env.js";
import { logger } from "./utils/logger.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((req, res) => {
	res.status(404).json({ status: "not-found" });
});

app.use(errorHandler);

datasource
	.initialize()
	.then(() => {
		logger.info(chalk.green("Connected to the database"));
		app.listen(PORT, () => {
			logger.info(`${chalk.green("Listening on port")} ${chalk.magenta(PORT)}`);
		});
	})
	.catch((err) => {
		logger.error(err);
		process.exit(1);
	});

async function cleanup() {
	try {
		if (!datasource.isInitialized) return;
		await datasource.destroy();
		logger.info(chalk.green("Closed the database connection"));
	} catch (err) {
		logger.info(chalk.red("Failed to closed the database connection"));
		logger.error(err);
	}
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("beforeExit", cleanup);
