import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {random_content,convert_string_to_array,render_content} from './function'
import IndexRight from './com-right/index-right'
import IndexLeft from './com-left/index-left'
import { Modal ,Button } from 'react-bootstrap';
// var _ = require('lodash');
class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data:{
                data_right:{
                    key_chinh:{
                        list_text_kc:'',
                        data_render:[
                            // {
                            //     key:'giuong sat',
                            //     text_ho_tro:'',
                            //     id:345
                            // }
                        ]
                    },
                    key_phu:[
                        // {
                        //     type:'key',
                        //     name:'giuong sat 2',
                        //     data:'',
                        //     id:'giuong_sat_2'
                        // },
                        // {
                        //     type:'img',
                        //     name:'hinh anh giuong sat 2',
                        //     id:'hinh_anh_giuong_sat_2',
                        //     data:[
                        //         {
                        //             id:1,
                        //             url:'https://randompicturegenerator.com/img/dog-generator/gfa5e497e0a411b8011b6351f400a904b852bc3db30faf7b686e1281f6c7b68b77dee05d40c569ec60415cfa768c4909e_640.jpg'
                        //         },
                        //         // {
                        //         //     id:2,
                        //         //     url:'https://i.picsum.photos/id/114/536/354.jpg?hmac=k0AFs1bPRXM6OHDPKMYMFT341dJlSiWBwF4mrwCtWcY'
                        //         // },
                        //         // {
                        //         //     id:3,
                        //         //     url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                        //         // },
                        //         // {
                        //         //     id:4,
                        //         //     url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                        //         // },
                        //         {
                        //             id:5,
                        //             url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                        //         },
                        //         {
                        //             id:6,
                        //             url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                        //         },
                        //         {
                        //             id:7,
                        //             url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                        //         },
                        //     ]
                        // }
                    ]
                },
                data_left:{
                    category:[
                        // {
                        //     id:35,
                        //     name:'giường sắt 1'
                        // },
                        // {
                        //     id:36,
                        //     name:'giường sắt 2'
                        // },
                        // {
                        //     id:37,
                        //     name:'giường sắt 3'
                        // },
                    ],
                    title:'',
                    img_text:'',
                    short_des:'',
                    price:'',
                    show_contact:false,
                    main_content:[
                        // {
                        //     type:'h2',
                        //     data:'đâ là thẻ H2'
                        // },
                        // {
                        //     type:'h3',
                        //     data:'đâ là thẻ H2'
                        // },
                        // {
                        //     type:'p',
                        //     data:'đâ là thẻ p'
                        // },
                        // {
                        //     type:'img',
                        //     data:'đâ là thẻ img'
                        // },
                        // {
                        //     type:'table',
                        //     data:'đâ là thẻ table'
                        // },
                    ]
                }
            },
            show:false
            
        }
     }

     click_tao_noi_dung=()=>{
        this.setState({
            show:true
        })
     }
     setShow(type){
         this.setState({
             show:type
         })
     }

    render() {
        let {data,show} =this.state;
        return (
            <div className='wrap-all'>
                <IndexLeft 
                    data_left={data.data_left}
                    sendChangeData_left={this.sendChangeData_left}
                    click_tao_noi_dung={this.click_tao_noi_dung}
                />
                <IndexRight
                    data_right={data.data_right}
                    sendChangeData_right={this.sendChangeData_right}
                />
                <Modal show={show} fullscreen={'lg-down'} onHide={() => this.setShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Xác nhận tạo nội dung ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Button variant="primary" id="button-addon1"  onClick={()=>this.click_xac_nhan_tao_noi_dung()}>Xác nhận</Button> {' '}                                     
                            <Button variant="secondary" id="button-addon1"  onClick={()=>this.setShow(false)}>Hủy</Button>                                       
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
    //
    sendChangeData_right=(data_right)=>{
        let {data}=this.state;
        data.data_right=data_right;
        this.setState({
            data:data
        })

    }
    sendChangeData_left=(data_left)=>{
        let {data}=this.state;
        data.data_left=data_left;
        this.setState({
            data:data
        })

    }

    // tao noi dung
    click_xac_nhan_tao_noi_dung=()=>{

        let {data} =this.state;
        this.setShow(false);
        let data_contents=data.data_left;
        let contents=[];
        let data_render=data.data_right.key_chinh.data_render;
        let data_final=[]
        data_render.forEach((e,i) => {
            let main_content_RD=random_content(data.data_left.main_content);
            let tu_khoa_chinh=e.key;
            let tu_khoa_ho_tro_chinh=convert_string_to_array(e.text_ho_tro);
            data_final.push(render_content(tu_khoa_chinh,tu_khoa_ho_tro_chinh,data.data_right.key_phu,data_contents,main_content_RD,data_render.length,i));
        });
        console.log("🚀 ~ file: App.js ~ line 166 ~ App ~ data_render.forEach ~ data_final", data_final)

    }


}

export default App;