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
    axios.post(urlForAxios, formData).then(res => {
      let url = res.data.secure_url
      resolve(url)
    });
  })
}





function uploadPictures(files) {
  let urls = []
  for (var i = 0; i < files.length; i++) {
    urls.push(files[i])
  }
  let prms = [];

  urls.forEach(file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    prms.push(new Promise((resolve, reject) => {
      axios.post(urlForAxios, formData).then(res => {
        let url = res.data.secure_url
        resolve(url)
        // prms.push(url)
        console.log(prms)
      });
    }))
  });

  return Promise.all(prms)
  .then((res)=>{
    console.log(res)
    return res
  })
}
// function uploadPictures(files) {
//   let urls = []
//   for (var i = 0; i < files.length; i++) {
//     urls.push(files[i])
//   }
//   let prms = [];

//   urls.forEach(file => {
//     let prm = new Promise((reject, resolve) => {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', uploadPreset);
//       axios.post(urlForAxios, formData)
//         .then(res => {
//           resolve(res.data.secure_url);
//         }, err => {
//           reject(err)
//         });
//     })
//     prms.push(prm._v)
//   });
// }

