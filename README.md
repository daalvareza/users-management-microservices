# TickTuk FullStack Test

Hello,
Welcome to Tictuk's FS implementation task.
Please read the instructions, and do the BONUS after all rest of requirements were fulfilled.
 
You need to build Users Management platform.
The platform contains the followings:

## React Client SPA
Contains the followings:

- Insert new Users:
	- first name
	- last name
	- gender
	- email
	- short description - up to 200 characters
	- **BONUS**: in Dialog

- All users lists in rows sorted by last name, row details:
	- full name (started with last name)
	- email
	- gender
	- more details - static text on hover presents tooltip with description
	- delete - remove user from list.
	- **BONUS** - adding pagination of 3 cards per page.
- Every time user adding/removing users the list is been updated.

## Users Management Service - Use Typescript with any framework you like
- Service which exposes 3 endpoints:
	- Add new user
	- Delete User
	- Fetch All
	
- High Availability Requirements (BONUS)
	- need to deploy at least 2 instances
	- every time calling add/remove user request, all instances need to return the last state. (without using persistence storage)
	- use ngnix for load balancing router the routes between the instances.
	- use docker engine to run all services
