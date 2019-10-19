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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

function getRandomizedArray(membersArray) {
  const randomizedArray = [];
  for (let i = membersArray.length-1; i >= 0; i--) {
    randomizedArray.push(membersArray.splice(getRandomIntInclusive(0, i), 1)[0]);
  };
  return randomizedArray;
};

function generateAssignedTeams(members, method, quantity) {
  const emptyArray = [];
  const membersRandomizedArray = getRandomizedArray(members.split(','));
  
  if (!method || !quantity) {
    return emptyArray;
  };

  const numQuantity = parseInt(quantity, 10);
  if (isNaN(numQuantity) || numQuantity <= 0) {
    return emptyArray;
  };

  const teams = [];
  if (method == "team_count") {
    let numTeams = numQuantity;
    let minMembersPerTeam = 1;
    if (numTeams > membersRandomizedArray.length) {
      numTeams = membersRandomizedArray.length;
    } else {
      minMembersPerTeam = Math.floor(membersRandomizedArray.length/numQuantity);
      if (minMembersPerTeam <= 0)
        minMembersPerTeam = 1;
    };
    while (membersRandomizedArray.length > 0) {
      teams.unshift(membersRandomizedArray.splice(0,minMembersPerTeam).join(','));
      numTeams -= 1;
      if (numTeams < 1)
        numTeams = 1;
      if (membersRandomizedArray.length%numTeams == 0)
        minMembersPerTeam = membersRandomizedArray.length/numTeams;
    };
  } else if (method == "number_per_team") {
    while (membersRandomizedArray.length > 0) {
      teams.push(membersRandomizedArray.splice(0,numQuantity).join(','));
    };
  };
  return teams;
};


router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (Object.entries(req.query).length <= 0) {
    knex("cohorts")
      .where("id", id)
      .first()
      .then(cohort => {
        res.render("cohorts/show", {
          cohort: cohort,
          id: req.params.id,
          method: undefined,
          quantity: undefined,
          teams: undefined
        });
      });
  } else {
    const members = req.query.members;
    const name = req.query.name;
    const method = req.query.method;
    const quantity = req.query.quantity;

    const teams = generateAssignedTeams(members, method, quantity);

    res.render("cohorts/show", {
      cohort: {id: id, name: name, members: members},
      method: method,
      quantity: quantity,
      teams: teams
    });
  };
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  
  knex("cohorts")
    .where("id", id)
    .first()
    .then(cohort => {
      res.render("cohorts/edit", {
        cohort: cohort,
        id: req.params.id
      });
    });
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;

  knex("cohorts")
    .where("id", id)
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
        method: undefined,
        quantity: undefined,
        teams: undefined
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  knex("cohorts")
    .where("id", id)
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
