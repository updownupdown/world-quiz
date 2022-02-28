import clsx from "clsx";
import "./Toggle.scss";

export interface ToggleProps {
  label: string;
  isCurrent: boolean;
  onClick: () => void;
}

export interface ToggleGroupProps {
  label: string;
  children: React.ReactNode;
  isVertical?: boolean;
}

export const ToggleGroup = ({
  label,
  children,
  isVertical,
}: ToggleGroupProps) => {
  return (
    <div
      className={clsx(
        "toggle-group",
        isVertical ? "toggle-group--vertical" : "toggle-group--horizontal"
      )}
    >
      <span className="toggle-label">{label}</span>
      <div className="toggle-buttons">{children}</div>
    </div>
  );
};

export const Toggle = ({ label, isCurrent, onClick }: ToggleProps) => {
  return (
    <button
      className={clsx("toggle", isCurrent && "toggle--current")}
      onClick={() => {
        !isCurrent && onClick();
      }}
    >
      {label}
    </button>
  );
};
