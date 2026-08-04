import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the finished Pitagóricos homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Projeto Pitagóricos/);
  assert.match(html, /Prepare-se para a sua próxima/);
  assert.match(html, /Quero estudar/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/);
  assert.match(html, /lang="pt-BR"/);
});

test("renders core public routes", async () => {
  for (const pathname of ["/estude", "/materiais", "/impacto", "/parceiros", "/sobre", "/novidades", "/privacidade"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /Projeto Pitagóricos/, pathname);
  }
});
