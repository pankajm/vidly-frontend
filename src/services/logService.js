import * as Sentry from "@sentry/browser";
function init() {
  Sentry.init({
    dsn:
      "https://8b0aacc9ec2646d28002b665bc862399@o403822.ingest.sentry.io/5266883",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
