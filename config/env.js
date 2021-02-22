const env = {
  apiPort: process.env.PORT || 3001,
  dbCon:
    "mongodb+srv://arun:austino@resortdb.2smpc.mongodb.net/ResortDB?retryWrites=true&w=majority",
  Secret: "SUPERSECRET",

  GITLAB_HOST: "https://gitlab.techardors.com",
  GITLAB_TOKEN: "dXyFW5LcD8v9Z2BAjmfy",
  GITBEAKER_CAMELIZE: true,
};

module.exports = env;
