A Single Page Application (SPA) built with Angular (front-end) and MongoDB (back-end)

Instructions to run the application using VS Code



Backend: MongoDB Open a terminal (VS Code): cd rest-api npm run start (Launch backend at http://localhost:3000)


Frontend: Angular SPA (game guide forum) In a second terminal: cd game-guides-forum npm install (Install dependencies) ng serve (Launch front end at http://localhost:4200)



Folder Structure

/src 

/app 

/core - services,guards,interceptors

/features - auth (login, register), private (create-guide, profile), public(catalog,catalog-item,character-board,guide-content,home,lore)

/models - post, user, theme, index.ts 

/shared - components (footer, header, not-found), pipes



Users created:

eternity@mail.com / Shogun

yae@mail.com / FoxyLady



Registration triggers immediate login, withCredentials: true

Authentication guard checks for logged users and redirect to /login if they are not logged

http error interceptor catch errors from API ( implemented only on login)


CRUD operations for posts from logged users

CRU operations for Theme (rest-api doesn't provide delete for themes)

restrictions for crud operations only for owners and logged users

subscription and unsubscribe for other user/s guides
profile page shows guides created by the user and personal information that can be edited


The Code is for Educational purpose

(please dont suspend my account again)
