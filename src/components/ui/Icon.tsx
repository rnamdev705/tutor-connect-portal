type IconProps = {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
};

export function Icon({ name, className = "", filled = false, size }: IconProps) {
  const style = filled
    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
    : undefined;

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ ...style, fontSize: size ? `${size}px` : undefined }}
    >
      {name}
    </span>
  );
}
