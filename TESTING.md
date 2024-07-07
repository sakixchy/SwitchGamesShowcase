
### Backend API Testing

| Operation          | Endpoint                     | Method | Description                                   | Expected Result                            |
|--------------------|------------------------------|--------|-----------------------------------------------|--------------------------------------------|
| Retrieve Reviews   | `/api/reviews`               | GET    | Fetches all reviews from the database.        | Array of reviews with status 200.          |
| Create Review      | `/api/reviews`               | POST   | Creates a new review entry.                   | Review created successfully (status 201).   |
| Delete Review      | `/api/reviews/{id}`          | DELETE | Deletes a specific review by ID.              | Review deleted successfully (status 204).   |
| Retrieve Games     | `/api/games`                 | GET    | Fetches all games from the database.          | Array of games with status 200.            |
| Update Game        | `/api/games/{id}`            | PUT    | Updates details of a specific game.           | Game updated successfully (status 200).     |
| Delete Game        | `/api/games/{id}`            | DELETE | Deletes a specific game by ID.                | Game deleted successfully (status 204).     |
| Like Game          | `/api/games/{id}/like`       | POST   | Allows user to like a game.                   | Game liked successfully (status 200).       |
| Comment on Game    | `/api/games/{id}/comments`   | POST   | Allows user to comment on a game.             | Comment added successfully (status 201).    |
| Follow User        | `/api/follower/{id}/`     | POST   | Allows user to follow another user.           | User followed successfully (status 200).    |
| Unfollow User      | `/api/follower/{id}/`   | DELETE   | Allows user to unfollow another user.         | User unfollowed successfully (status 200).  |


### Frontend UI/UX Testing
#### Navigation  
The Navigation Bar is responsive and switches to chevron down icon menu icon on smaller screen sizes.                                                                                           
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Brand Link</th>
<th>The Navbar Brand features a logo which can navigate users to home page</th>
<th>Clicking the "Nintendo" Brand redirects me to Home Page</th>
<th>Pass</th>
</tr>
<tr>
<th>Home Link</th>
<th>The Home link in the navigation bar directs users to the Home page.</td>
<th>Clicking the "Home" link navigates me to the Home Page.</th>
<th>Pass</th>
</tr>
<tr>
<th>Games Link</th>
<th>The Games link in the navigation bar directs users to the Games page.</td>
<th>Clicking the "Games" link navigates me to the Games Page, displaying game listing form.</th>
<th>Pass</th>
</tr>
<tr>
<th>Reviews Link</th>
<th>The Reviews link in the navigation bar directs users to the Reviews page.</th>
<th>Clicking the "Reviews" link navigates me to the Reviews Page, displaying user reviews for various games.</th>
<th>Pass</th>
</tr>
<tr>
<th>Sign In Link</th>
<th>The Sign In link in the navigation bar directs users to the Sign In page.</th>
<th>Clicking the "Sign In" link navigates me to the Sign In Page, allowing users to log into their accounts.</th>
<th>Pass</th>
</tr>
<tr>
<th>Sign Up Link</th>
<th>The Sign Up link in the navigation bar directs users to the Sign Up page.</th>
<th>Clicking the "Sign Up" link navigates me to the Sign Up Page, allowing new users to create an account.</th>
<th>Pass</th>
</tr>
<tr>
<th>Sign Out Link</th>
<th>The Sign Out link in the navigation bar allows logged-in users to sign out of their account.</th>
<th>Clicking the "Sign Out" link logs me out of my account and redirects me to the Home Page.</th>
<td>Pass</td>
</tr>
<tr>
<th>Profile Link</th>
<th>The Profile link in the navigation bar directs users to their profile page.</th>
<th>Clicking the "Profile" link navigates me to my Profile Page, displaying my user details and games.</th>
<th>Pass</th>
</tr>
</table>

#### Search Bar
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
<tr>
<tr>
<th>Search Bar</th>
<th>The search bar allows users to search for a game by typing in the title or descprption</th>
<th>Typing a game title or description in the search bar and updates results and display a list of relevant game results.</th>
<th>Pass</th>
<tr>
</table>

#### CRUD
The testing is applicable only for authenticated users.

Create
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Create Review</th>
<th>Allows users to write and submit a review for a game.</th>
<th>The review form should validate that all required fields (game selection, title, content, rating) are filled. Upon submission, the new review should be visible in the reviews list and associated with the user who created it.</th>
<th>Pass</th>
</tr>
<tr>
<th>Create Game</th>
<th>Enables users to add a new game to the database.</th>
<th>The game creation form should ensure that all necessary details (title, description, cover-image, genre) are completed. The new game should be added to the home page and accessible to other users</th>
<th>Pass</th>
</tr>
<tr>
<th>Post Comment</th>
<th>Allows users to comment on a game.</th>
<th>Users should be able to enter a comment in the comment box and submit it. The comment should then appear below the corresponding game, along with the user's name, avatar and timestamp.</th>
<th>Pass</th>
</tr>
<tr>
<th>Give Like</th>
<th>Allows users to like a game.</th>
<th>Clicking the like button should increment the like count and indicate the user's like visually. The like count should persist across sessions.</th>
<th>Pass</th>
</tr>
<tr>
<th>Follow</th>
<th>Allows users to follow another user.</th>
<th>Clicking "Follow" button increments following and follower in profile</th>
<th>Pass</th>
</tr>
</table>

### Read
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>View Reviews</th>
<th>Allows users to view a list of all reviews available on the platform.</th>
<th>The user should be able to see a list of reviews with the review title,content, owner name. The list should be paginated if there are many reviews.</th>
<th>Pass</th>
</tr>
<tr>
<th>View Games</th>
<th>Allows users to view a list of all games available on the platform.</th>
<th>The user should be able to see a list of games with the game title, description, cover-image, genre and the list date. The list should be paginated if there are many games and load games indefinetely until the games have all loaded.</th>
<th>Pass</th>
</tr>
<tr>
<th>View Comments</th>
<th>Allows users to view comments on a specific game.</th>
<th>The user should be able to see a list of comments under the specific game, including the comment text, avatar, owner name, and timestamp.</th>
<th>Pass</th>
</tr>
<tr>
<th>View Likes</th>
<th>Allows users to see the total number of likes on a game.</th>
<th>The user should be able to see the number of likes a game has received, displayed clearly on the game page.</th>
<th>Pass</th>
</tr>
</table>

### Update
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Update Game</th>
<th>Allows authorized users to update details of a game.</th>
<th>The user should see an "Edit" button on the game. Clicking it should display an editable form with the current game details. The user can change the game details and save them. The game should be updated, and the changes should be reflected in the game detail view.</th>
<th>Pass</th>
</tr>
<tr>
<th>Edit Comment</th>
<th>Allows users to edit their comments on a game or review.</th>
<th>The user should see an "Edit" button next to their comment. Clicking it should allow them to change the comment text and save it. The updated comment should be visible immediately.</th>
<th>Pass</th>
</tr>
<tr>
<th>Edit Profile</th>
<th>Allows users to edit their profile information, such as username, password, bio, and avatar.</th>
<th>The user should see an "Edit Profile" button on their profile page. Clicking it should display an editable form with the current profile details. The user can change their profile information and save it. The changes should be reflected on their profile page.</th>
<th>Pass</th>
</tr>
</table>

