const express = require('express')
const router = express.Router()

const Task = require('../models/Tasks')

const getTask = async (req, res, next) => {
    let task
    try {
        task = await Task.findById(req.params.id)
        if(task === null){
            return res.status(404).json({ message: "Task not found" })
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
    res.task = task
    next()
}
router.get('/', async (req, res) => {
    try {
        // res.send("test")
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    // res.send("test")
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: false,
    })
    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', getTask, async (req, res) => {
    // res.send("test")
    if (req.body.title != null){
        res.task.title = req.body.title
    }
    if (req.body.description != null){
        res.task.description = req.body.description
    }

    try {
        const updatedTask = await res.task.save()
        res.status(200).json(updatedTask)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete("/:id", getTask, async (req, res) => {
    // res.send("test")
    try {
        const { id } = req.params.id
        await Task.deleteOne(id)
        res.json({ message: "Task removed "})
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router