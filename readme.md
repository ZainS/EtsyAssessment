## Etsy Assessment


#Acceptance Criteria

> Please write an application that when given a list of Etsy Shop IDs as a parameter does the following:

> * Synchronizes the shop's listings to several files (one per shop ID), outputting what has been added or removed since the last run.

> Guidelines:
> ----
> * All work is done in a git repository
> * A readme with instructions on how to run the application
> * Use any language you want, with any libraries you want
> * Take as long as you'd like to finish this exercise
> * If you have time, or want to show off, include tests!


## Instructions

1. Installation
  a. Download or clone this repository.
  b. Run "npm install"
  c. Run program from the command line "node app.js"
  d. User must have write access to the db directory
  e. Use Postman and make a post call
2. Run test
  a. Run "npm tests"
  b. All results should be positive 
3. Deployment to AWS elastic Bean
  a. Coming Soon. 


## Example Execution

> node app.js
```
// Go to URL 127.0.0.1/api/
POST: [17048693,17048703,17048745]

RESPONSE & LOGS: We provide web response and logs. 
```
#3
   This is the first save for 3


#17048703
  No changes since last file save. 


#17048745
  Listing change: 344343343
     Field: ending_tsz 333  =>  444
     Field: creation_tsz 111  =>  444
     Field: last_modified_tsz 123  =>  444

  Listing change: 12341235125
     Field: creation_tsz 22  =>  33
```

#Packages

```
"dependencies": {
    "axios": "^0.17.1",
    "body-parser": "^1.19.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "deep-diff": "^0.3.8",
    "express": "^4.17.1",
    "mocha": "^8.1.1",
    "winston": "^3.3.3"
  }
```

##Improvements to be made
- Deploy and demonstrate on AWS
- Write tests before development, with more time allowable
- Tests at the function level instead of the whole app
- greater refactoring and commentss
- choice to save to database or files
- improve the logger output