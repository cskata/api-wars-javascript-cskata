ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS planet_votes_pk CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.registered_users DROP CONSTRAINT IF EXISTS registered_users_pk CASCADE;

DROP TABLE IF EXISTS registered_users;

CREATE TABLE registered_users (
    id SERIAL,
    username character varying(255) NOT NULL,
    hashed_pw character varying(255) NOT NULL,
    reg_date timestamp without time zone
);

ALTER TABLE ONLY registered_users
    ADD CONSTRAINT registered_users_pk PRIMARY KEY (id);

ALTER TABLE ONLY registered_users
    ADD CONSTRAINT username_uk UNIQUE (username);


DROP TABLE IF EXISTS planet_votes;

CREATE TABLE planet_votes (
    id SERIAL,
    planet_id integer NOT NULL,
    planet_name character varying(255) NOT NULL,
    user_id integer NOT NULL,
    submission_time timestamp without time zone
);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT planet_votes_pk PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES registered_users(id);