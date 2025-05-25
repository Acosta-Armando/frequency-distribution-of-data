import toast, { ToastOptions } from 'react-hot-toast'

const pushToast = {
  success: (message: any, options?: ToastOptions) => {
    toast.dismiss()
    toast.success(message, { ...options, duration: options?.duration ?? 3000 })
  },
  error: (message: any, options?: ToastOptions) => {
    toast.dismiss()
    toast.error(message, { ...options, duration: options?.duration ?? 3000 })
  },
  emoji: (message: any, options?: ToastOptions) => {
    toast.dismiss()
    toast(message, { ...options, duration: options?.duration ?? 3000 })
  },
  custom: (message: any, options?: ToastOptions) => {
    toast.dismiss()
    toast(() => message, { ...options, duration: options?.duration ?? 3000 })
  },
}

export default pushToast