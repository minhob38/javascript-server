\connect "docker-database";

CREATE TABLE public.users (
  id serial primary key,
  email varchar NOT NULL,
	"password" varchar NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NULL
);
