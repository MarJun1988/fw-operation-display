
# FW Backend (Golden TS) — Express 5 + Apollo v4 + graphql-ws + Prisma + RedisPubSub

Minimal, stabil, nur `Message`-Entity (id:int, content:string, createdAt:datetime).

## Quickstart
1) `.env` anlegen (oder .env.example kopieren)
2) `npm install`
3) `npm run prisma:migrate -- --name init`
4) `npm run dev`

HTTP:  http://localhost:4000/graphql
WS:    ws://localhost:4000/graphql
