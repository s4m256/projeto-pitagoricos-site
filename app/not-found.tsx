import Link from "next/link";

export default function NotFound() {
  return <main id="conteudo" className="not-found"><div><span>404</span><h1>Essa órbita ainda não existe.</h1><p>A página pode ter mudado de endereço ou ainda estar em preparação.</p><Link className="button button-yellow" href="/">Voltar ao início</Link></div></main>;
}
