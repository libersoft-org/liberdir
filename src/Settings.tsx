import { createContext } from "react";

export interface Settings {
    proxy_server?: string;
}

export const SettingsContext = createContext<Settings | null>(null);
