var _ = require('lodash');
export function convert_string_to_array(data) {
    let result=replaceAll(((replaceAll(data,", ", ","))),'\n','').split(",");
    return result[0]==""?[]:result;
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
export function create_by_name(name) {
let result=replaceAll(removeAccents(name)," ", "_");
return result;
}
export function random_content(main_content){
  // phan tach cap 0 - phan tach the h2
  let main_content_0=[];
  main_content.forEach(e => {
      if(main_content_0.length==0){
          if(e.type=='h2'){
              main_content_0.push({
                  type:'h2',
                  title:e.data,
                  data:[]
              })
          }else{
              main_content_0.push(e)
          }
      }else{
          if(main_content_0[main_content_0.length-1].type=='h2'&&e.type!='h2'){
              main_content_0[main_content_0.length-1].data.push(e)
          }else if(main_content_0[main_content_0.length-1].type=='h2'&&e.type=='h2'){
              main_content_0.push({
                  type:'h2',
                  title:e.data,
                  data:[]
              })
          }else if(main_content_0[main_content_0.length-1].type!='h2'&&e.type=='h2'){
              main_content_0.push({
                  type:'h2',
                  title:e.data,
                  data:[]
              })
          }else{
              main_content_0.push(e)
          }
      }           
  });
  // radom h2
  let arr_h2=[],arr_more=[]; //

  main_content_0.forEach(e => {
      if(e.type=='h2'){
          arr_h2.push(e)
      }else{
          arr_more.push(e)
      }
  });

  arr_h2=_.sampleSize(arr_h2,arr_h2.length+1);
  // xu ly the h3
  let main_content_1=[];
  let data_final=[]
  arr_h2.forEach((item_h2,i) => {

      data_final.push({
      type: item_h2.type,
      data:item_h2.title
      })

      main_content_1=[];
      item_h2.data.forEach(e => {
          if(main_content_1.length==0){
              if(e.type=='h3'){
                  main_content_1.push({
                      type:'h3',
                      title:e.data,
                      data:[]
                  })
              }else{
                  main_content_1.push(e)
              }
          }else{
              if(main_content_1[main_content_1.length-1].type=='h3'&&e.type!='h3'){
                  main_content_1[main_content_1.length-1].data.push(e)
              }else if(main_content_1[main_content_1.length-1].type=='h3'&&e.type=='h3'){
                  main_content_1.push({
                      type:'h3',
                      title:e.data,
                      data:[]
                  })
              }else if(main_content_1[main_content_1.length-1].type!='h3'&&e.type=='h3'){
                  main_content_1.push({
                      type:'h3',
                      title:e.data,
                      data:[]
                  })
              }else{
                  main_content_1.push(e)
              }
          }          
      });
      
      //
      let arr_h3=[],arr_more_more=[]; // 
      main_content_1.forEach(e => {
          if(e.type=='h3'){
              arr_h3.push(e)
          }else{
              arr_more_more.push(e)
          }
      });
      arr_h3=_.sampleSize(arr_h3,arr_h3.length+1);
      let arr_h3_reback=[]
      arr_h3.forEach(e => {
          arr_h3_reback.push({
              type:e.type,
              data:e.title
          });
          arr_h3_reback=arr_h3_reback.concat(_.sampleSize(e.data,e.data.length+1))
      });

      let arr_h2_ok=arr_more_more.concat(arr_h3_reback);
      // arr_h2[i].data=arr_h2_ok;
      data_final=data_final.concat(arr_h2_ok)

  });
  return arr_more.concat(data_final);
}
//
export function render_content(tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu,data_contents,main_content_RD,leng,i) {

  // xu ly category
  let category=[]; //
  data_contents.category.forEach(e => {
      category.push(e.id)
  });
  // xu ly img_text (hinh dai dien - add text => return url)
  let text_img=data_contents.img_text;
  let list_img=find_key(key_phu,text_img);
  let thumnail_url='';//

  if(list_img.length>=leng||list_img.length<leng&&i<list_img.length){
      if(list_img[i].url!=undefined){
        thumnail_url=list_img[i].url;
      }
  }else{
      if(list_img[0]!=undefined){
        thumnail_url= _.sample(list_img).url;
      }

  }
  // xu ly gia price
  let text_price=data_contents.price;
  let price=xu_ly_gia(text_price); // 
  // xu ly mo ta ngan
  let short_des="<p>"+ xu_ly_content(data_contents.short_des,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu)+ "</p>";//
  // xu ly show contact
  let show_contact=data_contents.show_contact;
  // xu ly title
  let title=xu_ly_content(data_contents.title,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu);//
  // xu ly mo ta dai, main_content_RD
  let content='';//
  main_content_RD.forEach(e => {
      if(e.type=='h2'){
          content+='<h2>'+xu_ly_content(e.data,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu)+'</h2>';
      }else if(e.type=='h3'){
        content+='<h3>'+xu_ly_content(e.data,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu)+'</h3>';
      }if(e.type=='p'){
        content+='<p>'+xu_ly_content(e.data,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu)+'</p>';
      }if(e.type=='img'){
        content+=xu_ly_content(e.data,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu);
      }if(e.type=='table'){
        content+=xu_ly_content(e.data,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu);
      }
  });
  // xu ly tu khoa lien quan;
  let tu_khoa_lien_quan=tu_khoa_chinh;
  tu_khoa_ho_tro_chinh.forEach(e => {
      tu_khoa_lien_quan+=','+e;
  });
 return {
    category:category,
    thumnail_url:thumnail_url,
    price:price,
    content:content,
    title:title,
    short_des:short_des,
    show_contact:show_contact,
    tu_khoa_lien_quan:tu_khoa_lien_quan
 }
}
function xu_ly_content(text,tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu){ // outPut => chua add <p>
    let result_1=replaceAll(text,'tu_khoa_chinh', tu_khoa_chinh)
    let result_2=replaceAll(result_1,'tu_khoa_ho_tro_chinh', get_one_random_arr(tu_khoa_ho_tro_chinh));
    key_phu.forEach(e => {
        if(e.type=='img'){
            let xxx=get_one_random_arr(e.data);
            result_2=replaceAll(result_2,e.id, `<img title="${get_one_random_arr(tu_khoa_ho_tro_chinh)},${tu_khoa_chinh} " src="${xxx.url==undefined?'':xxx.url}">`);
        }else if(e.type=='key'){
            result_2=replaceAll(result_2,e.id, get_one_random_arr(convert_string_to_array(e.data)));
        }
    });
    return result_2;
}
function get_one_random_arr(arr){
    let result= _.sampleSize(arr,1)
    if(result.length==0){
        return '';
    }else{
        return result[0];
    }
    
}
function xu_ly_gia(text_price){// input text => out_put text
    let list_text=replaceAll(((replaceAll(text_price,"// ", "//"))),'\n','').split("//");
    let price='';
    list_text.forEach((e,i) => {
        if(e!=''){
            let list_price=replaceAll(((replaceAll(e,", ", ","))),'\n','').split(",")
            if(list_price.length==2){
                if(i===list_text.length-1){
                    price+=`<p>${list_price[0]},${parseFloat(_.random(0.000098, 0.00011)*Number(list_price[1])).toFixed(0)*10000}</p>
                    `
                }else{
                    price+=`<p>${list_price[0]},${parseFloat(_.random(0.000098, 0.00011)*Number(list_price[1])).toFixed(0)*10000}</p>`
                }
            }
        }
    });
    // 
    return price;
    
}
function find_key(key_phu,text_id){
    let i= _.findIndex(key_phu, function(o) { return o.id == text_id; })
    if(i!=-1){
        return key_phu[i].data;
    }else{
        return [];
    }

}
