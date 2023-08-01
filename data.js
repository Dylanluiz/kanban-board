import { nanoid } from "nanoid"

export const data = {
    boards: [
      {
        name: "Roadmap",
        id: nanoid(),
        isOpen: false,
        columns: [
          {
            name: "Now",
            id: nanoid(),
            color: '#FFF',
            tasks: [
              {
                title: "Launch version one",
                description: "",
                id: nanoid(),
                isCurrentTask: false,
                status: "",
                subtasks: [
                  {
                    title: "Launch privately to our waitlist",
                    id: nanoid(),
                    isCompleted: false
                  },
                  {
                    title: "Launch publicly on PH, HN, etc.",
                    id: nanoid(),
                    isCompleted: false
                  }
                ]
              },
              {
                title: "Review early feedback and plan next steps for roadmap",
                description: "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
                id: nanoid(),
                isCurrentTask: false,
                status: "Next",
                subtasks: [
                  {
                    title: "Interview 10 customers",
                    id: nanoid(),
                    isCompleted: false
                  },
                  {
                    title: "Review common customer pain points and suggestions",
                    id: nanoid(),
                    isCompleted: false
                  },
                  {
                    title: "Outline next steps for our roadmap",
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
            color: '#FFF',
            tasks: []
          },
          {
            name: "Later",
            id: nanoid(),
            color: '#FFF',
            tasks: []
          }
        ]
      }
    ]
  }