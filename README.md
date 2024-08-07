# NestJS Queue

Implementado resiliencia das das operações
- Caso a operação falhe recolocar na fila e retentar por 3 vezes
- Caso falhe a última tentativa salvar o evento e notificar o suporte