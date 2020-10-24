import TaskListView from './TaskListView';

export {
    TaskListView
}

export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();

    var tasksReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');

    tasksReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach(function (element) {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);
            });
            listener(tasks);
        });
}


