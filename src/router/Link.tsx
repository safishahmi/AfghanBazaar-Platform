import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useRouter } from './useRouter';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export default function Link({ to, onClick, target, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.defaultPrevented || isModified || event.button !== 0) return;
    if (target && target !== '_self') return;
    event.preventDefault();
    navigate(to);
  };

  return <a href={to} target={target} onClick={handleClick} {...rest} />;
}
