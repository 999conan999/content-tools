import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card ,Button,InputGroup,Accordion,FormControl,Form,Container,Row,Col,Image,Alert } from 'react-bootstrap';
class IndexLeft extends Component {



    constructor (props) {
        super(props)
        this.state = {
            category:[
                {
                    id:35,
                    name:'giường sắt 1',
                    is_check:false
                },
                {
                    id:36,
                    name:'giường sắt 2',
                    is_check:false
                },
                {
                    id:37,
                    name:'giường sắt 3',
                    is_check:false
                },
            ]
        }
     }


    render_category(category){
        let result=[];
        category.forEach((e,i) => {
            result.push(
                    <Form.Check type="checkbox" checked={e.is_check} onChange={()=>this.changeCheck(i)} label={`${e.name}`} inline={true} key={i} className='xxkk'/>
            )
        });
        return result;
    }
    //
    changeCheck(i){
        let {category}=this.state;
        category[i].is_check=!category[i].is_check;
        let data_report_category=[];
        category.forEach(e => {
            if(e.is_check){
                data_report_category.push({
                    id:e.id,
                    name:e.name
                })
            }
        });
        let {data_left}=this.props;
        data_left.category=data_report_category;
        this.props.sendChangeData_left(data_left);
        this.setState({
            category:category
        })
    }
    //
    changeContact(){
        let {data_left}=this.props;
        data_left.show_contact=!data_left.show_contact;
        this.props.sendChangeData_left(data_left);
    }
    //
    onChange_title(e){
        let {data_left}=this.props;
        data_left.title=e.target.value;
        this.props.sendChangeData_left(data_left);
    }
    //
    onChange_img_text(e){
        let {data_left}=this.props;
        data_left.img_text=e.target.value;
        this.props.sendChangeData_left(data_left);
    }
    //
    onChange_short_des(e){
        let {data_left}=this.props;
        data_left.short_des=e.target.value;
        this.props.sendChangeData_left(data_left);
    }
    //
    onChange_price(e){
        let {data_left}=this.props;
        data_left.price=e.target.value;
        this.props.sendChangeData_left(data_left);
    }


    /// main contents
    render_mainContent(main_content){
        let result=[];
        main_content.forEach((e,i) => {
            
            if(e.type=='h2'){
                result.push(
                <InputGroup className="mb-2" key={i}>
                    <InputGroup.Text>H2</InputGroup.Text>
                    <FormControl  placeholder="Tiêu đề thẻ H2"
                        value={e.data}
                        onChange={(e)=>this.changeMainData(e,i)}
                    />
                    <span className='xoa-h' onClick={()=>this.ClickDelete(i)}>Xóa</span>
                </InputGroup>)
            }else if(e.type=='h3'){
                result.push(
                <InputGroup className="mb-2" key={i}>
                    <InputGroup.Text>H3</InputGroup.Text>
                    <FormControl  placeholder="Tiêu đề thẻ H3"
                        value={e.data}
                        onChange={(e)=>this.changeMainData(e,i)}
                    />
                    <span className='xoa-h' onClick={()=>this.ClickDelete(i)}>Xóa</span>
                </InputGroup>)
            }else if(e.type=='p'){
                result.push(
                <InputGroup  className="mb-2" key={i}>
                    <InputGroup.Text>p</InputGroup.Text>
                    <FormControl as="textarea" aria-label="Nội dung thẻ p"  rows={4}  placeholder="Nội dung thẻ p"
                        value={e.data}
                        onChange={(e)=>this.changeMainData(e,i)}
                    />
                    <span className='xoa-h' onClick={()=>this.ClickDelete(i)}>Xóa</span>
                </InputGroup>)
            }else if(e.type=='table'){
                result.push(
                <InputGroup  className="mb-2" key={i}>
                    <InputGroup.Text>table</InputGroup.Text>
                    <FormControl as="textarea" aria-label="Nội dung thẻ p"  rows={6}  placeholder="code table"
                        value={e.data}
                        onChange={(e)=>this.changeMainData(e,i)}
                    />
                    <span className='xoa-h' onClick={()=>this.ClickDelete(i)}>Xóa</span>
                </InputGroup>)
            }else if(e.type=='img'){
                result.push(
                <div  className='add-img mb-2' key={i}>
                    <InputGroup>
                    <InputGroup.Text>img</InputGroup.Text>
                        <Form.Control type="text" placeholder="Mã hình ảnh" 
                            value={e.data}
                            onChange={(e)=>this.changeMainData(e,i)}
                        />
                    </InputGroup>
                    <span className='xoa-h' onClick={()=>this.ClickDelete(i)}>Xóa</span>
                </div>)
            }
            
        });
        return result;
    }

