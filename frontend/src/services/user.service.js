import Axios from "axios";

var axios = Axios.create({
  withCredentials: true
});

export default {
    // lorem,
    getCurrUser
}


const BASE_URL ='http://localhost:3003/api'

// function lorem(size = 5) {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

//     for (var i = 0; i < size; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
// console.log(text)
//     return text;
// }

function getCurrUser(){
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/users/current`)
            .then(res => {
                let user = res.data
                console.log('USER SERVICE:',user)
                 resolve(user)
            })
    })
}