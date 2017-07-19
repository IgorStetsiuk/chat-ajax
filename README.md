## Usage
 1. npm install
 2. node server.js
 3. in console window run `mongod` 
 3. open in browser localhost:3012
 
## API description


### 5 methods (CRUD) for User entity

#### 1. Create
**POST /api/users HTTP 1.1** -  create new user in database, add to *users* collection


`body`    
 ```json
 {
        "name": "Jhon Doe",
        "email": "jhon_doe@gmail.com",
        "user_id": 1
 }
```   
response: created user object
 
 ___
 
#### 2. Read 
**GET /api/users HTTP 1.1** - show all users in database

response :
  ```json
 {      "_id": "596a1c36a7ee3615d0f43e7e",
        "name": "Jhon Doe",
        "email": "jhon_doe@gmail.com",
        "user_id": 1
 }
 ...
```

**GET /api/users/{user_id} HTTP 1.1** - show  user by specified id 

response : 
  ```json
 { 
    "_id": "596a1c36a7ee3615d0f43e7e",
    "name": "Jhon Doe",
    "email": "jhon_doe@gmail.com",
    "user_id": 1
 }
```
>note: I use `user_id` , because mongodb generates own _id 

___

#### 3. Update 
**PUT /api/users/{user_id}** HTTP 1.1 - update user by id 

body 
```json
{
   "name": "Jhon Doe update",
   "email": "jhone@gmail.com",
   "user_id": 1
}
```
response : send status 200 (OK) 

___

#### Delete 
**DELETE /api/users/{user_id}** HTTP 1.1 - remove user by id from users collection

respone: send status 200 (OK)

___

 ### 5 methods (CRUD) for Message entity and 1 additional rout
 
 #### 1. Create 
 **POST api/messages** HTTP 1.1 - create new message entity in *messages* collection
 
 body:
 ```json
{
"receiverId":2,
"senderId":4,
"text":"Nice day, isn`t it?",
"message_id":3
}
```

response : created message entity
 
 ___
 
 #### 2. Read 
 **GET /api/messages HTTP 1.1** - show all messages from  collection *messages*
 
 response :
   ```json
{
    "receiverId":2,
    "senderId":1,
    "text":"Hey,What are you doing now?",
    "message_id":1
}
  ...
  ```
  
  ___

**GET /api/messages/{message_id} HTTP 1.1** - show specified message entity by message_id, from collection

response :
```json

{
  "receiverId":1,
  "senderId":2,
  "text":"Hello,I`m doing my homework",
  "message_id":2
}
```
#### 3. Update
**PUT /api/messages/{message_id}**  HTTP 1.1  - update message entity 

body 
```json
{
"receiverId":1,
"senderId":2,
"text":"Hello,I`m doing my task",
"message_id":2
}
```
response : send status 200 (OK)

___

#### 4. Delete 
**DELETE /api/messages/{message_id}**  HTTP 1.1 - remove message entity by specified id from collection *messages*

response : send status 200 (OK)

___

#### Additional rout
**GET /api/messages/private/{senderId} HTTP 1.1** - route, which returns all users with whom the user with specified id has spoken.

response : status 200 (OK)

for example `senderId = 2`

```json
[
 {
     "_id": "596a20ffa7ee3615d0f43e89",
     "receiverId": 1
  },
  {
    "_id": "596a211ca7ee3615d0f43e8b",
    "receiverId": 4
  }
]
```

>note :  mongodb generates own _id for it disappeared we can write in query projection {_id:false} 