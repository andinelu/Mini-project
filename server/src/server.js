// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import mysql from 'mysql';
const ArticleDao = require("../dao/articledao.js");
const CommentDao = require("../dao/commentdao.js");


var pool = mysql.createPool({
  connectionLimit: 3,
  host: "mysql-ait.stud.idi.ntnu.no",
  user: "andinel",
  password: "4BA61FfC",
  database: "andinel",
  debug: false
});

class Article {
  id: number;
  overskrift: string;
  innhold: string;
  kategori: string;
  bilde: string;
  registrert_tidspunkt: string;
  viktighet: boolean;
}

class Comment {
  kommentar_id: number;
  nyhetssak_id: number;
  brukernavn: string;
  innhold: string;
  registrert: string;
}

const public_path = path.join(__dirname, '/../../client/public');

let app = express();

app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json


let articleDao = new ArticleDao(pool);
let commentDao = new CommentDao(pool);

app.get("/forside", (req, res) => {
  console.log("/forside: reveived GET request from client");
  req.query.page = parseInt(req.query.page);
  articleDao.getImportant(req.query.page, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.get("/live", (req: express$Request, res: express$Response) => {
  pool.query("select id, overskrift, registrert_tidspunkt from nyhetssaker order by registrert_tidspunkt desc limit 6", (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }
    res.send(results);
  });
});
/*
app.get("/live", (req, res) => {
  console.log("/live: received GET request from client");
  articleDao.getLatest((status, data) => {
    res.status(status);
    res.json(data);
  });
}); */

app.get('/nyhetssaker/:id', (req: express$Request, res: express$Response) => {
  pool.query('select overskrift, bilde, innhold from nyhetssaker where id=?', [req.params.id], (error, results: Article[]) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }
    if (results.length == 0) return res.sendStatus(404); // No row found

    res.send(results[0]);
  });
});
/*
app.get("/nyhetssaker/:id", (req, res) => {
  console.log("/articles/:id: received GET request from client");
  req.params.id = parseInt(req.params.id);
  articleDao.getOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
}); */

app.post("/opprett", (req, res) => {
  console.log("/articles: received POST request from client");
  articleDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.put("/nyhetssaker/:id", (req, res) => {
  console.log("/articles/:id: received GET request from client");
  req.params.id = parseInt(req.params.id);
  articleDao.updateOne(req.params.id, req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
});

app.delete("/nyhetssaker/:id", (req, res) => {
  console.log("/articles/:id: received DELETE request from client");
  req.params.id = parseInt(req.params.id);
  articledao.deleteOne(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});
/*
app.get("/nyhetssaker/:id/kommentar", (req, res) => {
  console.log("/nyhetssaker/:id/kommentar: received GET request from client");
  req.query.page = parseInt(req.query.page);
  commentDao.getAll(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
}); */

/*
app.get('/nyhetssaker/:id/kommentar', (req: express$Request, res: express$Response) => {
  pool.query('select brukernavn, innhold, registrert from kommentar where nyhetssak_id=? ', [req.params.id], (error, results: Comment[]) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }
    if (results.length == 0) return res.sendStatus(404); // No row found

    res.send(results[0]);
  });
}); */

app.get("/nyhetssaker/:nyhetssak_id/kommentar", (req, res) => {
  console.log("/articles/:id/comment: received GET request from client");
  //req.query.page = parseInt(req.query.page);
  commentDao.getAll(req.params.id, (status, data) => {
    res.status(status);
    res.json(data);
  });
});


app.get("/kommentar/:id", (req: express$Request, res: express$Response) => {
  pool.query("select brukernavn, innhold,  date_format(registrert, '%Y-%m-%d %k:%i') registrert from kommentar where nyhetssak_id=? order by registrert desc", [req.params.id],(error, results) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }
    res.send(results);
  });
});


///nyhetssaker/:id/kommentar
app.post("/kommentar/:id", (req, res) => {
  console.log("/nyhetssaker/:id/kommentar: received POST request from client");
  commentDao.createOne(req.body, (status, data) => {
    res.status(status);
    res.json(data);
  });
   });

  app.get("/:kategori", (req, res) => {
    console.log("/:kategori: received GET request from client");
    req.query.page = parseInt(req.query.page);
    articleDao.getCategory(req.params.kategori, req.query.page, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });






/*
app.get('/forside', (req: express$Request, res: express$Response) => {
  pool.query('select overskrift, bilde, id from nyhetssaker where viktighet=true', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }

    res.send(results);
  });
});



app.get('/sport', (req: express$Request, res: express$Response) => {
  pool.query('select overskrift, bilde, id from nyhetssaker where kategori="sport"', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }

    res.send(results);
  });
});

app.get('/kultur', (req: express$Request, res: express$Response) => {
  pool.query('select overskrift, bilde, id from nyhetssaker where kategori="kultur"', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }

    res.send(results);
  });
});

app.get('/teknologi', (req: express$Request, res: express$Response) => {
  pool.query('select overskrift, bilde, id from nyhetssaker where kategori="teknologi"', (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500);
    }

    res.send(results);
  });
});



app.post('/opprett', (req: express$Request, res: express$Response) => {
  pool.query(
      'insert into nyhetssaker (overskrift, innhold, bilde, kategori, viktighet) values (?,?,?,?,?)',
      [req.body.overskrift, req.body.innhold, req.body.bilde, req.body.kategori, req.body.viktighet],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500);
        }
        //if (results.affectedRows == 0) return res.sendStatus(404); // No row updated

        //res.sendStatus(200);
      }
  );
});
*/

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  // Setup hot reload (refresh web page on client changes)
  reload(app).then(reloader => {
    app.listen(3000, (error: ?Error) => {
      if (error) reject(error.message);
      console.log('Express server started');
      // Start hot reload (refresh web page on client changes)
      reloader.reload(); // Reload application on server restart
      fs.watch(public_path, () => reloader.reload());
      resolve();
    });
  });
});
