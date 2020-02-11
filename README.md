# kanban-porto


**Title**
----
  create user

* **URL**

`/users/register` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`email, passwords` 

* **Success Response:**

  + **Code:** 201 <br />

    **Content:** `{ 
      "id": ...,
       "email": "...",
      "password": "...",
       "updatedAt": "...",
       "createdAt": "..."
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 400 <br />

    **Content:** `{ errors : [....] }` 

**Title**
----
  login user

* **URL**

`/users/login` 

* **Method:**

`POST` 
  

*  **URL Params**

   **Required:**
 
`None` 

   **Optional:**
 
`None` 

* **Data Params**

`email, passwords` 

* **Success Response:**

  + **Code:** 200 <br />

    **Content:** `{ 
      "token": "...",
    "msg": "login successfully"
     }`

 

* **Error Response:**

  + **Code:** 500 <br />

    **Content:** `{ msg : err.message }` 

  OR

  + **Code:** 404 <br />

    **Content:** `{ "msg": "email / password is wrong" }` 

 OR

  + **Code:** 400 <br />

    **Content:** `{ "msg": "there's no token in your headers" }` 

OR

+ **Code:** 401 <br />

    **Content:** `{ "msg": "invalid token" }` 
