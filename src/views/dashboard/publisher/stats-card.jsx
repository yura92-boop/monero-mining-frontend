import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Proptypes from 'prop-types'
import { TrendingUp, TrendingDown, User, Box, DollarSign } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Media,
  Spinner,
} from 'reactstrap'

import Avatar from '@components/avatar'
import { getAppStats } from './store/action'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'

const StatsCard = ({ className }) => {
  // const appStats = useSelector((state) => state.dashboard.publisher.appStats)
  const dispatch = useDispatch()
  const { appUsers } = useProfileInfoCtx()
  useEffect(() => {
    // dispatch(getAppStats())
    appUsers.loadAppStats()
  }, [])
  const data = [
    {
      title: appUsers.appStatsInfo.data?.installed,
      subtitle: 'Installed',
      color: 'light-primary',
      icon: <TrendingUp size={24} />,
    },
    {
      title: appUsers.appStatsInfo.data?.uninstalled,
      subtitle: 'Uninstalled',
      color: 'light-warning',
      icon: <TrendingDown size={24} />,
    },
    {
      title: appUsers.appStatsInfo.data?.devices,
      subtitle: 'Devices',
      color: 'light-danger',
      icon: <Box size={24} />,
    },
  ]

  const renderData = () => {
    return data.map((item, i) => {
      return (
        <Col key={i}>
          <Media>
            <Avatar color={item.color} icon={item.icon} className="mr-2" />
            <Media className="my-auto" body>
              <h4 className="font-weight-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className={'card ' + className}>
      <CardHeader>
        <CardTitle tag="h4">Statistics</CardTitle>
        <CardText className="card-text font-small-2 mr-25 mb-0">
          Updated 1 month ago
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>
          {!appUsers.appStatsLoading ? (
            renderData()
          ) : (
            <div className="table-loader-container">
              <Spinner className="spinner" />
            </div>
          )}
        </Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard

StatsCard.propTypes = {
  className: Proptypes.string.isRequired,
}
