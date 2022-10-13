import './watch.scss'
import {ArrowBackOutlined} from '@mui/icons-material'
import src from './video.mp4'

const Watch = () => {
  return (
    <div className='watch' >
        <div className="back">
            <ArrowBackOutlined />
            Home
        </div>
        <video className='video' autoPlay controls src={src}/>
    </div>
  )
}

export default Watch