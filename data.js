import { nanoid } from "nanoid"

export const data = {
    boards: [
      {
        name: "Tutorial",
        id: nanoid(),
        isOpen: true,
        columns: [
          {
            name: "Todo",
            id: nanoid(),
            color: '#FFFFFF',
            isDelete: true,
            tasks: [
              {
                title: "Click me",
                description: "You can create custom tasks, add as many subtasks as you need, you can track the total amount of completed subtasks aswell.",
                id: nanoid(),
                isCurrentTask: false,
                status: "Todo",
                isDragging: false,
                subtasks: [
                  {
                    title: "Click the three dots in the right corner",
                    id: nanoid(),
                    isCompleted: false
                  },
                  {
                    title: "Once completed click the trash can",
                    id: nanoid(),
                    isCompleted: false
                  }
                ]
              },
              {
                title: "Lets create a custom task together!",
                description: "The first thing you need to do is have a look as the subtask list this will give you a breakdown of the steps you will need to take -- be sure to check off the subtasks once your done",
                id: nanoid(),
                isCurrentTask: false,
                isDragging: false,
                status: "Next",
                subtasks: [
                  {
                    title: "Step 1. Click the exit button",
                    id: nanoid(),
                    isCompleted: false
                  },
                  {
                    title: "Step 2. Click the plus button in the top right corner",
                    id: nanoid(),
                    isCompleted: false
                  },
                  {
                    title: "Step 3. Then fill in the details of your task!",
                    id: nanoid(),
                    isCompleted: false
                  },
                  {
                    title: "Step 4. Then click create and your done!",
                    id: nanoid(),
                    isCompleted: false
                  }
                ]
              }
            ]
          },
          {
            name: "Next",
            id: nanoid(),
            color: '#FFFFFF',
            isDelete: true,
            tasks: [
              {
              title: "Time to edit that task",
              description: "Now that you've just created your first task, it's time to make some changes. This is where you will be able to make changes to you tasks, add new subtasks and move the tasks around to there",
              id: nanoid(),
              isCurrentTask: false,
              isDragging: false,
              status: "Next",
              subtasks: [
                {
                  title: "Click the three dots in the right corner",
                  id: nanoid(),
                  isCompleted: false
                },
                {
                  title: "Make the changes you want",
                  id: nanoid(),
                  isCompleted: false
                }
              ]
            },
          ]
          },
          {
            name: "Later",
            id: nanoid(),
            color: '#FFFFFF',
            isDelete: false,
            tasks: [{
              title: "Create a new Kanban",
              description: "Getting tired of the tutorial and want to create your own board, click on the arrow on the top of the screen and just click create new board",
              id: nanoid(),
              isCurrentTask: false,
              status: "Later",
              isDragging: false,
              subtasks: [
                {
                  title: "Create new board",
                  id: nanoid(),
                  isCompleted: false
                },
                {
                  title: "Don't forget to pick your color for the column",
                  id: nanoid(),
                  isCompleted: false
                },
                {
                  title: "Come back once your done",
                  id: nanoid(),
                  isCompleted: false
                }
              ]
            },{
              title: "Need more columns",
              description: "You can edit the board that you've just created aswell if you need to. You can add more columns aswell as Change the column names and colors",
              id: nanoid(),
              isCurrentTask: false,
              isDragging: false,
              status: "Later",
              subtasks: [
                {
                  title: "Click the three dots on the top",
                  id: nanoid(),
                  isCompleted: false
                },
                {
                  title: "Go for it!",
                  id: nanoid(),
                  isCompleted: false
                }
              ]
            },
            {
              title: "It's time to grow up",
              description: "It's sad to see anyone go, but I think you can manage on your own at this point - so it's time to say goodbye",
              id: nanoid(),
              isCurrentTask: false,
              isDragging: false,
              status: "Later",
              subtasks: [
                {
                  title: "Click on the arrow on the top",
                  id: nanoid(),
                  isCompleted: false
                },
                {
                  title: "Click on the trash can",
                  id: nanoid(),
                  isCompleted: false
                },
                {
                  title: "Poof!!",
                  id: nanoid(),
                  isCompleted: false
                }
              ]
            },
          ]
          }
        ]
      }
    ]
  }