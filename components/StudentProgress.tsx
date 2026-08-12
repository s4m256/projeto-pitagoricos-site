"use client";

import { useEffect, useMemo, useState } from "react";

const tasks = [
  { id: "choose", title: "Escolher uma olimpíada", detail: "Defina a prova que será sua prioridade." },
  { id: "material", title: "Separar um material", detail: "Escolha uma aula, lista ou e-book para começar." },
  { id: "session", title: "Fazer a primeira sessão", detail: "Estude por 30 minutos e anote as dúvidas." },
  { id: "review", title: "Revisar os erros", detail: "Volte às questões que não conseguiu resolver." },
];

const storageKey = "pitagoricos-student-progress";

export function StudentProgress() {
  const [done, setDone] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setDone(JSON.parse(localStorage.getItem(storageKey) || "[]")); } catch { setDone([]); }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify(done));
  }, [done, ready]);

  const percent = useMemo(() => Math.round((done.length / tasks.length) * 100), [done]);

  function toggle(id: string) {
    setDone((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return <div className="progress-panel">
    <div className="progress-summary">
      <div><span>Seu progresso inicial</span><strong>{percent}%</strong></div>
      <div className="progress-track" aria-label={`${percent}% concluído`}><span style={{ width: `${percent}%` }} /></div>
      <p>O progresso fica salvo somente neste aparelho. Não é necessário criar uma conta.</p>
    </div>
    <div className="progress-list">
      {tasks.map((task) => <label key={task.id} className={done.includes(task.id) ? "completed" : undefined}>
        <input type="checkbox" checked={done.includes(task.id)} onChange={() => toggle(task.id)} />
        <span><strong>{task.title}</strong><small>{task.detail}</small></span>
      </label>)}
    </div>
  </div>;
}
