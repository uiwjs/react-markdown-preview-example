import { Fragment, useEffect } from 'react';
import GitHubCorners from '@uiw/react-github-corners';
import styled from 'styled-components';
import { store, useStores, type NavMenuProps } from './store';
import { SupVersion } from './';
import { Logo as LogoIcon } from './Logo';

export function NavMenu(props: NavMenuProps) {
  useEffect(() => store.setNavMenu(props), [props]);
  return null;
}

interface NavMenuViewProps {
  disableDarkMode?: boolean;
  disableCorners?: boolean;
  logo?: JSX.Element | null;
  version?: string;
}

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  backdrop-filter: saturate(180%) blur(0.4rem);
  border-bottom: 1px solid var(--color-neutral-muted, #30363d);
  z-index: 99;
  top: 0;
  left: 0;
`;

const NavInner = styled.article`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 960px;
  margin: 0 auto;
  @media (min-width: 1024px) {
    max-width: 62rem;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  display: flex;
  color: var(--color-theme-text);
  align-items: center;
  height: 24px;
  padding: 10px 0;
  svg {
    width: 23px;
    height: 23px;
    margin: initial !important;
  }
`;

const Menus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  a {
    color: var(--color-fg-muted);
    text-decoration: none;
    transition: all 0.2s ease-in-out 0s;
    &:hover {
      color: var(--color-fg-default);
    }
  }
`;

const Title = styled.h2`
  font-weight: 900;
  font-size: 1.2em;
  margin: 0;
  margin-left: 0.55rem;
  white-space: nowrap;
`;

const GithubHref = styled.a`
  display: flex;
  align-items: center;
  color: var(--color-fg-default);
  svg {
    margin-top: 2px;
  }
`;

export function NavMenuView(props: NavMenuViewProps) {
  const { disableDarkMode, disableCorners, version, logo } = props;
  const store = useStores();
  if (store.navMenu) {
    return (
      <Nav>
        <NavInner>
          <Logo>
            {store.navMenu.logo || logo || LogoIcon}
            {store.navMenu.title && <Title>{store.navMenu.title}</Title>}
            {version && <SupVersion style={{ position: 'initial', marginTop: '-0.7.em' }}>{version}</SupVersion>}
          </Logo>
          <Menus>
            {store.navMenu.menus &&
              store.navMenu.menus.map((item, idx) => {
                return <Fragment key={idx}>{item}</Fragment>;
              })}
            {!disableCorners && (
              <GithubHref href={store.corners.href} target="_blank" rel="noopener noreferrer">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="18px"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </GithubHref>
            )}
            {!disableDarkMode && <dark-mode permanent style={{ fontSize: 19 }} {...store.darkMode}></dark-mode>}
          </Menus>
        </NavInner>
      </Nav>
    );
  }
  return (
    <Fragment>
      {!disableDarkMode && (
        <dark-mode
          permanent
          style={{ position: 'fixed', top: 8, left: 12, zIndex: 99, fontSize: 28 }}
          {...store.darkMode}
        ></dark-mode>
      )}
      {!disableCorners && <GitHubCorners fixed target="__blank" zIndex={10} {...store.corners} />}
    </Fragment>
  );
}
