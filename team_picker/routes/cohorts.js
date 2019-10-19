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
        id: req.params.id,
        assign_method: undefined,
        quantity: undefined,
        teams: ["member1,member2","member3,member4"]
      });
    });
});

router.post("/:id", (req, res) => {
  const id = req.body.id;
  const members = req.body.members;
  const name = req.body.name;
  const assign_method = req.body.assign_method;
  const quantity = req.body.quantity;

  res.render("cohorts/show", {
    cohort: {id: id, name: name, members: members},
    assign_method: assign_method,
    quantity: quantity,
    teams: ["member5,member6","member7,member8"]
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
      res.render("cohorts/show", { 
        cohort: cohort[0],
        assign_method: undefined,
        quantity: undefined
      });
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

router.post("/", (req, res) => {
  const members = req.body.members;
  const logo_url = req.body.logo_url;
  const name = req.body.name;

  console.log(name, logo_url, members);
  if (name.length > 0 || logo_url.length > 0 || members.length > 0) {
    knex("cohorts")
      .insert({
        name: name,
        members: members,
        logo_url: logo_url,
      })
      .returning("*")
      .then(data => {
        console.log("created a new cohort", data);
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
