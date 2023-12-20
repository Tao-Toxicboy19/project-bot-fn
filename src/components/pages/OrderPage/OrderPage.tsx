import { useEffect } from "react";
import { useAppDispatch } from "../../../store/store";
import { ordersAsync, ordersSelector } from "../../../store/slices/orderSlice";
import { useSelector } from "react-redux";
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { ordersAddAsync } from "../../../store/slices/orderAddSlice";

type Props = {}

type FieldType = {
    symbol?: string
    timeframe?: string
    amount?: number
    leverage?: number
};

function AddOrder() {
    const dispatch = useAppDispatch()
    const onFinish = async (values: FieldType) => {
        try {
            await dispatch(ordersAddAsync(values))
        } catch (error) {
            console.log(error)
        }
        console.log('Success:', values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="symbol"
                name="symbol"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="timeframe"
                name="timeframe"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Please input the amount!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="leverage"
                            name="leverage"
                            rules={[{ required: true, message: 'Please input the symbol!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-primary"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}


export default function OrderPage({ }: Props) {
    const dispatch = useAppDispatch()
    const ordersReducer = useSelector(ordersSelector)
    useEffect(() => {
        dispatch(ordersAsync())
    }, [])

    return (
        <div
            className="container mx-auto"
        >
            <div
                className="grid grid-cols-3"
            >
                <div
                    className="col-span-2 bg-primary"
                >
                    {(ordersReducer.result).map((rows, index) => (
                        <div
                            key={rows.id}
                            className="flex flex-row justify-around gap-x-5 border-b-[1px]"
                        >
                            <span>{index + 1}</span>
                            <span>{rows.symbol}</span>
                            <span>{rows.timeframe}</span>
                            <span>{rows.status}</span>
                            <span>{rows.leverage}</span>
                            <span>{rows.amount}</span>
                            <span>{rows.price}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <AddOrder />
                </div>
            </div>
        </div>
    )
}