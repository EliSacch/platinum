# Platinum

Platinum is an hairdresser website.
It includes both a landing page and a private area for clients, and a staff dashboard to view and manage the appointments.

The website is built in React and relies on a Django REST API.

[Link deployed website](https://platinum.herokuapp.com/)

[Link to API repository](https://github.com/EliSacch/booking-api)


![Responsive Mockup](media/testing/am-i-responsive.png)


## Table of content

- [Design and User Experience](#design-and-user-experience)
  - [User Stories](#user-stories)
  - [Wireframes](#wireframes)
  - [Design](#design)

- [Features](#features)
  - [Home](#home)
  - [Client Pages](#client-pages)
  - [Staff Pages](#staff-pages)

- [Testing](#testing)
  - [Tests](#tests)
  - [Validator Testing](#validator-testing)
  - [Fixed bugs](#fixed-bugs)
  - [Unfixed bugs](#unfixed-bugs)
  - [Performance](#performance)

- [Deployment](#deployment)
  - [Live Website](#live-website)
  - [Local Deployment](#local-deployment)

- [Credits](#credits)
  - [Code](#code)
  - [Content](#content)

- [Technologies used](#technologies-used)

- [Acknowledgements](#acknowledgements)

## Design and User Experience

This web application was designed following the Agile methodology and by defining the users stories and implementing the features needed to meet them.

The development has been tracked using GitHub Projects feature.

[Check this project](https://github.com/users/EliSacch/projects/7)


### User Stories

#### Landing page

- As a first time user I can see see an about section, so that I can learn more about the company.

- As client I can see all offered services in one section, so that I decide if I want to make an appointment.

- As a client I can find the booking section, with relevant information on how to make an appointment.

- As a client I can easily find how to contact the business, if I have some questions or if I want to make an appointment.

- As a user I can have a simple and clear navigation, so that I can easily find the information I need.

- As a client I can see the gallery section, to be more engaged and see some results of previous clients.

#### Personal area

- As a client I can register and create a personal account, so that I can access a personal area.

- As a client I can login and out from my personal area by entering my credential, so that other clients do not have access to my information.

- As a client I can change my password if I want to, so that I can maintain a secure access.

- As a registered client, I can access some extra features from my personal area.

- As a registered user I can review and edit my profile and account information.

- As a registered user I can access my-appointments, so that I can review my past appointments, and I can view and manage upcoming appointments.

#### Staff dashboard

- As a staff member I can access a staff dashboard, so that I can utilize some extra features.

- As a staff member I can see the list of registered clients, and I can add some notes to the client profile, so that I can save important information for future appointments.

- As a staff member I can access all the appointments, so that I can review and manage them on behalf of the clients, and I an make appointments for unregistered users.

- As a staff member I can access all the services/treatments, so that I can review them and keep them up to date.

- As a staff member I have access to the calendar, so that I can review the appointments for specific day, week or month.


### Wireframes

<details>
  <summary>Mobile landing page</summary>

   ![Mobile header](media/wireframes/Mobile%20-%20header.png)
   ![Mobile gallery](media/wireframes/Mobile%20-%20Gallery.png) 
   ![Mobile booking](media/wireframes/Mobile%20-%20Booking.png) 
   ![Mobile header](media/wireframes/Mobile%20-%20Menu.png)

</details>

<details>
  <summary>Mobile dashboards</summary>

   ![Mobile header](media/wireframes/Mobile%20-%20client%20dashboard.png)
   ![Mobile gallery](media/wireframes/Mobile%20-%20client%20dashboard-1.png) 

</details>


<details>
  <summary>Desktop landing page</summary>

   ![Desktop Wireframe](media/wireframes/Desktop%20-%20header.png)
   ![Desktop Wireframe](media/wireframes/Desktop%20-%20About%20Gallery%20Services.png)
   ![Desktop Wireframe](media/wireframes/Desktop%20-%20Booking%20Form.png)

</details>


<details>
  <summary>Desktop dashboard</summary>

   ![Mobile Wireframe](media/wireframes/Desktop%20-%20client%20dashboard.png)
   ![Mobile Wireframe](media/wireframes/Desktop%20-%20staff%20dashboard.png)

</details>


### Design

- Color palette:
  - Neutral colours:

  ![light](media/design/color-palette-light.png)
  ![dark](media/design/color-palette-dark.png)
  - Vibrant colours: 
  
  ![vibrant](media/design/color-palette-colours.png)


- Different color for staff dashboard:

The staff dashboard mantains the same style of the landing page, although it is intentionally darker, so that it is clear straight away to the staff members that they are in this page and they are logged in as staff members.

<details>
  <summary>Check preview</summary>

   ![Mobile Wireframe](media/features/different-color.png)

</details>


- The following fonts, used for the project, are from [Google Fonts](https://fonts.google.com/):

  - Anton
  - Raleway
  - Caramel


## Features 


### Home

- __General Information__

The landing page contains an about section, a gallery and a services section that allows new clients to know more about the company and what it offers.

![Information](media/features/info.png)


- __Booking section__

The booking section changes based on the user authentication status.

- Un-authenticated users see a message informing them about their booking options, and the clicable links to call or email directly.

- Authenticated users can see the booking form and book directly.

<details>
  <summary>Check preview</summary>

   ![Unauthenticate](media/features/book-unauth.png)
   ![Authenticate](media/features/book-auth.png)

</details>

- __Nav bar__

The navigation bar allows users to easily navigate through the website and access what they need.

The navigation bar is different based on the authentication status, and the user role.

- Unauthenticated users can see the sign in and sign up links:

  ![Navbar](media/features/nav.png)

- Authenticated clients can see the sign out button, and a link to their appointments or their profile page:

  ![Client Navbar](media/features/nav-client.png)

- Authenticated staff members can also see a link to the staff dashboard:

  ![Staff Navbar](media/features/nav-staff.png)


### Client pages


- __My appoinments__

Authenticated clients can access the "my appointments" page.

From here they can see a button to make an appointment and the "past" and "upcoming" appointments, in different tabs, so that they can review them. 

![appointments](media/features/my-appointments.png)

Clients can click on the appointment card to see more details.

For upcoming appointments they can also see the options to cancel or edit them.

![appointment detail](media/features/my-appointment-details.png)

- __Profile page__

The profile page offers users the option to review and manage their account and profile information.


<details>
  <summary>Check preview</summary>

   ![profile](media/features/profile.png)

</details>



### Staff pages

- __Calendar__

When Staff members access the calendar and see all appointments for a specific day, week or month. They can also click on the appointment box to see more details.

<details>
  <summary>Check preview</summary>

   ![profile](media/features/calendar.png)

</details>


- __Appointments__

From the "Appointments" section it is possible to add new appointments, so that staff members can make appointments on behalf of the clients.

Staff members can select a client from the registered users, or they can make an appointment for unregistered users. In this case they need to enter the name.

They can also view all the appointments, and search by client.

It is possible to click on the options to delete or edit an existing appointment.


<details>
  <summary>Check preview</summary>

   ![profile](media/features/appointments.png)

</details>


- __Treatments__

From this section staff members can manage the treatments.

They can add a new treatment, and edit or delete an existing one.

Staff members can also see the inactive treatments.

If a treatment had been booked already, staff members cannot delete it, but they need to set is as "Inactive", this was designed for the following reasons:

- Each appointment is related to a treatment by foreign key.
- When deleting the treatment we dont want to cascade and delete all the related appiointment, beacause staff members and clients don't wont to have upcoming appointments deleted, and they might still want to review even past appointments.

Setting a treatment to inactive will hide it from the booking form, but it can be managed in this section and restored if needed.


<details>
  <summary>Check preview</summary>

   ![Treatments](media/features/treatments.png)

</details>


- __Clients__

Finally, staff members can see the list of registered users, and they can search clients by username/display name.

When clicking on the client row, staff members can see a list of details, such as name, total caount of appointments, if there is any appointment for the current day. they can also change the user role from clcient to staff (or the opposite), and they can review and add some notes. 

This might be useful to save information, such as the previous dye mix used, the preferred hair conditioning, or the hair type and best products used.

![clients](media/features/clients.png)


## Testing 


### Tests


### Validator Testing

#### HTML

 Check if errors are returned when passing the final version through the official [W3C validator](https://validator.w3.org/nu/#textarea)

  <details>

  <summary>W3 - HTML validation screenshot</summary>

  ![Image]()
  </details>


#### CSS

 Check if Errors are returned when passing the final version through the official [Jigsaw validator](https://jigsaw.w3.org/css-validator/validator)

  <details>

  <summary>W3 - CSS validation screenshot</summary>
  
  ![Image]()
  </details>


#### JavaScript

Check if Errors are returned when passing the final version through the official [JsHint validator](https://jshint.com/), but only 4 warnings.


 <details>
  <summary>JsHint - JS validation screenshot</summary>

  ![Image]()

  </details>


### Fixed Bugs

<details>
<summary>Sign up form error</summary>

- Issue: When trying to sign up with invalid values, instead of receiving an alert under the field, the page was gicing the following error:

![Sign up error](/media/errors/signup-error.png)

This was the error logged in the console: <'your.site.com'> has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

- Fix: After troubleshooting I could identify that the issue was caused by a the missing "CLIENT_ORIGIN_DEV" valiable in the booking-api settings.py file.

</details>


<details>
<summary>Edit form not initializing date</summary>

- Issue: When trying and editing an appointment, the date input field was not initialized with the appointment date.

![Date input](/media/errors/edit-appoint-date-not-initialized.png)

This was caused by an erorr in the received date format:

![Console error](/media/errors/edit-appointment-date-console-error.png)

- Fix: To fix this error I changed the date format in booking_api, so that the format matches the required yyyy-mm-dd format.

</details>


<details>
<summary>Create appointment form throwing error 404 page not found</summary>

- Issue: When trying and access the page "my-appointments/create", axios was sending a get request to the api/my-appointments/create, instead of just redirecting to "my-appointments/create".

![Error 404](/media/errors/my-appointments-create-redirect-error.png)

This was caused by a fragment I entered in the router to try display the standard navbar and footer just on some pages, and not all of them. 

This was correctly displaying the navbar and footer just for the selected paged, but it had the side effect of breaking this one route and react router was reading the url "my-appointments/create" as "my-appointments/:id", therefore trying to render the AppointmentPage component and firing the axios get request to my-appointments/:id , but with "create" in place of the id.

Hence the error 404.

- Fix: To fix this error I restored the original routes, and I added the following code to the navbar and footer components:


      /* Check the location */
      const location = useLocation();
      const [hide, setHide] = useState(false)
  
      useEffect(() => {
          /* If the location  is /dashboard, we hide set hide to true*/
          if (location.pathname === "/dashboard") {
              setHide(true);
          } else {
              setHide(false);
          }
      }, [location]);


Then I added conditional rendering to render the navbar or the footer just when hide is false.

</details>


<details>
<summary>Staff Appointment Create form giving error</summary>

- Issue: When trying to book using the staff appointment create form, we received the following error:

![Owner error](/media/errors/staff-appointment-create-error.png)

This was caused by the fact that I was passing the client.owner value, while the pk was expected.

- Fix: To fix this error I changed the code to pass the client.id as value:

![Owner fix](/media/errors/staff-appointment-create-fix.png)

</details>


### Unfixed Bugs


### Performance


## Deployment

### Deployment on Heroku

### Local Deployment
  - For a local deployment follow these steps:
    - Create a new directory on your machine, where you want do deploy the files
    - Open the existing repository in GitHub
    - Go to the "Code" tab
    - Click on the "Code" button
    - Copy the HTTPS link
    - Open your terminal and run the command __git clone 'link'__
    - use the link just copied, without quotes, instead of 'link'


## Credits 

### Code

### Content

- The icons were taken from [Font Awesome](https://fontawesome.com/)

- The hair icon is from [Icons 8](https://icons8.com/icon/BuTG7ooQjwHl/hairstyle)


- Hero image by [George Bohunicky](https://unsplash.com/@stuchy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/qJKT2rMU0VU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)


- Photo gallery 1 by [kyle smith](https://unsplash.com/@roller1?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/4qYHqQqlwM4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  

- Photo gallery 2 by [Jonathan Cooper](https://unsplash.com/@theshuttervision?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/sS3qRFsKZlg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  
- Photo gallery 3 by [engin akyurt](https://unsplash.com/@enginakyurt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/Ix4D4-8cQUU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

- Photo gallery 4 by [Ali Pazani](https://unsplash.com/@alipzn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/3w14X-Yxffk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

- Photo gallery 5 by [Adam Winger](https://unsplash.com/ko/@awcreativeut?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/fI-TKWjKYls?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  
  
## Technologies used

  - HTML
  - CSS
  - JavaScript
  - React

  Libraries:
  - React router dom - To handle navigation between pages



## Acknowledgements

A special thank to my mentor __Dick Vlaanderen__ for his precious feedback on this project.