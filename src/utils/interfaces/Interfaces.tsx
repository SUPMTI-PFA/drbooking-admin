import { JSXElementConstructor, ReactElement } from 'react'

export type LayoutType = { children: ReactElement<any, string | JSXElementConstructor<any>> | null }

export type SwitchAuthLinkProps = {
    message: string
    linkText: string
    to: string
    color?: string
}

// CONTEXTS
export interface AuthContextType {
    userToken:string|null;
    user: any;
    loading: boolean;
    login: (email: string, password: string, rememberMe:boolean) => void;
    logout: () => void;
    init:boolean,
    notificationToken: string
}

export type loginType = ( email: string, password: string ) => Promise<string>