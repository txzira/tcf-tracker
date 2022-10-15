export const FloatingInput = ({
  name,
  id,
  value,
  label,
  onChange,
}: {
  name: string;
  id: string;
  value: string;
  label: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <div className="relative my-4 w-1/3">
    <input
      className="block w-full py-2.5 px-0 text-sm bg-transparent border-b-2 appearance-none focus:outline-none focus:border-blue-600 peer  "
      type="text"
      name={name}
      id={id}
      value={value}
      placeholder=" "
      onChange={(event) => onChange(event.target.value)}
    />
    <label className="absolute top-3 -z-10 text-sm scale-75 text-gray-500 duration-300 transform -translate-y-6 origin-[0] peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:text-blue-600">
      {label}
    </label>
  </div>
);
