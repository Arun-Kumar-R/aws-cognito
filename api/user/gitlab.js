const { Gitlab } = require("@gitbeaker/node");
const Env = require("../../config/env");

const api = new Gitlab({
  token: Env.GITLAB_TOKEN,
  host: Env.GITLAB_HOST,
  camelize: Env.GITBEAKER_CAMELIZE,
});

const gitLabApiCall = async (req, res) => {
  const query = req.query.name;
  console.log(query);
  const Projects = await api.Projects.all({
    search: query,
    simple: true,
  });
  console.log(Projects, "GitLab ************************");
  res.status(200).json({
    success: true,
    messgae: "Projects fetched successfully...",
    data: Projects,
  });
};

module.exports = gitLabApiCall;
