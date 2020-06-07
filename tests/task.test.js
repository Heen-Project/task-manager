const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { 
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo, 
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase);

test('[Success] create task for user', async () => {
    const response = await request(app).post('/tasks')
        .set('Authorization',  `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Brand new task'
        }).expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});

test('[Success] fetch specific user tasks', async () => {
    const response = await request(app).get('/tasks')
        .set('Authorization',  `Bearer ${userOne.tokens[0].token}`)
        .send().expect(200);
    expect(response.body.length).toEqual(2);
});

test('[Failed] delete other user task', async () => {
    const response = await request(app).delete(`/tasks/${taskOne._id}`)
        .set('Authorization',  `Bearer ${userTwo.tokens[0].token}`)
        .send().expect(404);
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});

//
// Remaining Task Test 
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks