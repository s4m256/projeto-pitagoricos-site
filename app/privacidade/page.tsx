import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacidade", description: "Como o site do Projeto Pitagóricos protege visitantes e membros." };

export default function PrivacyPage() {
  return <main id="conteudo"><PageHero eyebrow="Privacidade" title="Menos dados. Mais confiança." description="Esta primeira versão foi desenhada para funcionar sem contas, pagamentos ou formulários próprios."/><section className="section"><div className="shell prose"><h2>Dados de visitantes</h2><p>O site não armazena dados pessoais de visitantes. Quando configurada, a medição de audiência usa Plausible sem cookies e sem criação de perfis pessoais.</p><h2>Links externos</h2><p>Materiais, WhatsApp e contatos institucionais podem levar a serviços externos. Cada serviço é responsável por sua própria política de privacidade.</p><h2>Perfis da equipe</h2><p>Perfis somente serão publicados com consentimento registrado. No caso de menores de idade, também será exigida autorização do responsável.</p><h2>Atualizações</h2><p>Esta política deverá receber os canais oficiais de contato e a data de vigência antes do lançamento público.</p></div></section></main>;
}
