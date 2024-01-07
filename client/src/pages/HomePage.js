import React, {useState, useEffect} from 'react';
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Analytics from '../components/Analytics' 

const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal,setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransaction, setAllTransaction] = useState([]);
    const [frequency, SetFrequency] = useState('30');
    const [selectedDate, setSelecteddate] = useState([]);
    const [type, setType] = useState('all');
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);

    //table data
    const columns = [
        {
            title: "Date",
            dataIndex:'date',
            render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: "Amount",
            dataIndex:'amount'
        },
        {
            title: "Type",
            dataIndex:'type'
        },
        {
            title: "Category",
            dataIndex:'category'
        },
        {
            title: "Refrence",
            dataIndex:'refrence'
        },
        {
            title: "Actions",
            render: (text, record) =>(
                <div>
                    <EditOutlined onClick={() => {
                        setEditable(record)
                        setShowModal(true)
                    }} />
                    <DeleteOutlined className="mx-2" onClick={() => {handleDelete(record)}}/>
                </div>
            ),
        },
    ];

    //getall transactions
    

    //useEffect Hook
    useEffect(() => {
        const getAllTransactions = async () => { 
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            const res = await axios.post("/transactions/get-transaction", { userid: user._id, frequency, selectedDate, type});
            setLoading(false);
            setAllTransaction(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
            message.error("Ftech Issue With Tranction");
        }
    };
        getAllTransactions();
    }, [frequency, selectedDate, type])

    //handle delete
    const handleDelete = async (record) => {
        try {
            setLoading(true);
            await axios.post("/transactions/delete-transaction", {transactionId:record._id})
            setLoading(false);
            window.location.reload();
            message.success("Transaction Deleted")
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Ftech Issue With Tranction");
        }
    }

    //form handling
    const handleSubmit = async (value) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true)
            if(editable){
                await axios.post('/transactions/edit-transaction', {payload: {...value, userid: user._id,}, transactionId: editable._id,});
                setLoading(false)
                window.location.reload();
                message.success('Transaction Edited Successfully')
            }else{
                await axios.post('/transactions/add-transaction', {...value, userid:user._id})
                setLoading(false)
                window.location.reload();
                message.success('Transaction Added Successfully')
            }
            setShowModal(false)
            setEditable(null)
        } catch (error) {
            setLoading(false)
            message.error('Failed To Add Transaction')
        }
    }
    return (
        <Layout>
            <div className='homePage-Loading'>
                {loading && <Spinner />}
            </div>
            <div className='filters'>
                <div>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(value) => SetFrequency(value)}>
                        <Select.Option value="7">Last 1 Week</Select.Option>
                        <Select.Option value="30">Last 1 Month</Select.Option>
                        <Select.Option value="365">Last 1 Year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                    {frequency === "custom" && (
                        <RangePicker value={selectedDate} onChange={(values) => setSelecteddate(values)} />
                    )}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(value) => setType(value)}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="Income">Income</Select.Option>
                        <Select.Option value="Expense">Expense</Select.Option>
                    </Select>
                </div>
                <div className="switched-icons">
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon':'inactive-icon'}`} 
                    onClick={(values) => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon':'inactive-icon'}`}  onClick={(values) => setViewData('analytics')} />
                </div>
                <div>
                    <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add New</button>
                </div>
            </div>
            <div className='content-table'>
                {viewData === "table" ? (
                 <Table columns={columns} dataSource={allTransaction} />
                ) : ( <Analytics allTransaction={allTransaction}/>
                )}
            </div>
            <Modal title={editable ? "Edit Transaction" : "Add Transaction"} open={showModal} onCancel={() => setShowModal(false)} footer={false}>
                <Form Layout="vertical" onFinish={handleSubmit} initialValues={editable}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" ></Input>
                    </Form.Item>
                    <Form.Item label="type" name="type">
                        <Select>
                            <Select.Option value="Income">Income</Select.Option>
                            <Select.Option value="Expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="Bills">Bills</Select.Option>
                            <Select.Option value="Cashback">Cashback</Select.Option> 
                            <Select.Option value="Fee">Fee</Select.Option> 
                            <Select.Option value="Food">Food</Select.Option>
                            <Select.Option value="Medical">Medical</Select.Option>
                            <Select.Option value="Movie">Movie</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                            <Select.Option value="Picnic">Picnic</Select.Option>
                            <Select.Option value="Project">Project</Select.Option>
                            <Select.Option value="Salary">Salary</Select.Option>
                            <Select.Option value="Shares Buy">Shares Buy</Select.Option>
                            <Select.Option value="Shares Sell">Shares Sell</Select.Option>
                            <Select.Option value="Tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Reference" name="refrence">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className='btn btn-primary'>SAVE</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePage