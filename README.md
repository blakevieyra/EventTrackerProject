# EventTrackerProject:

- JPAArtistsTracker
- Created by Blake Vieyra

# Description:

- The JPAArtistsTracker project allows the user to search for over 660 musical artists and over 1600 songs in a preloaded database. The user can apply CRUD operations to the artists in the database, as well as the songs. The user can keyword search for an artist or a song and find songs they like. They can also discover new songs from a favorite artist or discover new artists and their songs like they were at a favorite record store with many albums of many artists. 
  
- Deployed AWS EC2 Link: http://18.224.81.89:8080/JPAArtistsTracker

# Key Features:

| HTTP Verb | URI               | Request Body | Response Body | Status Codes |
|-----------|-------------------|--------------|---------------|---------|
| GET       | `/api/artists`      | JSON retrieval of all artists | List of all artists entities | 200, 404 |
| GET       | `/api/songs`      | JSON retrieval of all songs | List of all song entities | 200, 404 |
| GET       | `/api/artists/1`   |  JSON of artists `1` | Retrieves artist by id  `1`| 200, 404 |
| GET       | `/api/songs/1`   |  JSON of songs `1` | Retrieves song by id  `1`| 200, 404 |
| POST      | `/api/artists`      | JSON of a new artists entity  | JSON of created artists | 201, 400 |
| POST      | `/api/songs`      | JSON of a new song entity  | JSON of created song | 201, 400 |
| PUT       | `/api/artists/1`   | JSON of a new version of artist `1` | JSON of updated artist | 201, 400 |
| PUT       | `/api/songs/1`   | JSON of a new version of song `1` | JSON of updated song | 201, 400 |
| DELETE    | `/api/artists/1`   | JSON of deletion of artist `1` | JSON of deleted artist | 204, 404, 400 |  
| DELETE    | `/api/song/1`   | JSON of deletion of song `1` | JSON of deleted song | 204, 404, 400 |  
| GET       | `/api/artists/1/songs`      | JSON retrieval of all song of artist `1` | List of all song entities | 200, 404 |
| GET       | `/api/artists/1/songs/1`   | JSON retrieval of a song ID 1 of artist `1` | JSON of song ID `1` | 200, 404 |
| POST      | `/api/artists/1/songs`      | JSON of a new song entity  | JSON of created song | 201, 404, 400 | 
| PUT       | `/api/artists/1/songs/1`   | JSON of a new version of song `1` | JSON of updated song | 200, 404, 400 |              
| DELETE    | `/api/artists/1/songs/1`   | JSON of deletion of song `1` | JSON of deleted song | 204, 404, 400 |              

# Tech Used:

Programming Languages:
- Java 8 (version 1.8.0_391)
- Python 3.11
- Visual Code Studio
- IDEs: Spring Tool Suite (STS) (https://spring.io/tools)
- Version Control: Git 2.32.1 (https://git-scm.com/)
- Database Management: MySQL (version 5.7.39)
- Build Tool: Gradle, SringBoot
- Web Framework: Spring MVC, JPA, Restful API

# Lessons Learned:

- How to use the Restful API JPA repositories and properly separate concerns between the services, controllers, and the repos.
- How to utilize javascript to make the webpage more dynamic and user friendly.
- How to parse, clean, and format large data sets using python libraries to generate 1000s of songs into a database.

