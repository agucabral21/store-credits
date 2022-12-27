# store-credits
Microservice Oriented to Manage Client Credits in a set Of Stores

## Endpoints

| VERB | URL |Params| Body | Description |
|--|--|--|--|--|
| GET | /credits?client=X&store=X | client=clientMail store=storeName | none|You can use the query params as you desire, if you send none it will return all credits, if you use some of them they will filter using corresponding data|
| POST | /credits | None | {<br>"amount":5,<br>"clientMail":"example@mail.com",<br>"storeName":"A"<br> }|It will create client and store if they do not exist and it will create or update their credits.|
| GET | /status | None |None|Microservice Status Check|



## Batch Process
In /process you can find a nodeload_csv.js that will run an execution of batch load to de database from a csv.

The format of the csv is the next one:

    mail,store,amount
    zzw8@jnf.ewm,C,100
    ba8n@vuk.zp,D,600
    boe3@oln.jgo,O,-600
    zzw8@jnf.ewm,C,500

There can be many rows with the same Client/Store pair.

The process will use .env.batch properties to connect to the desired database.

To execute the project you need to run

    #in case you havent installed the app yet
    npm i 
    node process/load_csv.js {globalPath}/file.csv

This will run a transaction inserting all correspoing rows in de database, creating when its necessary Clients or Stores
