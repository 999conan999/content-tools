import React, { Component } from 'react';
import {convert_string_to_array,create_by_name} from '../function'
import ReactDOM from 'react-dom';
import { Card ,Button,InputGroup,Accordion,FormControl,Form,Container,Row,Col,Image,Modal,ToastContainer ,Toast } from 'react-bootstrap';
class IndexRight extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data_right:{
                key_chinh:{
                    list_text_kc:'',
                    data_render:[]
                },
                key_phu:[]
            },
            add_key:'',
            add_img_name:'',
            //
            show:false,
            id_set:0,
            data_img:[],
            list_img:[
                {
                    id:1,
                    url:'https://randompicturegenerator.com/img/dog-generator/gfa5e497e0a411b8011b6351f400a904b852bc3db30faf7b686e1281f6c7b68b77dee05d40c569ec60415cfa768c4909e_640.jpg'
                },
                {
                    id:2,
                    url:'https://i.picsum.photos/id/114/536/354.jpg?hmac=k0AFs1bPRXM6OHDPKMYMFT341dJlSiWBwF4mrwCtWcY'
                },
                {
                    id:3,
                    url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                },
                {
                    id:4,
                    url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                },
                {
                    id:5,
                    url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                },
                {
                    id:6,
                    url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                },
                {
                    id:7,
                    url:'https://i.picsum.photos/id/996/536/354.jpg?hmac=55RwV4siZL4WLqdMZl_0WkX-antm68uyZ3TczK3DZXY'
                },
            ],
            //
            show_toast:false
        }
     }

     componentDidMount(){
        //  this.setState({
        //      data_right:this.props.data_right
        //  })
     }

     // xu ly tu khoa chinh o day
     onChange_text_tu_khoa_chinh (e) {
        let {data_right}=this.props;
        data_right.key_chinh.list_text_kc=e.target.value;
        // this.setState({
        //     data_right:data_right
        // })
        this.props.sendChangeData_right(data_right);
    }
    //
    click_render(){
        let {data_right}=this.props;
        let list_text_kc=data_right.key_chinh.list_text_kc;
        let list_key_chinh= convert_string_to_array(list_text_kc);
        let data_render=[];
        list_key_chinh.forEach(e => {
            data_render.push({
                key:e,
                text_ho_tro:'',
                id:create_by_name(e)
            })
        });
        data_right.key_chinh.data_render=data_render;
        // this.setState({
        //     data_right:data_right
        // })
        this.props.sendChangeData_right(data_right);
    }
    //
    show_key_ho_tro(data_render){
        let result=[];
        data_render.forEach((data,i) => {
            result.push(
            <InputGroup  className="mb-2" key={i}>
                <InputGroup.Text>{data.key}</InputGroup.Text>
                <FormControl value={data.text_ho_tro} onChange={(e)=>this.onChange_text_tu_khoa_ho_tro(e,i)} as="textarea" aria-label="Từ khóa 3"  rows={2}  placeholder="Danh sách từ khóa hỗ trợ từ khóa chính" />
            </InputGroup>)
        });
        return result;
    }
    //
    onChange_text_tu_khoa_ho_tro(e,i){
        let  {data_right}=this.props;
        data_right.key_chinh.data_render[i].text_ho_tro=e.target.value;
        // this.setState({
        //     data_right:data_right
        // })
        this.props.sendChangeData_right(data_right);
    }
    


    // xu ly tu khoa phu
    show_key_tu_khoa_phu(key_phu){
        let result=[];
        key_phu.forEach((data,i) => {
            if(data.type=='key'){
                result.push(
                    <InputGroup key={i}  className="mb-2">
                        <InputGroup.Text>{data.name}</InputGroup.Text>
                        <FormControl as="textarea" value={data.data}  onChange={(e)=>this.onChange_text_tu_khoa_phu(e,i)} aria-label="Danh sách từ khóa chính"  rows={5}  placeholder="key" />
                        <span className='xoa-h' onClick={()=>this.Action_Detele(i)}>Xóa</span>
                        <span className='coppy-x-x'  onClick={()=>this.fs_copy(data.id)}>Copy</span>
                        {/* <span className='coppy-x-x-x'>đã copy</span> */}
                    </InputGroup>
                )
            }else if(data.type=='img'){
                
                result.push(
                <div key={i}  className='add-img-3'>
                    <span className='name-avatar1'>{data.name}</span>
                    <Row>
                        {this.show_img(data.data,i)}
                        <div className='add-imgxx' onClick={() => this.setAddShow(data.data,i)}>+ Add</div>
                    </Row>
                    <span className='xoa-h' onClick={()=>this.Action_Detele(i)}>Xóa</span>
                    <span className='coppy-x-x'  onClick={()=>this.fs_copy(data.id)}>Copy</span>
                    {/* <span className='coppy-x-x-x'>đã copy</span> */}
                </div>)
            }
        });
        return result;
    }
    //
    onChange_text_tu_khoa_phu(e,i){
        let {data_right}=this.props;
        data_right.key_phu[i].data=e.target.value;
        this.props.sendChangeData_right(data_right);
    }
    Action_Detele(i){
        let {data_right}=this.props;
        data_right.key_phu.splice(i, 1);
        this.props.sendChangeData_right(data_right);
    }
    show_img(data,i){
        let result=[];
        data.forEach((e,j) => {
            result.push(
                <Col key={j} xs={2} md={2} className='rela'>
                    <Image src={e.url} thumbnail />
                    <span className='xoa-h' onClick={()=>this.xoa_img(i,j)}>Xóa</span>
                </Col>
            )
        });
        return result;
    }
    xoa_img(i,j){
        let {data_right}=this.props;
        data_right.key_phu[i].data.splice(j, 1);
        this.props.sendChangeData_right(data_right);
    }
    setAddShow(data,i){
        let {list_img}=this.state;
        list_img.forEach((e,i) => {
            list_img[i].status=false;
            data.forEach(ee => {
                if(e.id==ee.id){
                    list_img[i].status=true;
                }
            });
        });
        this.setState({
            show:true,
            data_img:list_img,
            id_set:i
        })
    }
    // Modal 
    show_data_modal(data_img){
        let result=[];
        data_img.forEach((data,i) => {
            result.push(
            <div key={i} className={data.status?'img-dd activedd':'img-dd'}>
                 <img  className='img-xx' src={data.url} onClick={()=>this.chooseImg(i)} />
            </div>)
        });
        return result;
    }
    //
    chooseImg(i){
        let {data_img}=this.state;
        data_img[i].status=!data_img[i].status
        this.setState({
            data_img:data_img
        })
    }
    //
    clickOkImg(){
        let {data_img,id_set}=this.state;
        let data=[];
        data_img.forEach(e => {
            if(e.status){
                data.push({
                    id:e.id,
                    url:e.url
                })
            }
        });
        let {data_right}=this.props;
        data_right.key_phu[id_set].data=data;
        this.props.sendChangeData_right(data_right);
        this.setShow(false)

    }

