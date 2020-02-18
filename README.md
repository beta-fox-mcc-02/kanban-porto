# kanban-porto
This repo for your kanban client


**REGISTRATION**
----
  This routes will send and create the data into User Data. Output is object.

* **URL**

  /

* **Method:**
  
  `POST`
  
*  **URL Params**

   none 

   **Required:**
 
   none

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJAYWlsLmNvbSIsImlhdCI6MTU4MTY5ODA3OH0.a688sV9YvVGYO4eG47nqLlv208KU5KVx3UIrmFKxMqU"
}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
    "status": 500,
    "error": "Internal Server Error"
}`




**LOGIN USER**
----
  This routes will fetch data of user if the data exists. The output is object.

* **URL**

  `/login`

* **Method:**
  
    `POST` 
  
*  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   ``email=[string], password=[string]``


* **Data Params**

  `NONE`

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJAYWlsLmNvbSIsImlhdCI6MTU4MTY5ODA3OH0.a688sV9YvVGYO4eG47nqLlv208KU5KVx3UIrmFKxMqU"
}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{
    "status": 500,
    "error": "Internal Server Error"
}`



**REGISTRATION USER**
----
  This routes will create data of user if the data exists. The output is object.

* **URL**

  `/registration`

* **Method:**
  
    `POST` 
  
*  **URL Params**

   **Required:**
 
   ```{
	"first_name" : "tamara",
	"last_name" : "zulaika",
	"necessary" : "family",
	"email" : "mar@ail.com",
	"password" : "123456"
}`


* **Data Params**

  `NONE`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:**
    ```{
    "msg": "Data registered!"
}`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```{
    "status": 400,
    "error": "email must be unique"}`

  * **Code:** 500 <br />
    **Content:** 
    ```{
    "status": 500,
    "error": "Internal Server Error"
}`


**LIST ALL TASK**
----
  This routes will fetch all tasks with UserId as User Id login. The Output will be array of object.

* **URL**

  `/tasks`

* **Method:**
  
    `GET` 
  
*  **URL Params**

   **Required:**
 
    `NONE`

* **Data Params**

  `NONE`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```{
    "data": [
        {
            "id": 22,
            "title": "KOK GA ADA TITLENYA:)",
            "description": "Hacktiv8 Beta",
            "CategoryId": 2,
            "UserId": 1,
            "createdAt": "2020-02-14T01:56:21.556Z",
            "updatedAt": "2020-02-14T04:32:29.166Z",
            "User": {
                "id": 1,
                "first_name": "tamara",
                "last_name": "zulaika",
                "necessary": "family",
                "email": "mar@ail.com",
                "password": "$2a$10$Idn1fsAqpaAGcRjirg0mNu4CrpiARQzCaJ7evJPH5iW1Z9emY8VeS",
                "createdAt": "2020-02-12T14:24:45.975Z",
                "updatedAt": "2020-02-12T14:24:45.975Z"
            },
            "Category": {
                "id": 2,
                "status": "TODO",
                "createdAt": "2020-02-12T12:58:40.932Z",
                "updatedAt": "2020-02-12T12:58:40.932Z"
            }
        },
        {
            "id": 11,
            "title": "halal bi halal",
            "description": "lebaran bersama keluarga besar",
            "CategoryId": 2,
            "UserId": 1,
            "createdAt": "2020-02-13T13:19:23.528Z",
            "updatedAt": "2020-02-14T04:31:15.105Z",
            "User": {
                "id": 1,
                "first_name": "tamara",
                "last_name": "zulaika",
                "necessary": "family",
                "email": "mar@ail.com",
                "password": "$2a$10$Idn1fsAqpaAGcRjirg0mNu4CrpiARQzCaJ7evJPH5iW1Z9emY8VeS",
                "createdAt": "2020-02-12T14:24:45.975Z",
                "updatedAt": "2020-02-12T14:24:45.975Z"
            },
            "Category": {
                "id": 2,
                "status": "TODO",
                "createdAt": "2020-02-12T12:58:40.932Z",
                "updatedAt": "2020-02-12T12:58:40.932Z"
            }
        },
        {
            "id": 10,
            "title": "halal bi halal",
            "description": "lebaran bersama keluarga besar",
            "CategoryId": 3,
            "UserId": 1,
            "createdAt": "2020-02-13T13:19:22.984Z",
            "updatedAt": "2020-02-14T04:26:25.805Z",
            "User": {
                "id": 1,
                "first_name": "tamara",
                "last_name": "zulaika",
                "necessary": "family",
                "email": "mar@ail.com",
                "password": "$2a$10$Idn1fsAqpaAGcRjirg0mNu4CrpiARQzCaJ7evJPH5iW1Z9emY8VeS",
                "createdAt": "2020-02-12T14:24:45.975Z",
                "updatedAt": "2020-02-12T14:24:45.975Z"
            },
            "Category": {
                "id": 3,
                "status": "DOING",
                "createdAt": "2020-02-12T12:58:40.932Z",
                "updatedAt": "2020-02-12T12:58:40.932Z"
            }
        },
        {
            "id": 1,
            "title": "makan",
            "description": "makan makan makan",
            "CategoryId": 4,
            "UserId": 1,
            "createdAt": "2020-02-12T13:00:37.804Z",
            "updatedAt": "2020-02-14T04:26:29.324Z",
            "User": {
                "id": 1,
                "first_name": "tamara",
                "last_name": "zulaika",
                "necessary": "family",
                "email": "mar@ail.com",
                "password": "$2a$10$Idn1fsAqpaAGcRjirg0mNu4CrpiARQzCaJ7evJPH5iW1Z9emY8VeS",
                "createdAt": "2020-02-12T14:24:45.975Z",
                "updatedAt": "2020-02-12T14:24:45.975Z"
            },
            "Category": {
                "id": 4,
                "status": "DONE",
                "createdAt": "2020-02-12T12:58:40.932Z",
                "updatedAt": "2020-02-12T12:58:40.932Z"
            }
        }
    ],
    "msg": "success read all"
}```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```{
    "status": 400,
    "error": "email must be unique"}``

  * **Code:** 500 <br />
    **Content:** 
    ```{
    "status": 500,
    "error": "Internal Server Error"
}`


**FIND ONE**
----
  This routes will fetch task with UserId as params data. The Output will be object.

* **URL**

  `/tasks/:id`

* **Method:**
  
    `GET` 
  
*  **URL Params**

   **Required:**
 
    `id=[INTEGER]`

* **Data Params**

  `NONE`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ``````
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```{
    "status": 400,
    "error": "email must be unique"}``

  * **Code:** 500 <br />
    **Content:** 
    ```{
    "status": 500,
    "error": "Internal Server Error"
}`
