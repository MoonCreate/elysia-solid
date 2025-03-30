import Elysia from "elysia";

const encoder = new TextEncoder();

const ResponseStandarPlugin = new Elysia({ name: "response-standar.plugin" })
  .mapResponse({ as: "scoped" }, ({ response, set }) => {
    const isJson = typeof response === 'object'

    const text = isJson
      ? JSON.stringify(response)
      : (response?.toString() ?? '')

    set.headers['Content-Encoding'] = 'gzip'

    return new Response(Bun.gzipSync(encoder.encode(text)), {
      headers: {
        'Content-Type': `${isJson ? 'application/json' : 'text/plain'
          }; charset=utf-8`
      }
    })
  });

export { ResponseStandarPlugin };
