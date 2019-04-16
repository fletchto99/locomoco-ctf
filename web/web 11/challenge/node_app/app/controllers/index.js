const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('unauthenticated/comment');
});

router.post('/admin/comment', (req, res) =>{
    comments.push({
        "name": req.body.name,
        "comment": req.body.comment
    })
    res.send("Thanks")
});

router.get('/admin/dashboard', (req, res) => {
  res.render('authenticated/dashboard', {
    "comments": comments.reverse()
  });
});

module.exports = router;
