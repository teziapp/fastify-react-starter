import { execSync, spawnSync } from "node:child_process";
import crypto from "node:crypto";
import { default as fs } from "node:fs";
import { default as path } from "node:path";
import { cancel, confirm, intro, outro, select, spinner, text } from "@clack/prompts";

// Function to execute shell commands
function executeCommand(command: string) {
	console.log(`\x1b[33m${command}\x1b[0m`);
	try {
		return execSync(command, { encoding: "utf-8" });
	} catch (error: any) {
		// throw error
		throw error;
	}
}

// Function to prompt user for input without readline-sync
async function prompt(message: string, defaultValue: string): Promise<string> {
	return (await text({
		message: `${message} (${defaultValue}):`,
		placeholder: defaultValue,
		defaultValue,
	})) as string;
}

// Function to prompt for Google client credentials
async function promptForGoogleClientCredentials() {
	intro("Now, time for auth!");

	const envPath = path.join(__dirname, "..", "apps", "api", ".env");

	console.log(
		"\x1b[33mNow, we will set up authentication for your app using Google OAuth2. \nGo to https://console.cloud.google.com/, create a new project and set up OAuth consent screen.\nThen, go to Credentials > OAuth client ID and create a new client ID.\nPaste the client ID and client secret below. \n\nMore info: https://developers.google.com/workspace/guides/configure-oauth-consent#:~:text=Go%20to%20OAuth%20consent%20screen,sensitive%20scopes%2C%20and%20restricted%20scopes.\x1b[0m",
	);
	const defaultClientId = "your_google_client_id";
	const defaultClientSecret = "your_google_client_secret";
	const clientId = await prompt(
		"Enter your Google Client ID (default: your_google_client_id)",
		defaultClientId,
	);
	const clientSecret = await prompt(
		"Enter your Google Client Secret (enter to skip)",
		defaultClientSecret
	);

	try {
		if (fs.existsSync(envPath)) {
			let envContent = fs.readFileSync(envPath, 'utf-8');
			envContent = envContent.replace(/GOOGLE_CLIENT_ID=.*/, `GOOGLE_CLIENT_ID=${clientId}`);
			envContent = envContent.replace(/GOOGLE_CLIENT_SECRET=.*/, `GOOGLE_CLIENT_SECRET=${clientSecret}`);
			fs.writeFileSync(envPath, envContent);
		} else {
			fs.appendFileSync(
				envPath,
				`GOOGLE_CLIENT_ID=${clientId}\nGOOGLE_CLIENT_SECRET=${clientSecret}\n`,
			);
		}
		console.log(
			"\x1b[33m.env file created with Google Client ID and Client Secret.\x1b[0m",
		);
	} catch (error) {
		console.error("\x1b[31mError creating .env file:", error, "\x1b[0m");
		cancel("Operation cancelled.");
	}

	outro(".env updated with Google Client ID and Client Secret.");
}

// Function to generate secure random 32-character string
function generateSecureRandomString(length: number): string {
	return crypto
		.randomBytes(Math.ceil(length / 2))
		.toString("hex")
		.slice(0, length);
}

async function setupDatabase() {
	try {
		intro(`Let's set up your database...`);
	
	
  const dbSetupSpinner = spinner();
  dbSetupSpinner.start("Setting up the database...");
  // ask for db name
  const dbName = await prompt("Enter database name", "boilerplate");
  // ask for db user
  const dbUser = await prompt("Enter database username", "postgres");
  // ask for db password
  const dbPassword = await prompt("Enter database password", "postgres");
  // ask for db url
  const dbUrl = `postgres://${dbUser}:${dbPassword}@localhost:5432/${dbName}`;
  // append db url in .env
	// if .env file exists, append to it and change the DB_URL if already exists
	if (fs.existsSync(path.join(__dirname, '..', 'apps', 'api', '.env'))) {
		const envContent = fs.readFileSync(path.join(__dirname, '..', 'apps', 'api', '.env'), 'utf-8');
		const updatedEnvContent = envContent.replace(/DB_URL=.*/, `DB_URL=${dbUrl}`);
		fs.writeFileSync(path.join(__dirname, '..', 'apps', 'api', '.env'), updatedEnvContent);
	}

  await executeCommand("pnpm run db create");
  await executeCommand("pnpm run db migrate up");
  
		dbSetupSpinner.stop("Database setup completed.");
	} catch (error) {
		console.error("\x1b[31mError setting up database:", error, "\x1b[0m");
		throw error;
	}
}

async function createEnvFiles() {
  const envSpinner = spinner();
  envSpinner.start("Creating .env files...");

  const rootEnvContent = `ENVIRONMENT='dev'
FRONTEND_URL=http://localhost:5173
VITE_BE_URL=http://localhost:3000
VITE_POSTHOG_KEY=your_posthog_key
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_CLARITY_ID=your_clarity_id`;

  const apiEnvContent = `ENVIRONMENT='dev'
DB_URL=postgres://postgres:postgres@localhost:5432/boilerplate
DB_TEST_URL=postgres://postgres:postgres@localhost:5432/boilerplate
FRONTEND_URL=http://localhost:5173
VITE_BE_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=${generateSecureRandomString(32)}
AXIOM_DATASET=your_axiom_dataset
AXIOM_TOKEN=your_axiom_token`;

  fs.writeFileSync(path.join(__dirname, '..', '.env'), rootEnvContent);
  fs.writeFileSync(path.join(__dirname, '..', 'apps', 'api', '.env'), apiEnvContent);

  envSpinner.stop(".env files created successfully.");
}

async function promptForAnalyticsCredentials() {
  intro("Setting up analytics...");

  const posthogKey = await prompt("Enter your PostHog API Key", "your_posthog_key");
  const clarityId = await prompt("Enter your Microsoft Clarity ID", "your_clarity_id");
  const axiomDataset = await prompt("Enter your Axiom Dataset", "your_axiom_dataset");
  const axiomToken = await prompt("Enter your Axiom Token", "your_axiom_token");

  // Update root .env
  let rootEnvContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf-8');
  rootEnvContent = rootEnvContent.replace(/VITE_POSTHOG_KEY=.*/, `VITE_POSTHOG_KEY=${posthogKey}`);
  rootEnvContent = rootEnvContent.replace(/VITE_CLARITY_ID=.*/, `VITE_CLARITY_ID=${clarityId}`);
  fs.writeFileSync(path.join(__dirname, '..', '.env'), rootEnvContent);

  // Update api .env
  let apiEnvContent = fs.readFileSync(path.join(__dirname, '..', 'apps', 'api', '.env'), 'utf-8');
  apiEnvContent = apiEnvContent.replace(/AXIOM_DATASET=.*/, `AXIOM_DATASET=${axiomDataset}`);
  apiEnvContent = apiEnvContent.replace(/AXIOM_TOKEN=.*/, `AXIOM_TOKEN=${axiomToken}`);
  fs.writeFileSync(path.join(__dirname, '..', 'apps', 'api', '.env'), apiEnvContent);

  outro("Analytics credentials updated successfully.");
}

async function main() {
  intro("Setting up your Fastify-React Boilerplate project...");

	// first build the project
	await executeCommand("pnpm run build");
  await createEnvFiles();
  await setupDatabase();
  await promptForGoogleClientCredentials();
  await promptForAnalyticsCredentials();

  console.log("\x1b[33mStarting the development server...\x1b[0m");
  spawnSync("pnpm", ["run", "dev"], { stdio: "inherit" });

  outro("Setup completed! Your project is now ready to use.");
}

main();