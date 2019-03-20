
// import taskService from '../../services/task-service.js'


// export default storeTasks

// const storeTasks = ({
//   state: {
//     tasksItems: [],
//     filterBy: {},
//     currTask: null,
//   },
//   mutations: {
//     setTaskItems(state, { taskItems }) {
//         state.taskItems = taskItems
//       },
//   },
//   actions: {
//     loadTaskItems(context) {
//         // const filterBy = context.getters.getCurrentFilter
//         return taskService.query()
//           .then(taskItems => {
//               console.log('tasks:', taskItems)
//             context.commit({ type: 'setTaskItems', taskItems })
//             console.log('in loadTaskItems')
//             return taskItems
//           })
//       },
//   },
//   getters: {
//     getFilteredTasks(state){
//         console.log('in getters:')
//         return state.tasksItems
//     }
//   }
// })
