# HealthyLyfe Web App Server
HealthyLyfe is a web application to find your diet's recipe with nutritional value included. You would receive some random quotes to begin your day. This Web App has:

    1. RESTful endpoint for todo list's CRD operation
    2. JSON formatted response

# URL

    http://localhost:3000

# Method

 ## - POST/register

### *Request Header*

```Not Needed```

### *Request Body*

```javascript
{
    "name": "<your name>",
    "email": "<your email>",
    "password": "<your password>"
}
```

### *Success Response*
```javascript
Code: 201 Created
Content:
{
    "id": "<your id>",
    "name": "<your name>",
    "email": "<your email>"
}
```

### *Error Response*

```javascript
Code: 400 Bad Request
Content:
{
    "message":  "<error messages>" ,
    
}
```

 ## - POST/login

### *Request Header*

```Not Needed```

### *Request Body*

```javascript
{
    "email": "<your email>",
    "password": "<your password>"
}
```

### *Success Response*
```javascript
Code: 201 Created
Content:
{
    "access_token": "<your access_token>"
}
```

### *Error Response*

```javascript
Code: 401 Unauthorized
Content:
{
    "message":  "<Invalid Email/Password>" ,
    
}
```

 ## - POST/recipes

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Body*

```javascript
{
    "foodName": "<response foodName>",
    "recipes": "<response recipes>",
    "url": "<response url>"
}
```

### *Success Response*
```javascript
Code: 201 Created
Content:
{
    "foodName": "<response foodName>",
    "recipes": "<response recipes>",
    "url": "<response url>"
}
```

### *Error Response*

```javascript
Code: 400 Bad Request
Content:
{
    "message":  "<error messages>" ,
    
}
```
OR
```javascript
Code: 500 Internal Server Error
Content:
{
    "errorMessages":  "<Internal Server Error>" ,
    
}
```

 ## - GET/recipes

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Body*

```
Not Needed
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "id": "<user id>",
    "foodName": "<response foodName>",
    "recipes": "<response recipes>",
    "url": "<response url>",
    "createdAt": "<response createdAt>",
    "updatedAt": "<response updatedAt>",
    "UserId": "<user UserId>"
}
```

 ## - GET/recipes/search

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Body*

``` javascript
{
    "recipe": "<find recipe>"
}
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "title": "<response title>",
    "sourceUrl": "<response sourceUrl>",
    "image": "<response image>"
}, ....
```

### *Error Response*

```javascript
Code: 500 Internal Server Error
Content:
{
    "message":  "<Internal Server Error>" ,
    
}
```

 ## - GET/recipes/random

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Body*

```
Not Needed
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "title": "<response title>",
    "sourceUrl": "<response sourceUrl>",
    "image": "<response image>"
}, ....
```

### *Error Response*

```javascript
Code: 500 Internal Server Error
Content:
{
    "message":  "<Internal Server Error>" ,
    
}
```

  ## - GET/recipes/:recipeId

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Params*

```javascript
{
    "recipeId": "<your recipeId>"
}
```

### *Request Body*

```
Not Needed
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "title": "<response title>",
    "sourceUrl": "<response sourceUrl>",
    "image": "<response image>"
}
```

### *Error Response*

```javascript
Code: 404
Content:
{
    "message":  "<Errors Not Found>" ,
    
}
```
OR

```javascript
Code: 500 Internal Server Error
Content:
{
    "message":  "<Internal Server Error>" ,
    
}
```

 ## - DELETE/recipes/:recipeId

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Params*

```javascript
{
    "recipeId": "<your recipeId>"
}
```

### *Request Body*

```
Not Needed
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
   "message": "<recipe by id <recipeId> has been deleted"
}
```

### *Error Response*

```javascript
Code: 404 Not Found
Content:
{
    "errorMessages": "<Errors Not Found>" ,
    
}
```
OR
```javascript
Code: 500 Internal Server Error
Content:
{
    "errorMessages":  "<Internal Server Error>" ,
    
}
```