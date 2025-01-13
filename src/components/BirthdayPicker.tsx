import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';

export default function BirthdayPicker() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const {register, setValue, formState: {errors}} = useFormContext()
  
  
  const handleDayPickerSelect = (date: Date) => {
    if (date) {
      setValue('birthday', format(date, "MM/dd/yyyy"));
      setSelectedDate(date)
    }
    setIsDialogOpen(false);
  };
  
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Birthday</span>
        </div>
        <input
          id="date-input"
          type="text"
          className="input input-bordered w-full max-w-xs bg-white"
          onClick={() => setIsDialogOpen(true)}
          aria-controls="dialog"
          aria-haspopup="dialog"
          aria-label="Open calendar to choose booking date"
          placeholder="Pick your birthday"
          {...register("birthday", {required: "Birthday is required"})}
        />
      </label>
      {errors.birthday && <p className='text-error'>{errors.birthday.message as string}</p>}
      {isDialogOpen && <DayPicker
        className="modal-box bg-white flex justify-center"
        required={true}
        mode="single"
        selected={selectedDate}
        onSelect={handleDayPickerSelect}
      />}
    </div>
  );
}
