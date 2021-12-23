const axios = require('axios');
var domain='https://cofa.vn'  

  export function url(type){
    if(type=='img'){
      //http://localhost/cofa/wp-content/plugins/addtool/core/rt-img.php?pass=VoThanhDanh_VTD&start_w=0
        return domain+'/wp-content/plugins/addtool/core/rt-img.php?pass=VoThanhDanh_VTD&';
    }else if(type=='category'){
      //http://localhost/cofa/wp-content/plugins/addtool/core/rt-category.php?pass=VoThanhDanh_VTD
      return domain+'/wp-content/plugins/addtool/core/rt-category.php?pass=VoThanhDanh_VTD';
    }else if(type=='createP'){
      //http://localhost/cofa/wp-content/plugins/addtool/core/createP.php
      return domain+'/wp-content/plugins/addtool/core/createP.php';
    }
  }



  export async function active_create_post_list(contents){
    for(let i=0;i<contents.length;i++) {
      let response=await active_post(contents[i])
      console.log(response)
    };
  }
  //
  async function active_post(content){
    return new Promise((resolve,reject)=>{
      let response= axios.post(url('createP'), 
      axqs(content))
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.log(error);
      });
      // setTimeout(()=>{
      resolve(response)
      // },2000);
    })
  }
  function axqs(d){
    let p = new URLSearchParams();
    Object.keys(d).forEach(function(key){
        p.append(key, this[key]);
    }, d);
    return p
}








  //
  export async function get_category(){
  let data= await axios.get(url('category'))
    .then(function (response) {
        // handle success
        return response.data
    })
    .catch(function (error) {
        // handle error
        return {
            data:[],
            leng:0
        }
    })
    .then(function (data) {
        return data;
      });
      return data;
  }
  export async function get_img_50(start=0){
  let data= await axios.get(url('img')+'start_w='+start)
    .then(function (response) {
        // handle success
        return response.data
    })
    .catch(function (error) {
        // handle error
        return {
            data:[],
            leng:0
        }
    })
    .then(function (data) {
        return data;
      });
      return data;
  }