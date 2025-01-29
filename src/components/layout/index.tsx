import { ThemedLayoutV2, ThemedTitle, ThemedTitleV2 } from "@refinedev/antd"
import Header from "./header"
import { ReactNode } from "react"

const Layout = ({children} : React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2 
    Header={Header}
    Title={(titleProps) => <ThemedTitleV2 {...titleProps} text="Tame Seals Design" />}
    >
        {children}
    </ThemedLayoutV2>
  )
}

export default Layout