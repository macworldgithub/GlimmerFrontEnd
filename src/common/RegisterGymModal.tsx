"use client";
import { Modal, Form, Input, Button, message } from "antd";
import React from "react";

const RegisterGymModal = ({ visible, onCancel, onSubmit }: any) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    message.success("Our team will contact you soon!");

    setTimeout(() => {
      onSubmit(values);    
      form.resetFields();   
      onCancel();          
    }, 2000); 
  };

  return (
    <Modal
      title="Register Your Gym"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gym Name"
          name="gymName"
          rules={[{ required: true, message: "Please enter your gym name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Email (Optional)" name="email">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Send Request
        </Button>
      </Form>
    </Modal>
  );
};

export default RegisterGymModal;
