"use client";

import Link from "next/link";
import { Avatar, Box, Container, DropdownMenu, Flex, Skeleton, Text } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";

import { cn } from "@/lib/utils";

export function NavBar() {
  return (
    <nav className="mb-5 border-b px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

const NavLink = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={cn("nav-link", link.href === currentPath && "!text-zinc-900")}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" className="mt-2" />;

  if (status === "unauthenticated") {
    return (
      <Text onClick={() => signIn("google")} className="hover:cursor-pointer">
        Login
      </Text>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session?.user?.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session?.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Text onClick={() => signOut()} className="hover:cursor-pointer">
              Log out
            </Text>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
