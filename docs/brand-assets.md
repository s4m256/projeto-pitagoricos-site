# Assets da nova marca

O briefing referencia duas logos novas (azul para fundo claro e branca para fundo azul-escuro), mas esses arquivos não estavam presentes no diretório de anexos recebido nem no repositório auditado.

Por segurança, a implementação não redesenha nem deriva uma marca inexistente. Os arquivos atuais `public/logo-pitagoricos.png`, `public/logo-rocket.png` e `public/favicon.svg` foram preservados temporariamente.

Quando os PNGs oficiais forem fornecidos:

1. salve os originais sem alteração em `public/brand/`;
2. use a versão branca no header, hero e footer escuros;
3. use a versão azul em superfícies claras;
4. só crie derivados de crop de canvas, mantendo arte, proporção e cores;
5. mantenha o favicon atual se não houver uma versão oficial legível em tamanho pequeno.
