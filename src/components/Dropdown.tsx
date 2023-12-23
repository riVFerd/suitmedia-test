import {PageSize} from "@/models/article";

interface DropdownProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({children, id, className, onChange}: DropdownProps) {
  return (
    <select id={id} className={`rounded-3xl border border-gray-300 focus:border-primary focus:outline-none py-2 px-6 mx-4 cursor-pointer appearance-none ${className}`}
            onChange={onChange}>
      {children}
    </select>
  )
}