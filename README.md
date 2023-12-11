# Animal Unity - Full-stack web application for pet adoption

## The Technologies Used

This is a web application built with Next.js, Next-Auth.js (now Auth.js), MongoDB, and Tailwind CSS.

## The Application's Functionality

Animal Unity is a web application built to help people interested in adopting an animal find the right companion.

The primary function of the app is the search function. The home page greets the user with this, where they can select an animal type and the location that they'd like to search.
If they give permission, then the app will grab the user's location for them to use instead of having to type in a given location.

The home page also includes an 'Adoptable Animals Nearby' section that will automatically fetch a handful of animals near their location for the user to see and learn more about. It also has a button that will take them to the search, automatically showing them more results of the given animal type and their location. If the user denies location permission, then this section of the page will give the user feedback in the UI, saying that this feature will only work if they allow access to their location.

Regardless of the path that the user takes to the search, the experience will be the same once there. There are several filters for the user to select, including the breed, age, size, and if the animal is house-trained. The new, filtered results will load after the user selects the filters that they'd like and click the 'Update filters' button. Each animal has a like button, which will give the user feedback to sign in if they're not already, as the user's likes are stored in the database in relation to their account. If the user *is* signed in, then clicking an animal's like-button will update the heart icon to have a background color, instead of being empty, giving them feedback that they've successfully liked that animal. The user's likes are available to look at in their 'Favorites'.

Of course, each animal in the search results is also clickable so the user can learn more about that specific animal. Once they navigate to an individual animal's page, any information available about that animal will be displayed, including a photo gallery (again, if photos are available). All of this information is being fetched from the Petfinder API. Unfortunately, I realized later on that the Petfinder API provides all information except for the full, written description of the animal, so I added a 'Learn more...' link that directs the user to Petfinder's site, where they can read the full description and fill out a proper application for the animal if they wish.

As for the process of signing in, I've utilized Google OAuth and an email option. The Google OAuth process is like any other, where the user selects their Google account, and that account is stored by Next-Auth in the database. The email option has the user type in their preferred email, which is where they will be sent a verification email that has a link for them to click on to sign in. I intentionally opted for no username/password login due to the inherent security risks involved.
