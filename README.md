# cautious-giggle
Scalara Coding Challenge


### How to
Easiest way to run this is by using the supplied docker-compose.yml  
```docker-compose up```
the api is reachable at port 8080 and the documentation at /api

Alternativly inside of `nest-backend` make copy of `.env.docker` named `.env.local` and point it towards a valid postgres database.
You can then run NestJS directly through
`yarn start`
api port is 3030 in this case

### Seed data
You can seed some test date through:
`yarn seed`
You can change the amounts in `src/seeds/seed.config.ts`

### Assumptions

- No initial networth on person creation as there is no account yet
- Max burrowable amount has (atleast) two ways of calculation:
    - either just summing up each friends borrowable amount
    - expecting lending from one friend increases your networth and therefore reduces borrowable amount for other friends
    => we us the sum method as the other opens up a ~~whole can of worms~~ lot more assumptions and complexity
- Authentication, Encryption, and Secrets Management is omited for this demonstration

### Future ToDos:

- massivly expanpand test coverage & implement e2e tests
- improve exception throwing and handeling
- add some sort of authentication
- unify api return values

