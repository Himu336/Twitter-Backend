# Twitter-Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge)
![Bcrypt](https://img.shields.io/badge/Bcrypt-624384?style=for-the-badge)
![Multer](https://img.shields.io/badge/Multer-FFFFFF?style=for-the-badge)

A complete, feature-rich backend clone of Twitter built with a robust, monolithic architecture using Node.js, Express, and MongoDB. This project demonstrates best practices in API design, data modeling for social applications, and secure, modular user authentication.

---

## Core Responsibilities

-   **User Authentication:** Secure user registration and login using Passport.js with a JWT strategy, including refresh token capabilities for persistent sessions.
-   **Social Graph Management:** Implements core social features like following/unfollowing users and managing subscriber lists.
-   **Content Management:** Handles all CRUD operations for tweets, including text, images, and videos.
-   **Media Handling:** Manages uploads, optimization, and delivery of media files (avatars, cover images, tweet media) via AWS S3.
-   **Social Interactions:** Powers features like liking tweets, commenting, and viewing user-specific content feeds.

---

## 💡 System Design Pointers

-   **Monolithic Architecture:** This project uses a monolithic architecture where all functionalities are managed within a single codebase. This design simplifies development and deployment for applications with tightly coupled domains like a social media platform.
-   **Data Modeling for a Social Graph:** The schema design is a practical example of modeling a social graph in a NoSQL database. It uses arrays of ObjectIDs to represent relationships, an efficient way to handle one-to-many and many-to-many relations in MongoDB.
-   **Stateless Authentication:** By using JWT, the service remains stateless, as all necessary user data is contained within the token itself. This is critical for scalability, as any instance of the application can serve any authenticated request.

---

## ✨ Advanced Backend Concepts Implemented

-   **MongoDB Aggregation Pipeline:** The service leverages MongoDB's powerful aggregation framework for complex data retrieval, such as fetching a user's channel profile along with their subscriber count and subscription status. This approach offloads complex computations to the database for a more efficient API.
-   **Flexible Data Modeling with Polymorphic Associations:** Implemented a polymorphic schema for features like "likes." A single `Like` model can be associated with multiple content types (e.g., `Tweet`, `Comment`) by using a `refPath` in Mongoose. This design avoids data duplication and creates a flexible, scalable system.
-   **Modular Authentication with Passport.js:** Utilizes Passport.js to decouple authentication logic into reusable "strategies." This implementation uses a JWT strategy with refresh tokens, providing a secure, stateless, and easily maintainable authentication system that can be extended with other strategies (e.g., OAuth) in the future.
-   **Middleware-driven Architecture:** Makes extensive use of Express middleware for handling authentication (`passport.authenticate`), file uploads (`multer`), and error handling, keeping controller logic clean and separating concerns.
-   **Efficient Media Handling Pipeline:** Integrates Multer and the AWS SDK to create an efficient pipeline for media uploads. Files are first parsed in memory by Multer, then streamed to AWS S3, decoupling the file upload process from the local file system.
