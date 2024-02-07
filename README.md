# TickTuk FullStack Test

Hello,
Welcome to Tictuk's FS implementation task.
Please read the instructions, and do the BONUS after all rest of requirements were fulfilled.
 
You need to build Users Management high availability platform.
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

## Users Management Service
- Service which exposes 3 endpoints:
	- Add new user
	- Delete User
	- Fetch All
	
- High Availability Requirements
	- need to deploy at least 2 instances
	- every time calling add/remove user request, all instances need to return the last state.
	- this rotate can be managed randomly from the client.
	- **BONUS**: create a router that routes between the instances.
	- **BONUS**: use docker engine to run the service
