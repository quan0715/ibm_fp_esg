import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LuFileEdit, LuTrash } from "react-icons/lu";

function EditButton({
  label = "",
  isDisabled = false,
  isHidden = false,
  onClick,
  className,
}: {
  label?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      hidden={isHidden}
      disabled={isDisabled}
      size={label.length > 0 ? "default" : "icon"}
      variant="outline"
      className={cn(
        "flex flex-row justify-center items-center space-x-2",
        className
      )}
      onClick={onClick}
    >
      <LuFileEdit />
      {label ? label : null}
    </Button>
  );
}

function DeleteButton({
  label = "",
  isDisabled = false,
  isHidden = false,
  onClick,
  className,
}: {
  label?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Button
      hidden={isHidden}
      disabled={isDisabled}
      size={label.length > 0 ? "default" : "icon"}
      variant="outline"
      className={cn(
        "flex flex-row justify-center items-center space-x-2 text-destructive hover:bg-destructive hover:text-white",
        className
      )}
      onClick={onClick}
    >
      <LuTrash />
      {label ? label : null}
    </Button>
  );
}

export { EditButton, DeleteButton };
