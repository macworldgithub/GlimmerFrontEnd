"use client";
import { Modal, Form, Input, Button, message, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

const RegisterGymModal = ({ visible, onCancel, onSubmit }: any) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    message.success("Our team will contact you soon!");
    setTimeout(() => {
      form.resetFields();
      onSubmit(values);
      onCancel();
    }, 2000);
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={520}
      centered
      bodyStyle={{ padding: "32px" }}
    >
      <div className="text-center mb-6">
        <Title level={3} style={{ marginBottom: "8px", color: "#1677ff" }}>
          Register Your Gym
        </Title>
        <Text type="secondary">Fill the form below and we'll contact you shortly.</Text>
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        size="large"
      >
        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input placeholder="+92 300 1234567" />
        </Form.Item>

        <Form.Item
          label="Gym Name"
          name="gymName"
          rules={[{ required: true, message: "Please enter your gym name" }]}
        >
          <Input placeholder="Alpha Fitness Club" />
        </Form.Item>

        <Form.Item label="Email (Optional)" name="email">
          <Input placeholder="you@example.com" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
           Send Request
        </Button>
      </Form>
    </Modal>
  );
};

export default RegisterGymModal;