// click them tu khoa
onChange_add_key(e){
    this.setState({
        add_key:e.target.value
    })
}
onChange_add_img_name(e){
    this.setState({
        add_img_name:e.target.value
    })
}
clickAdd(status){
    let {data_right}=this.props;
    if(status){
        let {add_key}=this.state;
        if(add_key!=''){
            data_right.key_phu.push({
                type:'key',
                name:add_key,
                data:'',
                id:create_by_name(add_key)
            })
            this.props.sendChangeData_right(data_right);
            this.setState({
                add_key:''
            })
        }
    }else{
        let {add_img_name}=this.state;
        if(add_img_name!=''){
            data_right.key_phu.push({
                type:'img',
                name:add_img_name,
                data:[],
                id:create_by_name(add_img_name)
            })
            this.props.sendChangeData_right(data_right);
            this.setState({
                add_img_name:''
            })
        }
    }
}
//
setShow(status){
    this.setState({
        show:status
    })
}
//
fs_copy(text){
    navigator.clipboard.writeText(text);
    this.setState({
        show_toast:true
    })
    setTimeout(()=>{
        this.setState({
            show_toast:false
        })
    },3000)
}

    render() {
        var {data_right}=this.props;
        var {show,data_img,show_toast}=this.state;
        let show_img_modal=this.show_data_modal(data_img)
        // console.log("🚀 ~ file: index-right.js ~ line 53 ~ IndexRight ~ render ~ data_right", data_right)
        let key_ho_tro=  this.show_key_ho_tro(data_right.key_chinh.data_render)
        let show_key_phu=this.show_key_tu_khoa_phu(data_right.key_phu)
        return (
            <div className='wrap-right'>
                {show_toast&&<ToastContainer position="top-end" className="p-3" >
                    <Toast  bg='Secondary'>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Đã copy</strong>
                            <small className="text-muted">just now</small>
                        </Toast.Header>
                        <Toast.Body>Copy rồi đó, làm gì làm đi!.</Toast.Body>
                    </Toast>
                </ToastContainer>}
                <h1 className='hd'>Văn bản thay thế</h1>
                <div  className="mb-2">
                    <Button variant="secondary" id="button-addon1" onClick={()=>this.fs_copy('tu_khoa_chinh')}>
                        Copy từ khóa chính
                    </Button>{' '}
                    <Button variant="secondary" id="button-addon1"  onClick={()=>this.fs_copy('tu_khoa_ho_tro_chinh')}>
                        Copy từ khóa hỗ trợ
                    </Button>
                </div>
                <Accordion bsPrefix='ahihi' defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className='hdbv' ><b>Từ khóa chính :</b> </Accordion.Header>
                        <Accordion.Body>
                            
                            <InputGroup  className="mb-2">
                                <InputGroup.Text>Nhập từ khóa chính</InputGroup.Text>
                                <FormControl as="textarea" value={data_right.key_chinh.list_text_kc}  rows={5}  placeholder="Danh sách từ khóa chính" onChange={(e)=>this.onChange_text_tu_khoa_chinh(e)}/>
                            </InputGroup>
                            <div className='nd'>
                                <Button variant="primary" size="sm"  className="mb-2" onClick={()=>{this.click_render()}}>Render</Button>{' '}
                            </div>             
                            {key_ho_tro}
                        </Accordion.Body>

                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header className='hdbv' ><b>Từ khóa Phụ :</b></Accordion.Header>
                        <Accordion.Body>
                            <div>
                                {show_key_phu}
                            </div>
                            <div className='menu-editer-2'>
                                <InputGroup className="mb-3">
                                    
                                    <FormControl
                                        aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"
                                        placeholder="Tên nhóm từ khóa phụ" 
                                        value={this.state.add_key}
                                        onChange={(e)=>this.onChange_add_key(e)}
                                    />
                                    <Button variant="primary" id="button-addon1" onClick={()=>this.clickAdd(true)}>
                                    Thêm
                                    </Button>
                                </InputGroup>
                                
                                <InputGroup className="mb-3">
                                    
                                    <FormControl
                                    aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    placeholder="Tên nhóm hình ảnh" 
                                    value={this.state.add_img_name}
                                    onChange={(e)=>this.onChange_add_img_name(e)}
                                    />
                                    <Button variant="primary" id="button-addon1"  onClick={()=>this.clickAdd(false)}>
                                    + Hình ảnh
                                    </Button>
                                </InputGroup>
                                
                                
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Modal show={show} fullscreen={'lg-down'} onHide={() => this.setShow(false)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Chọn hình ảnh</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                           {show_img_modal}
                           <div className='okok'>
                            <Button variant="primary" id="button-addon1"  onClick={()=>this.clickOkImg()}>
                             ____ Ok ____
                            </Button>
                           </div>
                          
                    </Modal.Body>
                </Modal>
            </div>
            );
        }

    
    }
    
    export default IndexRight;