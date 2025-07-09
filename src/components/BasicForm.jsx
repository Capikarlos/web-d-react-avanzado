import { useForm } from 'react-hook-form'

export const BasicForm = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder='Usuario' />
      <input {...register('password')} type='password' placeholder='password' />
      <input {...register('confirmPassword')} type='password' placeholder='Confirmar contraseña' />
      <button type='submit'>Enviar</button>
    </form>
  )
}
