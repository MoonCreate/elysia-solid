import { For } from "solid-js";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#front/components/ui/sidebar";
import LucideHome from "lucide-solid/icons/home";
import LucideMail from "lucide-solid/icons/mail";
import LucideCalendar from "lucide-solid/icons/calendar";
import LucideSearch from "lucide-solid/icons/search";
import LucideSettings from "lucide-solid/icons/settings";
import { Link } from "@tanstack/solid-router";

const items = [
  {
    title: "Home",
    url: "/",
    icon: LucideHome,
  },
  {
    title: "Inbox",
    url: "/about",
    icon: LucideMail,
  },
  {
    title: "Calendar",
    url: "#",
    icon: LucideCalendar,
  },
  {
    title: "Search",
    url: "#",
    icon: LucideSearch,
  },
  {
    title: "Settings",
    url: "#",
    icon: LucideSettings,
  },
];

function AppSidebar() {
  return (
    <Sidebar class="border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={items}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton as={Link} to={item.url} href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export { AppSidebar };
