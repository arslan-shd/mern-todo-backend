const Agenda = require("agenda");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const agenda = new Agenda({
  db: { address: DB, collection: "agendaJobs" },
});

module.exports = agenda;