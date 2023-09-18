<div align="justify">

# Race Engineering

No intuito de agilizar processos tecnológicos referentes a formulação de estratégias de corridas de carro, esse projeto visa a entrega de soluções de gerenciamento de corridas, fomentando o fornecimento de informações com 3 visões diferentes: pilotos, engenheiro de pista e engenheiros mecânicos, dado que cada um dos citados apresentam necessidades distintas durante uma corrida. Logo, será provido a exibição de informações sobre atuação da corrida com diferentes *views*, informações previsionais de clima, visualização de performance, informações de tempo e voltas decorrentes e o provisionamento de um chat para a comunicação dos envolvidos.

## Integrantes


* Ian Marcel de Campos Ferreira
* Joey Clapton Maciel Barbosa Santos
* Lorrayne Reis Silva
* Octávio Oliveira Rocha
* Vitor de Souza Xavier
* Vítor José Lara Bastos

## Orientadores

* Cleiton Silva Tavares

* Aline Norberta de Brito
  
  

# Instruções de utilização

## 1. Instalação das Dependências dos Projetos:
  
  - BACKEND (API Principal) - `plf-es-2023-1-ti5-5104100-race-engineering\codigo\backend\main-api`
  
  - BACKEND (Microserviço de Notificações) - `plf-es-2023-1-ti5-5104100-race-engineering\codigo\backend\micro-notifications`
  
  - FRONTEND - `plf-es-2023-1-ti5-5104100-race-engineering\codigo\web\race-engineering`
  
  Abra o terminal em cada uma das pastas e execute o seguinte comando:
    
      npm install
    
 ## 2. Rodando a aplicação:
 
  ### Backend (API Principal)
  Abra o Terminal no path `plf-es-2023-1-ti5-5104100-race-engineering\codigo\backend\main-api` e use o seguinte código para rodar Back-End:
  
    docker-compose up -d
    
    npm run typeorm:cli migration:run
  
    npm run seed:run  (para popular o Banco de Dados, somente na 1ª vez que rodar)
    
    npm run start:dev

  API e sua documentação Swagger estará disponível na URL de desenvolvimento: http://localhost:8000/api-docs
  
  ### Backend (Microserviço de Notificações)
  Abra o Terminal no path `plf-es-2023-1-ti5-5104100-race-engineering\codigo\backend\micro-notifications` e use o seguinte código:
        
    npm run start:dev
  
  ### Frontend:
   Abra o Terminal no path `plf-es-2023-1-ti5-5104100-race-engineering\codigo\web\race-engineering` e use o seguinte código para rodar o Front-End:
    
    npm run dev
    
O projeto estará disponível na URL de desenvolvimento: http://localhost:3000

## Histórico de versões

* 1.0.0
    * CHANGE: Atualização das documentações
    * Trabalhando na modelagem do processo de negócios.
* 2.0.0
    * Definição arquitetural
    * Trabalhando no back-end , mobile e front.
* 3.0.0
    * Desenvolvimento back-end , mobile e front.
    * Documentação
* 4.0.0 
    * Finalização projeto.
    * Arquitetura ATM.
    * Documentação final.
    
</div>

