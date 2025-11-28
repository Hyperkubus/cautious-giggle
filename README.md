# cautious-giggle
Scalara Coding Challenge


### How to
Easiest way to run this is by using the supplied docker-compose.yml
`docker-compose up`

Alternativly inside of `nest-backend` make copy of `.env.docker` named `.env.local` and point it towards a valid postgres database.
You can then run NestJS directly through
`yarn start`

### Assumptions

- No initial networth on person creation as there is no account yet
- Max lendable amount can be defined either as sum of amount per friend or as the maximum of these
- Authentication, Encryption, and Secrets Management is omited for this demonstration

