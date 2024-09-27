const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY051d2ZjanMxWDc5aFhFbkhBWTlQU0tPdTNycW5Id3MrTEVZRHdaK0lWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielk2ZDFKdHh6YmRWNUZlSm85aEVvMkFHd0hCUkkxUDlqa3U5dVFyUUJUTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTEtvUS9OakJ3VWFadHZGMkplRUJpRzZ2aTBKdklNdzQrZmxjL2wvazJBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJOXhJN0hTODFmcDRqWFRyWkhwQzBOM3BKZmlxNjExTHloTzdrdEVuMVRFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBINXZ6VVJORGdNMTlJSjQyVVVDOE9BRG5mU3kvVHgxTVpPSVNCMzZta0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxYVk5MdDFwTVNlRWFKU3U5MldrREdHRUFmaFFPdkdIS0piZVVrZDR2eHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0hJQ1lyb0lSQ3dYb1hsbkxoWnJ4NC9KT3dETU8vQkV6eThNR2wyVEtuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFczaFk5elhpSjA0OWxvY2dPeklSUVNDcC9WOEdzZnA4YTAwSnduc1JsMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNWMGJLajZ3TXEyQkFQK3hlTmxYQnpIcG1xaHZlQTlXamRjc0xNVFE3SmRHaFAzMThDR1pPV3MvbDJtdGxicG9VZm1adXVLOUdqdWh1OFRMb2JxUmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiJqV3BncGpMWW5OOUdVczBqY0ZXMUdSbVVUMjFrcjUyTWFrYVBiVXVHejhBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYaUF1NVBubVRQS1VQTFpwZTZhSmtRIiwicGhvbmVJZCI6IjM2YThkMTE1LTgxMGQtNDFkYS1hZWYxLTI4ODkzOTYwNmYzOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoQzhXQURTUnBqNXNObWdCbDBJc1FCUXB2S1k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXliQVZXQjY1ZFRoKzZtYk51Zld0K3ZMZSs4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNDMlJTN0JXIiwibWUiOnsiaWQiOiI1MDkzNDk2MDMzMTo0MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZmz8J2aiPCdmbHwnZqILfCdmoPwnZm08J2ZsvCdmbcifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lTbnR1SUdFTE9xMnJjR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im9taGFxRUhnWTVSc3pUWGpMYi95MXZEd3JQTlRkMzlSemhzR2JValc0UmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImpwK1FEQUtKTk1TQjRXdXY3SmRmVm9YS21VdjFxNUd3UlVlU0srVTJ4ekZXUUNIRGovYThFcVRjMHBnQWJ1UG96Mk5jdGJnOFhBamNlbkpKeHczRUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJBZS9lV3JGeVpFN2tadUFVVDFJV2I5WHlnMjdZNjJuZWd0UWVDaTU0S01ZQU1oeFczVlBCcGtuT1VLVHpEYzloL2VPTmpJc1dqMTJkdG1QM0FUS0poQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUwOTM0OTYwMzMxOjQyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFKb1dxaEI0R09VYk0wMTR5Mi84dGJ3OEt6elUzZC9VYzRiQm0xSTF1RVgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc0MzYwOTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSWd5In0=',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Dyby-tech",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "50934960331",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'typing',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://dyby_tech00_user:AXc4WfdgEAH1WVCvyKa80lyE1j0u4k06@dpg-cri73ml6l47c73ducd50-a.oregon-postgres.render.com/dyby_tech00"
        : "postgresql://dyby_tech00_user:AXc4WfdgEAH1WVCvyKa80lyE1j0u4k06@dpg-cri73ml6l47c73ducd50-a.oregon-postgres.render.com/dyby_tech00",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
