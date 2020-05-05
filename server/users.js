// Used for user managment

const user = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const exisitngUser = users.find(user => user.room === room && user.name === name);

    if(exisitngUser){
        return {error: "Username is taken"};
    }

    const newUser = {id, name, room};

    users.push(newUser);

    return {user}
}

const removeUser = () => {

}

const getUsersInRoom = () => {

}