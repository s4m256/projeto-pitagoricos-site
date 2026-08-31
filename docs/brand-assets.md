# Assets oficiais da marca

Os dois PNGs oficiais recebidos foram preservados sem alteração em `public/brand/`:

- `pitagoricos-blue-on-light-original.png` — SHA-256 `141C60A080E99248CD9403FCFD8E667036199D83282D610D73FA4BF991157C49`;
- `pitagoricos-white-on-dark-original.png` — SHA-256 `7CDB96745EA6E9111A648BC97D2088087D0F1C126D2A91644E0F526E956D323F`.

A versão branca é usada no header, hero e footer escuros por meio do derivado `pitagoricos-white-transparent.png`; a prévia social continua usando o original com fundo. A versão azul é usada nos cartões claros de autenticação. O excesso de canvas é recortado somente na apresentação por CSS. Os dois arquivos oficiais originais permanecem intactos.

O derivado transparente é gerado deterministicamente por `scripts/extract-brand-alpha.mjs`: ele remove apenas o fundo sólido azul-marinho do canvas e recompõe o alfa das bordas antialiasadas. O script não redesenha, redimensiona, recorta nem recolore a marca.

No hero, a iluminação radial está vinculada ao contêiner da própria logo e centralizada geometricamente nele. Ela acompanha a marca nas mudanças responsivas, sem coordenadas fixas relativas à página.

Os assets anteriores continuam preservados no repositório para histórico, mas não são mais referenciados pela interface. O favicon existente foi mantido porque não foi fornecida uma versão oficial específica e legível para tamanhos pequenos.
