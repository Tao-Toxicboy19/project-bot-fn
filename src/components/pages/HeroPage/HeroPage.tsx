import { motion } from "framer-motion"
import HeroImage from "../../../assets/images/hero.jpg"
import { FaArrowRight } from "react-icons/fa"
import { useState } from "react"
import { Button, Form, Input, Modal } from "antd"
import { useAppDispatch } from "../../../store/store"
import { loginAsync, loginSelector } from "../../../store/slices/loginSlice"
import { FieldType } from "../../../type/user.type"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


function FormLogin({ handleClose }: { handleClose: () => void }) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: FieldType) => {
    try {
      await dispatch(loginAsync(values))
      setIsSubmitting(true)
      navigate('/order')
      handleCancel()
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleCancel = () => {
    form.resetFields()
    handleClose()
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <div className="w-full flex justify-center gap-x-3">
            <Button
              onClick={handleCancel}
              className="w-2/4"
            >
              Cancel
            </Button>
            <Button
              className="w-2/4"
              htmlType="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Login
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

function ModalLogin() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const loginReducer = useSelector(loginSelector)
  const navigate = useNavigate()

  return (
    <>
      <button
        onClick={loginReducer.result?.accessToken ? () => navigate('/order') : handleOpen}
      >

        <motion.div
          className="bg-primaryText text-text hover:bg-divider hover:text-primaryText rounded-2xl flex my-auto px-5 pb-2 pt-1.5 text-xl group"
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
        >
          GET STARTED
          <span className="my-auto pl-2 text-lg pt-1 transition-transform group-hover:translate-x-3 duration-300 ">
            <FaArrowRight />
          </span>
        </motion.div>
      </button>

      <Modal
        title="login"
        centered
        open={open}
        footer={null}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <FormLogin handleClose={handleClose} />
      </Modal>
    </>
  );
}


export default function HeroPage() {

  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex justify-center mt-20">
        <div className="w-2/5">
          <div className="w-4/5 h-full mx-auto flex items-center">
            <div className="flex flex-col gap-y-5">
              <span className="text-2xl font-semibold tracking-wide">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, facere perspiciatis! Aut blanditiis eius, eveniet exercitationem officia neque reiciendis. Tempora.
              </span>
              <div className="my-auto">
                <ModalLogin />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-3/5">
          <img
            src={HeroImage}
            alt="hero"
          />
        </div>
      </div>
    </div>
  )
}