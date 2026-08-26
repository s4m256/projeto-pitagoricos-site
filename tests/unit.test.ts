import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getOlympiadLevel, LEVEL_MAPPING_YEAR } from "../lib/olympiad-levels";
import { recommend, recommendForVisitor } from "../lib/recommendations";
import type { Material } from "../lib/database.types";
const material = (id: string, status: "draft" | "published"): Material => ({ id, title: id, description: "Descrição pedagógica", subject: "Astronomia", olympiad: "OBA", levels: ["Nível 3"], material_type: "lista", objective: "praticar", source_kind: "external", external_url: "https://example.com", storage_path: null, status, featured: false, sort_order: 0, created_by: "00000000-0000-0000-0000-000000000000", published_at: status === "published" ? new Date().toISOString() : null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
test("mapeamentos de níveis são os verificados para 2026", () => { assert.equal(LEVEL_MAPPING_YEAR, 2026); assert.equal(getOlympiadLevel("OBA", "8ef"), "Nível 3"); assert.equal(getOlympiadLevel("OBA", "1em"), "Nível 4"); assert.equal(getOlympiadLevel("OBMEP", "6ef"), "Nível 1"); assert.equal(getOlympiadLevel("OBMEP", "9ef"), "Nível 2"); assert.equal(getOlympiadLevel("OBMEP", "3em"), "Nível 3"); assert.equal(getOlympiadLevel("ONC", "6ef"), "Nível A"); assert.equal(getOlympiadLevel("ONC", "2em"), "Nível D"); assert.equal(getOlympiadLevel("ONC", "3em"), "Nível E"); });
test("recomendação pública é determinística e explicável", () => { const result = recommendForVisitor("8ef", "astronomia"); assert.equal(result.olympiads[0].name, "OBA"); assert.equal(result.olympiads[0].level, "Nível 3"); assert.match(result.olympiads[0].reason, /interesse/i); });
test("draft nunca entra na recomendação pública e published entra", () => { const result = recommend({ grade: "8ef", subjects: ["Astronomia"], olympiads: ["OBA"], objective: "praticar", experience: "nunca" }, [material("draft", "draft"), material("published", "published")]); assert.deepEqual(result.materials.map((item) => item.id), ["published"]); });

test("preserva os dois PNGs oficiais da marca sem alteração", () => {
  const hash = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();
  assert.equal(hash("public/brand/pitagoricos-blue-on-light-original.png"), "141C60A080E99248CD9403FCFD8E667036199D83282D610D73FA4BF991157C49");
  assert.equal(hash("public/brand/pitagoricos-white-on-dark-original.png"), "7CDB96745EA6E9111A648BC97D2088087D0F1C126D2A91644E0F526E956D323F");
});