    // xu ly here
    changeMainData(e,i){
        let {data_left}=this.props;
        data_left.main_content[i].data=e.target.value;
        this.props.sendChangeData_left(data_left);
    }
    //
    ClickDelete(i){
        let {data_left}=this.props;
        data_left.main_content.splice(i, 1);
        this.props.sendChangeData_left(data_left);
    }
    //
    clickAdd(type){
        let {data_left}=this.props;
        data_left.main_content.push({
            type:type,
            data:''
        });
        this.props.sendChangeData_left(data_left);
    }


    render() {
        let {data_left}=this.props;
        let show_cate= this.render_category(this.state.category);
        let show_mainCointent=this.render_mainContent(data_left.main_content)
        return (
            <div className='wrap-left'>
                <h1 className='hd'>Khu vực soạn thảo</h1>
                <div className='wrap-work'>
                    <Accordion bsPrefix='ahihi'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className='hdbv' ><b>Lựa chọn Category :</b></Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3"  >
                                    {show_cate}
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header className='hdbv' ><b>Tiêu đề bài viết :</b></Accordion.Header>
                            <Accordion.Body>
                                <InputGroup>
                                    <Form.Control type="text" placeholder="Tiêu đề" 
                                        value={data_left.title}
                                        onChange={(e)=>this.onChange_title(e)}
                                    />
                                </InputGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header className='hdbv' ><b>Hình ảnh đại diện bài viết  :</b></Accordion.Header>
                            <Accordion.Body>
                                <InputGroup>
                                    <Form.Control type="text" placeholder="Mã hình ảnh" 
                                        value={data_left.img_text}
                                        onChange={(e)=>this.onChange_img_text(e)}
                                    />
                                </InputGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header className='hdbv' ><b>Mô tả ngắn :</b></Accordion.Header>
                            <Accordion.Body>
                                <InputGroup>
                                    <FormControl as="textarea" aria-label="Thêm mô tả ở đây"  rows={5}  placeholder="Mô tả ngắn" 
                                     value={data_left.short_des}
                                     onChange={(e)=>this.onChange_short_des(e)}
                                    />
                                </InputGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="5">
                            <Accordion.Header className='hdbv' ><b>Giá cả thuộc tính phụ thêm :</b></Accordion.Header>
                            <Accordion.Body>
                                <InputGroup  className="mb-2">
                                    <InputGroup.Text>Giá</InputGroup.Text>
                                    <FormControl as="textarea" aria-label="Từ khóa 1"  rows={2}  placeholder="điền kích thước và giá"
                                        value={data_left.price}
                                        onChange={(e)=>this.onChange_price(e)}
                                    />
                                </InputGroup>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="4">
                            <Accordion.Header className='hdbv' ><b>Nội dung chính  :</b></Accordion.Header>
                            <Accordion.Body>
                                
                                
                                
                                {show_mainCointent}
                                    

                                

                                <div className='menu-editer'>
                                    <Button variant="primary" size="sm" onClick={()=>this.clickAdd('h2')}>+ H2</Button>{' '}
                                    <Button variant="secondary" size="sm" onClick={()=>this.clickAdd('h3')}>+ H3</Button>{' '}
                                    <Button variant="success" size="sm" onClick={()=>this.clickAdd('p')}>+ p</Button>{' '}
                                    <Button variant="warning" size="sm" onClick={()=>this.clickAdd('img')}>+ img</Button>{' '}
                                    <Button variant="dark" size="sm" onClick={()=>this.clickAdd('table')}>+ table</Button>{' '}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        
                        <Accordion.Item eventKey="6">
                            <Accordion.Header className='hdbv' ><b>Liên hệ :</b></Accordion.Header>
                            <Accordion.Body>
                                <Form.Check type="checkbox"  checked={this.props.show_contact} onChange={()=>this.changeContact()}  label={`Không hiển thị liên hệ`} inline={true}  className='xxkk'/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='nd clearfix'>
                    <Button variant="primary" size="sm" onClick={()=>this.props.click_tao_noi_dung()}>Tạo nội dung</Button>{' '}
                    {/* <Button variant="secondary" size="sm">Save</Button>{' '} */}
                </div>
            </div>
            );
        }
    
    }
    
    export default IndexLeft;