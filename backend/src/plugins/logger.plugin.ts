import Elysia from "elysia";

const LoggerPlugin = new Elysia({ name: "logger.plugin" })
  .derive({ as: "global" }, () => ({ startTimestamp: Date.now() }))
  .onBeforeHandle({ as: "global" }, ({ request: { method }, path }) => {
    console.log("[IN ]", method, path);
  })
  .onAfterHandle(
    { as: "global" },
    ({ request: { method }, path, set: { status }, startTimestamp }) => {
      console.info(
        "[OUT]",
        method,
        path,
        status,
        "in",
        Date.now() - startTimestamp,
        "ms",
      );
    },
  )
  .onError(
    { as: "global" },
    ({ request: { method }, path, set: { status }, startTimestamp, error }) => {
      console.error(
        "[ERR]",
        method,
        path,
        status,
        "in",
        startTimestamp ? Date.now() - startTimestamp : 0,
        "ms",
      );
      console.error(error);
    },
  );

export { LoggerPlugin };
