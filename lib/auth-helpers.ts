const DEFAULT_AUTH_TIMEOUT_MS = 15000;

export class AuthTimeoutError extends Error {
  constructor(timeoutMs: number) {
    super(`A autenticação não respondeu em ${Math.round(timeoutMs / 1000)} segundos.`);
    this.name = "AuthTimeoutError";
  }
}

export async function withAuthTimeout<T>(
  operation: PromiseLike<T>,
  timeoutMs = DEFAULT_AUTH_TIMEOUT_MS,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      Promise.resolve(operation),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new AuthTimeoutError(timeoutMs)), timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof AuthTimeoutError) {
    return "O serviço de autenticação demorou demais para responder. Tente novamente; se o problema continuar, recarregue a página.";
  }

  const message = error instanceof Error ? error.message : String(error ?? "");
  const normalized = message.toLowerCase();

  if (normalized.includes("failed to fetch") || normalized.includes("network")) {
    return "Não foi possível conectar ao serviço de autenticação. Verifique sua conexão e tente novamente.";
  }
  if (normalized.includes("email rate limit")) {
    return "Muitas tentativas de email foram feitas em pouco tempo. Aguarde alguns minutos e tente novamente.";
  }
  if (normalized.includes("user already registered")) {
    return "Este email já possui uma conta. Use a página de entrada ou recupere sua senha.";
  }
  if (normalized.includes("invalid login credentials")) return "Email ou senha incorretos.";
  if (normalized.includes("password should be")) {
    return "A senha não atende aos requisitos de segurança. Use pelo menos 8 caracteres.";
  }

  return message || "Não foi possível concluir a autenticação. Tente novamente.";
}
