import Axios from "axios";
var axios = Axios.create({
  withCredentials: false
});


export default {
  uploadImg,
  uploadPictures
}
var uploadPreset = "ymcnebv4"
var cloudName = "dgvsdobz4"
var urlForAxios = `https://api.cloudinary.com/v1_1/${
  cloudName
  }/upload`;


function uploadImg(imgUrl) {
  const formData = new FormData();
  formData.append('file', imgUrl[0]);
  formData.append('upload_preset', uploadPreset);
  return new Promise((resolve, reject) => {
    console.log('AT SERVICE WITH FILE: ', formData)
    console.log('url for axios: ', urlForAxios)
    axios.post(urlForAxios, formData).then(res => {
      console.log('FROM AXIOS ', res)
      let url = res.data.secure_url
      console.log('AT IMG SERVICE ', url)
      resolve(url)
    });
  })
}





function uploadPictures(files) {
  // var apiKey = "757281885482997"

  let urls = []
  for (var i = 0; i < files.length; i++) {
    urls.push(files[i])
  }
  let uplodedUrls = []

  let prms = [];

  urls.forEach(file => {
    let prm = new Promise((reject, resolve) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      axios.post(urlForAxios, formData)
        .then(res => {
          console.log(res.data.secure_url)
          resolve(res.data.secure_url);
        }, err => {
          reject(err)
        });
    })
    console.log(prm._v)
    prms.push(prm._v)
  });
  // Promise.all(prms).then((values)=>{
  //   console.log(' OK ',values)
  // })
  // if (uplodedUrls.length === files.length) {
  //   console.log(uplodedUrls);
  //   return uplodedUrls
  // }
}