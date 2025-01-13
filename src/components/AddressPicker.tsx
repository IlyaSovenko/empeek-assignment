import { useFormContext } from 'react-hook-form';

export default function AddressPicker() {
  const {register, formState: {errors}} = useFormContext()
  return <>
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Address</span>
      </div>
      <input
        type="text"
        placeholder="Your address"
        className="input input-bordered w-full bg-white"
        {...register("address", {required: "Address is required"})}
      />
    </label>
    {errors.address && <p className='text-error'>{errors.address.message as string}</p>}
    
    <div className="flex flex-row justify-between gap-2">
      <label className="form-control">
        <div className="label">
          <span className="label-text">City</span>
        </div>
        <input
          type="text"
          placeholder="Your city"
          className="input input-bordered w-full bg-white"
          {...register("city", {required: "City is required"})}
        />
        {errors.city && <p className='text-error'>{errors.city.message as string}</p>}
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">State</span>
        </div>
        <input
          type="text"
          placeholder="Your state"
          className="input input-bordered w-full bg-white"
          {...register("state", {required: "State is required"})}
        />
        {errors.state && <p className='text-error'>{errors.state.message as string}</p>}
        
      </label>
    </div>
    <label className="form-control w-28">
      <div className="label">
        <span className="label-text">Zip code</span>
      </div>
      <input
        type="number"
        placeholder="Zip code"
        className="input input-bordered w-full bg-white"
        {...register("zipcode", {required: "Zip code is required"})}
      />
      {errors.zipcode && <p className='text-error'>{errors.zipcode.message as string}</p>}
    </label>
  </>
}