### Delete
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Delete Game</th>
<th>Allows authorized users to delete a game entry.</th>
<th>User should see a "Delete" button on the game detail page. Clicking it will remove the game from the database and no longer visible on the site.</th>
<th>Pass</th>
</tr>
<tr>
<th>Delete Review</th>
<th>Allows autherized users to delete an existing review they have created.</th>
<th>User should see a "Delete" button on their review. Clicking it will remove from the database and no longer visible on the site.</th>
<th>Pass</th>
</tr>
<tr>
<th>Delete Comment</th>
<th>Allows users to delete a comment they have posted on a game.</th>
<th>User should see a "Delete" button next to their comment. Clicking it will remove the comment from the database and no longer visible on the site.</th>
<th>Pass</th>
</tr>
<tr>
<th>Unlike Game</th>
<th>Allows users to unlike a game they have previously liked.</th>
<th>Users can click the like button that has a cue of being liked. Clicking it should remove the like from the database and decrement the like count, reflecting the change immediately.</th>
<th>Pass</th>
</tr>
<tr>
<th>Unfollow Profile</th>
<th>Allows users to unfollow a profile they are currently following.</th>
<th>User should see an "Unfollow" button. Clicking it should update the database to reflect that the user is no longer following the specified user, and the following count should be decremented accordingly.</th>
<th>Pass</th>
</tr>
</table>

### Commenting
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Commenting on Games</th>
<th>Users can post comments on games.</th>
<th>After entering a comment in the comment field, the placeholder text disappears.</th>
<th>Pass</th>
</tr>
<tr>
<th>Placeholder Text</th>
<th>The comment field has placeholder text indicating where users should enter their comments.</th>
<th>When the comment field is empty, the placeholder text is displayed.</th>
<th>Pass</th>
</tr>
<tr>
<th>Comment Submit Button</th>
<th>Users can click the "Submit Comment" button to submit their comment.</th>
<th>Clicking the "Submit Comment" button submits the comment, displaying comment below the form.</th>
<th>Pass</th>
</tr>
</table>

### Liking Games
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Liking/Unliking Games</th>
<th>Users can like or unlike games by clicking the heart shaped button.</th>
<th>Clicking the heart button updates the button to reflect the user's choice.</th>
<th>Pass</th>
</tr>
</table>

### Sign In
<table border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Username Field</th>
<th>Users can enter their desired username.</th>
<th>The username field accepts input from the user.</th>
<th>Pass</th>
</tr>
<tr>
<th>Password Field</th>
<th>Users can enter their desired password.</th>
<th>The password field accepts input from the user.</th>
<th>Pass</th>
</tr>
<tr>
<th>Username Placeholder</th>
<th>The username field displays a placeholder text to indicate where users should enter their username.</th>
<th>The placeholder text is visible in the username field until the user starts typing their username.</th>
<th>Pass</th>
</tr>
<tr>
<th>Password Placeholder</th>
<th>The password field displays a placeholder text to indicate where users should enter their password.</th>
<th>The placeholder text is visible in the password field until the user starts typing their password.</th>
<th>Pass</th>
</tr>
<tr>
<th>Sign In Form</th>
<th>Registered users can log in with their username and password.</th>
<th>Users are unable to login if the fields are empty or not field entirely upon pressing log in.</th>
<th>Pass</th>
</tr>
</table>

### Sign Up
<table  border="1" cellspacing="0" cellpadding="5">
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Sign-Up Form</th>
<th>Users can fill out the sign-up form with their username, password, and confirmation password.</th>
<th>Users are able to enter their desired username and password, along with confirming their password.</th>
<th>Pass</th>
</tr>
<tr>
<th>Password Requirements</th>
<th>Passwords must meet specified criteria, including being at least 8 characters long and not entirely numeric.</th>
<th>Users receive prompts if their password is too short, too similar to personal information, entirely numeric.</th>
<th>Pass</th>
</tr>
<tr>
<th>Sign-Up Button</th>
<th>Users can click the "Sign Up" button to submit their sign-up information.</th>
<th>Clicking the "Sign Up" button submits the sign-up form with the provided information for account creation.</th>
<th>Pass</th>
</tr>
</table>

### Sign Out
<table>
<tr>
<th>Feature</th>
<th>Description</th>
<th>Expected Outcome</th>
<th>Pass/Fail</th>
</tr>
<tr>
<th>Sign Out Link</th>
<th>Users can click the "Logout" link to log out of their account.</th>
<th>Clicking the "Logout" link triggers the logout process, ending the user session.</th>
<th>Pass/Fail</th>
</tr>
</table>