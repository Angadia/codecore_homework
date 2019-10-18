const express = require("express");
const knex = require("../db/client");

const router = express.Router();

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("cohorts")
    .orderBy("created_at", "DESC")
    .then(cohorts => {
      res.render("cohorts/index", {cohorts});
    });
});

router.get("/new", (req, res) => {
  const members = req.body.members;
  const logo_url = req.body.logo_url;
  const name = req.body.name;
  
  res.render("cohorts/new", {
    name: name,
    members: members,
    logo_url: logo_url
  });
});

router.get("/:id", (req, res) => {
  const cohortId = req.params.id;
  
  knex("cohorts")
    .where("id", cohortId)
    .first()
    .then(cohort => {
      res.render("cohorts/show", {
        cohort: cohort,
        id: req.params.id
      });
    });
});

router.get("/:id/edit", (req, res) => {
  const cohortId = req.params.id;
  
  knex("cohorts")
  .where("id", cohortId)
  .first()
  .then(cohort => {
    res.render("cohorts/edit", {
      cohort: cohort,
      id: req.params.id
    });
  });
});

router.patch("/:id", (req, res) => {
  const cohortId = req.params.id;

  knex("cohorts")
    .where("id", cohortId)
    .update({
        name: req.body.name,
        logo_url: req.body.logo_url,
        members: req.body.members
      },
      ['id', 'name', 'members']
    )
    .then(cohort => {
      res.render("cohorts/show", { cohort: cohort[0] });
    });
});

router.delete("/:id", (req, res) => {
  const cohortId = req.params.id;

  knex("cohorts")
    .where("id", cohortId)
    .delete()
    .then(data => {
      res.redirect("/cohorts");
    });
});

router.post("/new", (req, res) => {
  const members = req.body.members;
  const logo_url = req.body.logo_url;
  const name = req.body.name;

  if (name.length > 0 || logo_url.length > 0 || members.length > 0) {
    knex("cohorts")
      .insert({
        name: name,
        members: members,
        logo_url: logo_url,
      })
      .returning("*")
      .then(data => {
        res.redirect("/");
      });
  } else {
    res.render("cohorts/new", {
      name: name,
      members: members,
      logo_url: logo_url
    });
  };
});



module.exports = router;
