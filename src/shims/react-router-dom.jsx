'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter, useParams as useNextParams } from 'next/navigation';

export const Link = React.forwardRef(({ to, href, children, ...props }, ref) => {
  const target = to || href || '#';
  return (
    <NextLink ref={ref} href={target} {...props}>
      {children}
    </NextLink>
  );
});
Link.displayName = 'Link';

export const NavLink = React.forwardRef(({ to, href, className, children, ...props }, ref) => {
  const pathname = usePathname() || '/';
  const target = to || href || '#';
  const isActive = pathname === target || (target !== '/' && pathname.startsWith(target));
  const computedClass = typeof className === 'function' ? className({ isActive }) : className;
  return (
    <NextLink ref={ref} href={target} className={computedClass} {...props}>
      {children}
    </NextLink>
  );
});
NavLink.displayName = 'NavLink';

export const useLocation = () => {
  const pathname = usePathname() || '/';
  const [search, setSearch] = React.useState('');
  const [hash, setHash] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearch(window.location.search || '');
      setHash(window.location.hash || '');
    }
  }, [pathname]);

  return {
    pathname,
    search,
    hash,
    state: null,
    key: pathname,
  };
};

export const useNavigate = () => {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === 'number') {
      if (typeof window !== 'undefined') window.history.go(to);
    } else if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
};

export const useParams = () => {
  return useNextParams() || {};
};

export const Navigate = ({ to, replace }) => {
  const router = useRouter();
  React.useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);
  return null;
};

export const Routes = ({ children }) => <>{children}</>;
export const Route = ({ children, element }) => <>{element || children}</>;
export const Outlet = ({ children }) => <>{children}</>;
export const BrowserRouter = ({ children }) => <>{children}</>;

export default {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  Navigate,
  Routes,
  Route,
  Outlet,
  BrowserRouter,
};
