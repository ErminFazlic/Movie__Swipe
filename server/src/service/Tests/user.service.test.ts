import {addUser, loginUser, addFriend, getFriends, deleteFriend} from './../service/user.service'


test("Add friend to empty friends list", () => {
    const UserService = new US.UserServices({});

    UserService.addUser("ermin@gmail.com","9999","ermino").then((user : User) => {
        const usertest : User = {id:user.id, email:"ermin@gmail.com", password:"9999", username:"ermino", liked:[], disliked:[], friends:[]};
        expect(user).toEqual(usertest);

    }).catch((e : any) => fail(e.message));

});
    
//User who registered is stored in the database
test('Register user', () => {
    const usertest : User = 
})

//Registered user can log in
test('User log in', () => {
    afterAll(() => {
        
    })
})

//User can add friend
test('User added friend', () => {
    afterAll(() => {

    })
})

//User can remove friend
test('User removed friend', () => {
    afterAll(() => {

    })
})