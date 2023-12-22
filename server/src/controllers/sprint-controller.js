import * as data from '../database/sprints-database.js';

let sprints = data.getSprintData();

export function getCurrentSprints() {
    return sprints;
}

export function getSprints(req, res) {
    if (req.query.title || req.query.startdate || req.query.duedate || req.query.size)
        res.status(200).json(filter(req.query.title, req.query.startdate, req.query.duedate, req.query.size));
    else
        res.status(200).json(getAllSprints());

}

export function getAllSprints() {

    return sprints;
}

export function filter(title, startdate, duedate, size) {
    let filteredSprints = [];

    for (const sprint of sprints) {
        if (sprint.title.toLowerCase().includes(tilte.toLowerCase())) {
            filteredSprints.push(sprint);
        }
    }

    return filteredSprints;
}


export function getSprintById(req, res) {
    const id = req.params.id;


    if (id)
        for (const sprint of sprints) {
            if (sprint.sprintid == id) //== is right
                return res.status(200).json(sprint);
        }

    else
        return res.status(404).json({msg: "Id invalid!"});
}


////POST
export function addNewSprint(req, res) {
    const sprintId = sprints.length + 1;
    const sprintTitle = req.body.title;
    const sprintStartDate = req.body.startdate;
    const sprintDueDate = req.body.duedate;
    const sprintSize = req.body.size;


    let newSprint = {
        sprintid: sprintId,
        title: sprintTitle,
        startdate: sprintStartDate,
        duedate: sprintDueDate,
        size: sprintSize
    }

    sprints.push(newSprint);

    return res.status(200).json({msg: `Added new sprint! with sprint id = ${sprintId}`, sprint: newSprint});
}

//PUT
export function editSprintBySprintId(req, res) {
    const sprintId = req.params.id;
    const {
        title: sprintTitle,
        startdate: sprintStartDate,
        duedate: sprintDueDate,
        size: sprintSize
    } = req.body;

    const sprint = sprints.find(sprint => sprint.sprintid == sprintId);

    if (sprint) {
        Object.assign(sprint, {
            title: sprintTitle,
            startdate: sprintStartDate,
            duedate: sprintDueDate,
            size: sprintSize
        });

        console.log(sprint);

        return res.status(200).json({msg: `Edit sprint with id = ${sprintId} successfully!`});
    }

    return res.status(404).json({msg: `Sprint with id = ${sprintId} not found`});
}


////DELETE
export function removeSprintById(req, res) {
    const id = req.params.id;
    let sprintIdExisted = false;

    for (const sprint of sprints)
        if (sprint.sprintid == id)
            sprintIdExisted = true;

    if (!sprintIdExisted)
        return res.status(404).json({msg: "There is no such id in the sprints collection!"});

    console.log(`Id to remove: ${id}`)
    sprints = sprints.filter(sprint => sprint.sprintid != id);

    for (const sprint of sprints)
        if (sprint.sprintid == id)
            return res.status(500).json({msg: "Removing Procedure Failed!"});

    return res.status(200).json({msg: "Removing Procedure Succeeded!"});
}


