# EventTrackerProject:

- JPAArtistsTracker
- Created by Blake Vieyra

# Description:

- JPAArtistsTracker project uses allows the user to retrieve music artists from a databases, apply CRUD operations to the artists in the database, as well as retrieve songs from the individual artists. The user can then apply CRUD operations to the songs as well for the individual artists. The user can keyword search an artist by name as well as keyword search for songs of the artists, which retrieves a match using the title, genre, or album name of artist's song.
  
AWS EC2 Link: 

# Key Features:

| HTTP Verb | URI               | Request Body | Response Body | Status Codes |
|-----------|-------------------|--------------|---------------|---------|
| GET       | `/api/artists`      |              | List of all artists entities |
| GET       | `/api/artists/1`   |              | JSON of artists `1` |
| POST      | `/api/artists`      | JSON of a new artists entity  | JSON of created artists | 
| PUT       | `/api/artists/1`   | JSON of a new version of song `1` | JSON of updated song | 
| DELETE    | `/api/artists/1`   |      
| GET       | `/api/artists/1/songs`      |              | List of all song entities | 
| GET       | `/api/artists/1/songs/1`   |              | JSON of song `1` | 
| POST      | `/api/artists/1/songs`      | JSON of a new song entity  | JSON of created song |
| PUT       | `/api/artists/1/songs/1`   | JSON of a new version of song `1` | JSON of updated song | 
| DELETE    | `/api/artists/1/songs/1`   |            

# Tech Used:

Programming Languages:
- Java 8 (version 1.8.0_391)
- IDEs: Spring Tool Suite (STS) (https://spring.io/tools)
- Version Control: Git 2.32.1 (https://git-scm.com/)
- Database Management: MySQL (version 5.7.39)
- Build Tool: Gradle
- Web Framework: Spring MVC

# Lessons Learned:

- How to use the restful API JPA repositories and properly separate concerns between the services, controllers, and the repos.
