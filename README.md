# EventTrackerProject:

- JPAArtistsTracker
- Created by Blake Vieyra

# Description:

- The JPAArtistsTracker project allows the user to retrieve music artists from a database, apply CRUD operations to the artists in the database, as well as retrieve songs from the individual artists. The user can then apply CRUD operations to the songs as well for the individual artists. The user can keyword search an artist by their name or their band as well as a keyword search the songs of the artists. This will retrieve a match using the title, genre, or album name of the artist's song.
  
- Deployed AWS EC2 Link: http://18.224.81.89:8080/JPAArtistTracker

# Key Features:

| HTTP Verb | URI               | Request Body | Response Body | Status Codes |
|-----------|-------------------|--------------|---------------|---------|
| GET       | `/api/artists`      | JSON retrieval of all artists | List of all artists entities | 200, 404 |
| GET       | `/api/artists/1`   |  JSON of artists `1` | Retrieves artist by id  `1`| 200, 404 |
| POST      | `/api/artists`      | JSON of a new artists entity  | JSON of created artists | 201, 400 |
| PUT       | `/api/artists/1`   | JSON of a new version of song `1` | JSON of updated song | 201, 400 |
| DELETE    | `/api/artists/1`   | JSON of deletion of artist `1` | JSON of deleted song | 204, 404, 400 |  
| GET       | `/api/artists/1/songs`      | JSON retrieval of all song of artist `1` | List of all song entities | 200, 404 |
| GET       | `/api/artists/1/songs/1`   | JSON retrieval of all song of artist `1` | JSON of song `1` | 200, 404 |
| POST      | `/api/artists/1/songs`      | JSON of a new song entity  | JSON of created song | 201, 404, 400 | 
| PUT       | `/api/artists/1/songs/1`   | JSON of a new version of song `1` | JSON of updated song | 200, 404, 400 |              
| DELETE    | `/api/artists/1/songs/1`   | JSON of deletion of song `1` | JSON of deleted song | 204, 404, 400 |              

# Tech Used:

Programming Languages:
- Java 8 (version 1.8.0_391)
- IDEs: Spring Tool Suite (STS) (https://spring.io/tools)
- Version Control: Git 2.32.1 (https://git-scm.com/)
- Database Management: MySQL (version 5.7.39)
- Build Tool: Gradle
- Web Framework: Spring MVC, JPA, Restful API

# Lessons Learned:

- How to use the Restful API JPA repositories and properly separate concerns between the services, controllers, and the repos.
