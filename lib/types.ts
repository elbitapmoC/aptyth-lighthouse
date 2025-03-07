export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}

export interface ButtonProps {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}
