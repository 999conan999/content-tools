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
  let arr_h2=[],arr_more=[]; // [todo]

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
export function render_content(tu_khoa_chinh,tu_khoa_ho_tro_chinh,key_phu,data_contents,main_content_RD) {
// console.log("🚀 ~ file: function.js ~ line 153 ~ render_content ~ main_content_RD", main_content_RD)
// console.log("🚀 ~ file: function.js ~ line 153 ~ render_content ~ data_contents", data_contents)
// console.log("🚀 ~ file: function.js ~ line 153 ~ render_content ~ key_phu", key_phu)
// console.log("🚀 ~ file: function.js ~ line 153 ~ render_content ~ tu_khoa_ho_tro_chinh", tu_khoa_ho_tro_chinh)
// console.log("🚀 ~ file: function.js ~ line 153 ~ render_content ~ tu_khoa_chinh", tu_khoa_chinh)
  // xu ly category
  let category=[];
  data_contents.category.forEach(e => {
      category.push(e.id)
  });
  // xu ly img_text (hinh dai dien - add text => return url)
  
}