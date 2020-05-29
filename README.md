The 'myapp' that I have submitted is what I have worked on to create a dynamic web application called
"Recipe Bank" where users can register to login and add, delete, update, view and search recipes. They can only have access to these features if they are logged in, and loose access when they're logged out.
My "Recipe Bank" dynamic web application includes the following features:

Register a user
Login a user
List all recipes with the name of the user who created it
Add a recipe (only available to logged in users)
Delete a recipe (only available to logged in users)
Update a recipe (only available to logged in users)
Search for a keyword in recipe bank and list all recipes including the search keyword Logout a user

The back-end of the web application is Mongodb, where I have my own model, my own operationsand the
ability to access those operations through the web and (to some extent) through an api.
Detailed features of my app:

It is a Node.js app :- yes
There is a home page with links to all other pages :- This is in views/index.html
There is a register page :- This is in views/register.html also routes/main.js (lines 44-46; registered are lines 81-110)
There is user authentication page (i.e logins) :- codes are both in views/login.html and routes/main.js (on lines 184-186; 189-218)
There is an add recipe page (available only to logged in users) for each recipe stored three items:
author name, name of the recipe, instructions of the recipe :- codes are both in views/addrecipe.html and routes/main.js (on lines 63-65; 112-126)
There is an update recipe page (available only to logged in users) :- codes are both in views/updaterecipe.html and routes/main.js (on lines 71-73; 146-160)
There is a delete recipe page (available only to logged in users) :- codes are both in views/deleterecipe.html and routes/main.js (on lines 67-69; 130-142)
There is a list page, listing all recipes and the name of the user who added the recipe :- codes are both in views/list.ejs and routes/main.js (on lines 48-61)
The forms have some validations (e.g on the app.post /registered - where it says check email) :- i.e.registered on lines 81-110; recipe added on lines 112-126; recipe deleted on lines 130-142;
recipe updated on lines 146-160; recipe edited on lines 165-180; logged in on lines 189-218; logout on lines 300-307 - all the code lines here are in routes/main.js.
There are also files regarding these as html's in views.
There are useful feedback messages to the user (via res.send - once submitting forms) :- codes are both in views/list.ejs and routes/main.js (on lines 48-61)
The forms have some validations (e.g on the app.post /registered - where it says check email) :- i.e.registered on lines 81-110; recipe added on lines 112-126; recipe deleted on lines 130-142;
recipe updated on lines 146-160; recipe edited on lines 165-180; logged in on lines 189-218 - all the code lines here are in routes/main.js where they are connected to the html files in views.
It has a database backend that implements CRUD operations (the database is Mongodb) :- This is in routes/index.js also lines 260-273 in routes/main.js
The create & update operations take input data from forms(available only to logged in users) :- the following code lines are all in routes/main.js: registered(lines 89-103); recipeadded(lines 116-123);
recipeupdated(lines 152-158); recipeedited(lines 169-177).
The login process uses sessions :- codes are both in views/login.html and routes/main.js (on lines 184-218).
Passwords are stored as hashed :- codes are in routes/main.js (lines 197-215).
There is a way to logout :- codes are both in views/index.html (line 28) and routes/main.js (on lines 300-307).
There is a basic api i.e. recipes content can be accessed as json via http method, it is clear how to access the api (included in code comments in main.js) :-
There are links on all pages to home page providing easy navigation for users :- codes are follows: views/addrecipe.html on line 18; views/deleterecipe.html on line 16; views/editrecipe.html on line 16;
views/list.ejs on line 15; views/login.html on line 19; views/register.html on line 20; views/updaterecipe.html on line 20; views/weatherform.html on line 19.

I would also like to note that this dynamic web application automatically stores a user's id so the user
does not need to enter their name on the addrecipe page.
The following is the breakdown of all entities - my data model in detail (inclusing the name of the database, collection names, fields in collection):
users
{
_id: ,
empDocID: "ObjectId1",
username: "",
password: "hashed",
email: "email@email.com"
}

recipes
{
_id: ,
empDocID: "ObjectId2",
user: "",
name: "recipe.name"
content: "recipe.content",
author: "recipe.author",
}
