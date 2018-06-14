DROP DATABASE IF EXISTS Review;
CREATE DATABASE Review;
USE Review;

CREATE TABLE Users (
    id int NOT NULL,
    user_name VARCHAR(40) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Houses (
    id int NOT NULL,
    overall_rating int,
    rating_accuracy int,
    rating_communication int,
    rating_cleanliness int,
    rating_location int,
    rating_check_in int,
    rating_value int,
    PRIMARY KEY(id)
);

CREATE TABLE Reviews (
    id int NOT NULL AUTO_INCREMENT,
    created_at datetime NOT NULL,
    overall_rating int NOT NULL,
    comment varchar(2500) NOT NULL,
    rating_accuracy int NOT NULL,
    rating_communication int NOT NULL,
    rating_cleanliness int NOT NULL,
    rating_location int NOT NULL,
    rating_check_in int NOT NULL,
    rating_value int NOT NULL,
    house_id int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (house_id) REFERENCES Houses(id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    PRIMARY KEY(id)
);

ALTER TABLE Houses ADD allReviewLen int;




