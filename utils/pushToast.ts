import toast, { ToastOptions } from 'react-hot-toast'

const handleToast = (callback: any, message: any, options?: ToastOptions) => {
  toast.dismiss()
  callback(message, { ...options, duration: options?.duration ?? 3000 })
}

const pushToast = {
  success: (message: any, options?: ToastOptions) => {
    handleToast(toast.success, message, options)
  },
  error: (message: any, options?: ToastOptions) => {
    handleToast(toast.error, message, options)
  },
  emoji: (message: any, options?: ToastOptions) => {
    handleToast(toast, message, options)
  },
  custom: (message: any, options?: ToastOptions) => {
    handleToast(() => toast(message), message, options)
  },
}

export default pushToast