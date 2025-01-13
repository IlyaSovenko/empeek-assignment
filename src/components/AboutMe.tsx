import { useFormContext } from 'react-hook-form';

export default function AboutMe() {
  const {register, formState: {errors}} = useFormContext()
  
  return <label className="form-control">
    <div className="label">
      <span className="label-text">About me</span>
    </div>
    <textarea
      className="textarea textarea-bordered h-24 bg-white"
      placeholder="Bio"
      {...register("about", {required: "About info is required"})}
    />
    {errors.about && <p className='text-error mt-2 ml-4'>{errors.about.message as string}</p>}
  </label>
}
