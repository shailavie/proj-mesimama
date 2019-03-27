import Axios from "axios";
var axios = Axios.create({
    withCredentials: false
});


export default{
    uploadImg
}

function uploadImg(file,urlForAxios){
    return new Promise((resolve, reject) => {
        console.log('AT SERVICE WITH FILE: ', file)
        console.log('url for axios: ',urlForAxios)
      axios.post(urlForAxios, file).then(res => {
        console.log('FROM AXIOS ',res)
          let url = res.data.secure_url
          console.log(url)
        resolve(url)
      });
    })
}