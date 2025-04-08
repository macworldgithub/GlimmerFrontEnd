// components/RegisterGymModal.tsx
"use client";
import { Modal, Form, Input, Button } from "antd";
import React from "react";

const RegisterGymModal = ({ visible, onCancel, onSubmit }: any) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Register Your Gym"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
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

        <p className="text-center text-sm mb-4">Our team will contact you soon!</p>

        <Button type="primary" htmlType="submit" block>
          Send Reuqest
        </Button>
      </Form>
    </Modal>
  );
};

export default RegisterGymModal;
