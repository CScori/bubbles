const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();
const port = process.env.PORT || 5588;
const token =
  "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(CORS());
// server.use(express.static(path.join(__dirname, "client/build")));


if (process.env.NODE_ENV === 'production') {
	// Set static   
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
  }


let colors = [
    {
      color: "aliceblue",
      code: {
        hex: "#f0f8ff"
      },
      id: 1
    },
    {
      color: "limegreen",
      code: {
        hex: "#99ddbc"
      },
      id: 2
    },
    {
      color: "aqua",
      code: {
        hex: "#00ffff"
      },
      id: 3
    },
    {
      color: "aquamarine",
      code: {
        hex: "#7fffd4"
      },
      id: 4
    },
    {
      color: "lilac",
      code: {
        hex: "#9a99dd"
      },
      id: 5
    },
    {
      color: "softpink",
      code: {
        hex: "#dd99ba"
      },
      id: 6
    },
    {
      color: "cadetblue",
      code: {
        hex: "#5F9EA0"
      },
      id: 7
    },
    {
      color: "lime",
      code: {
        hex: "#00FF00"
      },
      id: 8
    },
    {
      color: "navy",
      code: {
        hex: "#000080"
      },
      id: 9
    },
    {
      color: "blue",
      code: {
        hex: "#6093ca"
      },
      id: 10
    },
    {
      color: "blueviolet",
      code: {
        hex: "#8a2be2"
      },
      id: 11
    }
  ];

let nextId = 12;

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}




app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "User" && password === "User") {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token
      });
    }, 1000);
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/colors", authenticator, (req, res) => {
  res.send(colors);
});

app.post("/api/colors", authenticator, (req, res) => {
  if (req.body.color !== undefined && req.body.code !== undefined) {
    const newcolor = req.body;
    newcolor.id = nextId;
    colors.push(newcolor);
  }
  nextId = nextId + 1;
  res.status(201).json(colors);
});

app.put("/api/colors/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the color id");
  if (req.body.id === undefined || !req.body.color || !req.body.code) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  colors = colors.map(color => {
    if (`${color.id}` === req.params.id) {
      return req.body;
    }
    return color;
  });
  res.status(200).send(req.body);
});

app.delete("/api/colors/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the color id");
  colors = colors.filter(color => `${color.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

// app.get("/", function(req, res) {
//   res.send("App is working 👍");
// });

app.listen(port, () => {
  console.log("Server listening on port 5588");
});