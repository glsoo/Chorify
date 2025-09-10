# Liquid Glass Music — Express Edition

- Express app with **/public** static folder and modular **/routes/**
- Data persisted into **/data** JSON files; uploads in **/uploads/**
- Users can edit/delete **their own songs**; admins can manage **all** songs
- Playlists, likes, search, queue/shuffle/repeat, covers, admin panel

## Run
```bash
npm install
node app.js
# open http://localhost:6940
```
Default admin (seeded if none): **admin / admin** (change in data/users.json).

> Demo-grade only: move to a real DB and secure session store for production.
