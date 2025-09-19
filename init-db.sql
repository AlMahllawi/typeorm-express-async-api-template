DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'MyAppDB') THEN
      CREATE DATABASE "MyAppDB";
   END IF;
END
$$;

DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'myappuser') THEN
      CREATE ROLE myappuser WITH LOGIN PASSWORD 'n0nS3cure';
   END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE "MyAppDB" TO myappuser;
ALTER DATABASE "MyAppDB" OWNER TO myappuser;
