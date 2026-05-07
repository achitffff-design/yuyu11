import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden',
        hover && 'cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
