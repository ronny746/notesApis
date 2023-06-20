const express = require('express');
const mongoose = require('mongoose');
const userroute = require('./routes/user-routes');
const notesroute = require('./routes/notes-routes');
const app = express();
app.use(express.json());
app.use("/api",userroute);
app.use("/api",notesroute);

mongoose.connect('mongodb+srv://rkrana6631:ronny@cluster1.djbuyaj.mongodb.net/Blog?retryWrites=true&w=majority'
).then(() => app.listen(3000)
).then(() => console.log("connected to Database and running on port 3000")
);


