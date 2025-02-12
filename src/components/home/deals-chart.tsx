import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React, { useMemo } from 'react'
import { Text } from '../text'
import {Area, AreaConfig} from '@ant-design/plots'
import { useList } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'
import { mapDealsData } from '@/utilities/helpers'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { DashboardDealsChartQuery } from '@/graphql/types'

const DealsChart = () => {
  const {data} = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: 'dealStages',
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY
    }
  })
  const dealData = useMemo(() => {
    return mapDealsData(data?.data)
  }, [data?.data])
  const config : AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    stack: false,
    seriesField: 'state',
    chartType: 'area',
    legend: {
      offsetY: -6
    },
    axis: {
      y: {
        label: {
          formatter: (v:string) => {
            return `$ ${Number(v) /1000}k`
          }
        }
      }
    },
  }

  return (
    <Card
      style={{ height: '100%' }}
      title={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <DollarOutlined />
          <Text size='sm' style={{ marginLeft: '0.5rem' }}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325}  />
    </Card>
  )
}

export default DealsChart