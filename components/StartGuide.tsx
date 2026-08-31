"use client";

import Link from "next/link";
import { useState } from "react";
import { grades } from "@/lib/olympiad-levels";
import { recommendForVisitor } from "@/lib/recommendations";

const interests = [
  { value: "matematica", label: "Matemática e problemas" }, { value: "astronomia", label: "Espaço e astronomia" },
  { value: "ciencias", label: "Ciências em geral" }, { value: "incerto", label: "Ainda não sei" },
];

export function StartGuide() {
  const [grade, setGrade] = useState(""); const [interest, setInterest] = useState("");
  const result = grade && interest ? recommendForVisitor(grade, interest) : null;
  return <div className="guide-card">
    <div className="guide-step"><span>1</span><label htmlFor="visitor-grade">Em que série você está?</label><select id="visitor-grade" value={grade} onChange={(e) => setGrade(e.target.value)}><option value="">Selecione sua série</option>{grades.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></div>
    <fieldset className="guide-step"><legend><span>2</span> O que mais chama sua atenção?</legend><div className="choice-grid">{interests.map((item) => <label className={interest === item.value ? "selected" : ""} key={item.value}><input type="radio" name="interest" value={item.value} checked={interest === item.value} onChange={(e) => setInterest(e.target.value)} />{item.label}</label>)}</div></fieldset>
    {result && <div className="recommendation-result" aria-live="polite"><p className="eyebrow">Sua recomendação</p><div className="recommendation-grid">{result.olympiads.map((item, index) => <article key={item.name}><small>{index === 0 ? "Recomendação principal" : "Alternativa"}</small><h2>{item.name}</h2><strong>{item.level}</strong><p>{item.reason}</p><Link className="button button-yellow" href={`/olimpiadas/${item.slug}`}>Conhecer {item.name}</Link></article>)}</div><p className="next-step"><strong>Próximo passo:</strong> {result.nextStep}</p></div>}
  </div>;
}
