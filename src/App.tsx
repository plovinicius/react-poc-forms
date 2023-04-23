import { useForm } from "react-hook-form";
import { object, string, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = object({
  name: string().required('Example custom message required').trim(),
  email: string().email().required().lowercase().trim(),
  subject: string().required(),
  otherSubject: string().when('subject', ([subject], schema) => {
    return subject === 'other' ? schema.required() : schema.optional();
  }).trim(),
  message: string().required().trim()
});

type FormType = InferType<typeof formSchema>;

function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormType>({
    resolver: yupResolver(formSchema),
  });
  const onSubmit = (data: unknown) => console.log(data);

  return (
    <section className="h-screen bg-slate-800">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="flex flex-col px-4 my-4">
          <label className="mb-2">Name</label>
          <input 
            type="text" 
            className="h-10 p-2 bg-gray-500 rounded-sm" 
            {...register('name')}
          />
          
          {errors.name 
            && <p 
              className="p-2 mt-1 text-xs text-white bg-red-500 rounded-sm" 
              role="alert"
            >{errors.name.message}</p>}
        </div>

        <div className="flex flex-col px-4 my-4">
          <label className="mb-2">Email</label>
          <input 
            type="text" 
            className="h-10 p-2 bg-gray-500 rounded-sm" 
            {...register('email')}
          />

          {errors.email 
            && <p 
              className="p-2 mt-1 text-xs text-white bg-red-500 rounded-sm" 
              role="alert"
            >{errors.email.message}</p>}
        </div>

        <div className="flex flex-col px-4 my-4">
          <label className="mb-2">Subject</label>
          <select 
            className="h-10 p-2 bg-gray-500 rounded-sm"
            {...register('subject')}
          >
            <option value="">Select a subject</option>
            <option value="suggestion">Suggestion</option>
            <option value="issue">Issue</option>
            <option value="other">Other</option>
          </select>

          {errors.subject
            && <p 
              className="p-2 mt-1 text-xs text-white bg-red-500 rounded-sm" 
              role="alert"
            >{errors.subject.message}</p>}
        </div>

        <div className="flex flex-col px-4 my-4">
          <label className="mb-2">Other subject</label>
          <input 
            type="text" 
            className="h-10 p-2 bg-gray-500 rounded-sm"
            {...register('otherSubject')}
          />

          {errors.otherSubject
            && <p 
              className="p-2 mt-1 text-xs text-white bg-red-500 rounded-sm" 
              role="alert"
            >{errors.otherSubject.message}</p>}
        </div>

        <div className="flex flex-col px-4 my-4">
          <label className="mb-2">Message</label>
          <textarea 
            className="h-32 p-2 bg-gray-500 rounded-sm resize-none"
            {...register('message')}
          ></textarea>

          {errors.message
            && <p 
              className="p-2 mt-1 text-xs text-white bg-red-500 rounded-sm" 
              role="alert"
            >{errors.message.message}</p>}
        </div>

        <div className="flex flex-col items-center px-4 my-4">
          <input 
            type="submit" 
            value="Submit" 
            disabled={isSubmitting}
            className="w-1/2 p-2 rounded-sm cursor-pointer bg-emerald-500"
          />
        </div>
      </form>
    </section>
  )
}

export default App
