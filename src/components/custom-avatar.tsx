import { getNameInitials } from "@/utilities"
import { Avatar as AntdAvatar } from "antd"
import { AvatarProps } from "antd/lib"

type Props = AvatarProps & {
    name?: string
}

const CustomAvatar = ({name, style, ...rest} : Props) => {
  return (
    <AntdAvatar
        alt={name}
        size={'small'}
        style={{ backgroundColor: '#87d068', verticalAlign: 'middle', ...style }}
        {...rest}
    >
        {getNameInitials(name || '')}
    </AntdAvatar>
  )
}

export default CustomAvatar