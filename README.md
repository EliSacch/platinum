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
  - [Landing Page](#landing-page)
  - [Staff Page](#staff-page)

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
  <summary>Landing page mobile</summary>

   ![Mobile Wireframe](media/wireframes/landingpage/mobile/1.png)
   ![Mobile Wireframe](media/wireframes/landingpage/mobile/2.png) 
   ![Mobile Wireframe](media/wireframes/landingpage/mobile/3.png) 
   ![Mobile Wireframe](media/wireframes/landingpage/mobile/4.png) 
   ![Mobile Wireframe](media/wireframes/landingpage/mobile/5.png) 

</details>


<details>
  <summary>Landing page desktop</summary>

   ![Desktop Wireframe](media/wireframes/landingpage/desktop/1.png)
   ![Desktop Wireframe](media/wireframes/landingpage/desktop/2.png)
   ![Desktop Wireframe](media/wireframes/landingpage/desktop/3.png)

</details>


<details>
  <summary>Staff page mobile</summary>

   ![Mobile Wireframe](media/wireframes/admin-page/mobile/1.png)
   ![Mobile Wireframe](media/wireframes/admin-page/mobile/2.png)
   ![Mobile Wireframe](media/wireframes/admin-page/mobile/3.png)
   ![Mobile Wireframe](media/wireframes/admin-page/mobile/4.png)
   ![Mobile Wireframe](media/wireframes/admin-page/mobile/5.png)
   ![Mobile Wireframe](media/wireframes/admin-page/mobile/6.png)

</details>


<details>
  <summary>Staff page desktop</summary>

   ![Desktop Wireframe](media/wireframes/admin-page/desktop/1.png)
   ![Desktop Wireframe](media/wireframes/admin-page/desktop/2.png)
   ![Desktop Wireframe](media/wireframes/admin-page/desktop/3.png)

</details>


### Design

- Color palette:
  - Neutral colours:

  ![light](media/design/color-palette-light.png)
  ![dark](media/design/color-palette-dark.png)
  - Vibrant colours: 
  
  ![vibrant](media/design/color-palette-colours.png)


## Features 


### Landing page

- __About section__

- __Gallery__

- __Services__

- __Booking form__

- __Footer__


### Staff Page

- __Dashboard__

- __View appointments__

- __New appointment__

- __Appointment details__

- __Edit appointment__ 

- __Delete appointment__ 

- __Add staff member__


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

- The following fonts, used for the project, are from [Google Fonts](https://fonts.google.com/):
  - Anton
  - Raleway
  - Caramel

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