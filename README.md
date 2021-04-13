# **ClinicTime TecAPI Back**

API desenvolvida em TypeScript com o proposito de gerenciar registros de horários de uma clinica!

## Instalação das dependências:

```
npm install
```

## Execução:

### Executar em modo desenvolvimento:
```
npm run start:dev
```

Este comando irá executar o projeto usando o nodemon e o ts-node.

### Executar os teste:
```
npm run test
```

Este comando irá rodar os testes unitários do projeto, feitos com jest e supertest.

### Executar: 
```
npm run start
```

Esse comando irá rodar o build e executar o projeto.

## Request:

### Listar todos os registros:

#### Exemplo de requisição:
``` 
GET localhost:3000
```

#### Exemplo de resposta:
```
[
    {
        "id": 1,
        "start": "08:00",
        "end": "08:30",
        "everyday": true
    },
    {
        "id": 2,
        "start": "13:00",
        "end": "13:30",
        "weekday": 5
    },
    {
        "id": 3,
        "date": "01-02-2021",
        "start": "09:30",
        "end": "10:00"
    },
]
```

### Lista Registro passando um intervalo especifico de datas:
#### Exemplo de requisição:
``` 
GET localhost:3000?startdate=03-02-2021&enddate=06-02-2021
```
- ``startdate``: A data de inicio do intervalo que se deseja filtrar.
- ``enddate``: A data final do intervalo que se deseja filtrar.

**OBS**: As datas devem seguir o padrão 'DD-MM-YYYY', sem as aspas.

Exemplo de resposta:
```
[
  {
      "date": "03-02-2021",
      "intervals": [{"start": "08:00","end": "08:30"},{"start": "14:30","end": "15:00"},{"start": "10:30","end": "11:00"}]
  },
  {
      "date": "04-02-2021",
      "intervals": [{"start": "08:00","end": "08:30"}]
  },
  {
      "date": "05-02-2021",
      "intervals": [{"start": "08:00","end": "08:30"},{"start": "13:00","end": "13:30"},{"start": "15:30","end": "16:00"}]
  }
]
```
### Inserir um registro:
#### Exemplo de requisição:
``` 
POST localhost:3000
```

#### Valores que devem ser passados da requisição:

 - ``date`` (String): Data que será registrada o horário, deve-se seguir o padrão 'DD-MM-YYY.
 - ``start `` (String):  Horario de inicio do atendimento, deve-se sequir o padrão 'HH:mm'.
 - ``end`` (String): Horario do fim do atendimento, deve-se sequir o padrão 'HH:mm'
 - ``everyday`` (Boolean): Se true indicará que havera atendimento todos os dias nós horarios informados.
 - ``weekday`` (Number): Usada para indicar um dia da semana que terá atendimento semanalmente, ou seja todas as semanas no dia indicado terá atendimento nos horários informados. ( **OBS**: Os dias são informados entre os valores 0 e 6, sendo 0 domingo e 6 sábado. (Finais de semanas não serão listados!))

 #### **OBS**: Deve-se ser usado apenas um entre ``date``, ``everyday``, ``weekday``, já ``start`` e ``end`` são obrigatórias em todas as requisições.

#### Exemplo do body (com date):
```
{
    "date": "12-02-2021",
    "start": "17:00",
    "end": "17:30"
}
```
#### Exemplo do body (com everyday):
```
{
    "everyday": true,
    "start": "15:00",
    "end": "15:30"
}
```
#### Exemplo do body (com weekday):
```
{
    "weekday": 4,
    "start": "10:00",
    "end": "10:30"
}
```


 Exemplo de resposta(com date):
 ``` 
{
    "id": 1,
    "date": "12-02-2021",
    "start": "17:00",
    "end": "17:30"
}
```
 Exemplo de resposta(com everyday):
 ``` 
{
    "id": 2,
    "everyday": true,
    "start": "15:00",
    "end": "15:30"
}
```
 Exemplo de resposta(com weekday):
 ``` 
{
    "id": 3,
    "weekday": 4,
    "start": "10:00",
    "end": "10:30"
}
```

### Deletando um registro:
Deve-se ser passado o ``id`` como paramentro.
#### Exemplo de requisição:
``` 
DEL localhost:3000/15
```
A respostar deve ser status `200`.

#### **OBS**: Segue dentro do repositorio o arquivo ``ClinicTime-TecAPI-Back.postman_collection.json``, que é um collection do postman, com exemplos das requisições.
