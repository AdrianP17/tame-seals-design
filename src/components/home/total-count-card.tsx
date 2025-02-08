import { totalCountVariants } from "@/constants"
import { Card, Skeleton } from "antd"
import { Text } from "../text"
import { Area, AreaConfig } from "@ant-design/plots"

type Props = {
    resource: "companies" | "contacts" | "deals",
    isLoading: boolean,
    totalCount: number | undefined
}

function TotalCountCard({
    resource,
    isLoading,
    totalCount
} : Props) {
    const {primaryColor, secondaryColor, icon, title} = totalCountVariants[resource]
    const config: AreaConfig = {
        data: totalCountVariants[resource].data,
        xField: 'index',
        yField: 'value',
        padding: 0,
        tooltip: false,
        x: {
            
        },
        y: {
            tickCount: 12,
            label: {
                stroke: 'transparent'
            },
            grid: {
                line: {
                    stroke: 'transparent'
                }
            }
        },
        line: {
            color: primaryColor,
            size: 2
        },
        colorField: primaryColor,
        
    }

  return (
    <Card style={{ height: '96px', padding: 0, }} size="small">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            {icon}
            <Text size="md" style={{marginLeft: '8px'}} className="secondary">{title}</Text>
        </div>
        <div 
            style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Text size="xxxl" strong style={{flex: 1, whiteSpace: 'nowrap', textAlign: 'start', flexShrink: 0, marginLeft: '48px', fontVariantNumeric:'tabular-nums', fontWeight: '600' }}>
                {isLoading ?  (<Skeleton.Button />) : totalCount}
            </Text>
        <Area {...config} style={{width: '50%'}}  />
        </div>
    </Card>
  )
}
export default TotalCountCard