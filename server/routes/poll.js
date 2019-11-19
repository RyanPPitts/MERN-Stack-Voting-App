const router = require("express").Router();

const handle = require("../handlers");
const auth = require("../middlewares/auth");

router
  .route("/")
  .get(handle.showPolls) // show all polls
  .post(handle.createPoll);

module.exports = router;
